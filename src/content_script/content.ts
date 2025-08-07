/**
 * Content Script for Chrome Extension
 * Handles floating widget UI, text highlighting, editing, and persistent storage via chrome.storage
 */

let isHighlightMode = false;

console.log("Hello from content script...");

// Request highlight option from background or popup script
chrome.runtime.sendMessage({ action: "hightlightoption" }, (response) => {
  const currentUrl = window.location.href;
  const highlightOption = response?.reply ?? true;

  if (highlightOption && !currentUrl.includes("chrome-extension://")) {
    initFloatingWidget();
    restoreHighlights();
  }
});

/**
 * Initializes a draggable floating widget with action buttons
 */
function initFloatingWidget(): void {
  if (document.getElementById("floating-widget")) return;

  const widget = document.createElement("div");
  widget.id = "floating-widget";

  Object.assign(widget.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: "999999999",
    background: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    cursor: "move",
    width: "60px",
    alignItems: "center",
  });

  const actions: { icon: string; title: string; onClick: () => void }[] = [
    // {
    //   icon: "↗",
    //   title: "Open",
    //   onClick: () => alert("Open action"),
    // },
    // {
    //   icon: "✏️",
    //   title: "Edit",
    //   onClick: () => alert("Edit action"),
    // },
    {
      icon: "🖌️",
      title: "Toggle Highlight Mode",
      onClick: () => {
        isHighlightMode = !isHighlightMode;
        alert(`Highlight mode: ${isHighlightMode ? "ON" : "OFF"}`);
      },
    },
    {
      icon: "🗑️",
      title: "Remove All",
      onClick: async () => {
        document.querySelectorAll(".chrome-ext-highlight").forEach((el) => {
          const span = el as HTMLSpanElement;
          const parent = span.parentNode!;
          parent.replaceChild(document.createTextNode(span.innerText), span);
        });

        const stored = await chrome.storage.local.get("highlights");
        delete stored.highlights?.[location.href];
        await chrome.storage.local.set(stored);
      },
    },
    {
      icon: "❌",
      title: "Close",
      onClick: () => widget.remove(),
    },
  ];

  actions.forEach(({ icon, title, onClick }) => {
    const btn = document.createElement("button");
    btn.innerText = icon;
    btn.title = title;
    Object.assign(btn.style, {
      width: "36px",
      height: "36px",
      fontSize: "18px",
      borderRadius: "50%",
      border: "none",
      background: "#f0f0f0",
      cursor: "pointer",
    });
    btn.addEventListener("click", onClick);
    widget.appendChild(btn);
  });

  makeDraggable(widget);
  document.body.appendChild(widget);
}

/**
 * Makes a DOM element draggable and snap to the nearest screen corner
 */
function makeDraggable(element: HTMLElement): void {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  element.addEventListener("mousedown", (e: MouseEvent) => {
    isDragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDragging) return;

    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;

    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    element.style.right = "";
    element.style.bottom = "";
    element.style.position = "fixed";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
    snapToNearestCorner(element);
  });
}

function snapToNearestCorner(element: HTMLElement): void {
  const screenWidth = window.innerWidth;
  const rect = element.getBoundingClientRect();
  const isLeft = rect.left < screenWidth / 2;
  const currentTop = rect.top;

  element.style.left = isLeft ? "10px" : "";
  element.style.right = !isLeft ? "10px" : "";
  element.style.top = `${currentTop}px`;
  element.style.bottom = "";
}

/**
 * Highlights the current selected text and stores the info in chrome.storage
 */
async function highlightSelectedText(): Promise<void> {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return;

  const span = document.createElement("span");
  span.style.backgroundColor = "yellow";
  span.style.borderRadius = "2px";
  span.style.padding = "2px";
  span.style.display = "inline";
  span.className = "chrome-ext-highlight";
  span.setAttribute("data-id", Date.now().toString());

  try {
    range.surroundContents(span);
    selection.removeAllRanges();

    const pageUrl = location.href;
    const highlightedText = span.innerText;
    const xpath = getXPathForElement(span);

    const stored = (await chrome.storage.local.get("highlights")) || {};
    const pageHighlights = stored.highlights?.[pageUrl] || [];

    const newHighlight = {
      id: span.getAttribute("data-id"),
      text: highlightedText,
      xpath,
    };

    const updated = {
      ...stored,
      highlights: {
        ...stored.highlights,
        [pageUrl]: [...pageHighlights, newHighlight],
      },
    };

    await chrome.storage.local.set(updated);
  } catch (err) {
    alert("Highlight failed (multi-element selection not supported).");
  }
}

function getXPathForElement(el: Node): string {
  const parts: string[] = [];

  while (el && el.nodeType === Node.ELEMENT_NODE && el.parentNode) {
    const parent = el.parentNode;
    const children = Array.from(parent.childNodes).filter(
      (node) => node.nodeName === el.nodeName
    );

    const index = children.indexOf(el as ChildNode) + 1;
    const tag = (el as HTMLElement).tagName;

    parts.unshift(`${tag}:nth-of-type(${index})`);
    el = parent;
  }

  return parts.join(" > ");
}

/**
 * Restores all saved highlights for the current page
 */
async function restoreHighlights(): Promise<void> {
  const stored = await chrome.storage.local.get("highlights");
  const highlights = stored.highlights?.[location.href] || [];

  highlights.forEach((item: any) => {
    try {
      const node = document.evaluate(
        item.xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (node) {
        const span = document.createElement("span");
        span.textContent = item.text;
        span.style.backgroundColor = "yellow";
        span.style.borderRadius = "2px";
        span.style.padding = "2px";
        span.style.display = "inline";
        span.className = "chrome-ext-highlight";
        span.setAttribute("data-id", item.id);

        node.parentNode?.replaceChild(span, node);
      }
    } catch (e) {
      console.error("Failed to restore highlight:", e);
    }
  });
}

/**
 * Listeners for user actions on highlights
 */
document.addEventListener("mouseup", () => {
  if (isHighlightMode) {
    highlightSelectedText();
  }
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("chrome-ext-highlight")) {
    const newText = prompt("Edit highlighted text:", target.innerText);
    if (newText !== null) {
      target.innerText = newText;
      // Optional: update storage here
    }
  }
});

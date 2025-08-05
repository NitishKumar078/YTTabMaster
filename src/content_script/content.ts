/**
 * This is content script of the chrome extention
 *
 */

var hightlightoption;
console.log("hello world... from the content script");
var isHighlightMode = false;
// content.ts

chrome.runtime.sendMessage({ action: "hightlightoption" }, (response) => {
  const currentUrl = window.location.href;
  const highlightOption = response?.reply ?? true;

  if (highlightOption && !currentUrl.includes("chrome-extension://")) {
    initFloatingWidget();
  }
});

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

  // Action buttons
  const actions: { icon: string; title: string; onClick: () => void }[] = [
    {
      icon: "↗",
      title: "Open",
      onClick: () => alert("Open action"),
    },
    {
      icon: "✏️",
      title: "Edit",
      onClick: () => alert("Edit action"),
    },
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
      onClick: () => {
        widget.remove();
      },
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

// Make the widget draggable and stick to corners
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

// Snap to nearest screen corner
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

function replaceplayer() {
  console.log("funtion started");
  let videoElement: HTMLElement | null;

  // 1st delete the existing one
  videoElement = document.getElementById("player-container-inner");
  if (videoElement) {
    const { width, height } = videoElement.getBoundingClientRect();
    videoElement.innerHTML = "";
    videoElement.style.padding = `0px`;

    // 2nd get the url of the current tab
    const url = window.location.href;

    // now attaching it window
    debugger;
    const query = generatedquery(url);
    console.log(query);
    // Add autoplay to the URL query
    const autoplayURL = query.includes("autoplay=1")
      ? query
      : query + (query.includes("?") ? "&" : "?") + "autoplay=1";

    const iframe = document.createElement("iframe");
    iframe.width = String(width);
    iframe.height = String(height);
    iframe.style.borderRadius = "10px";
    iframe.id = "YTTabMaster";
    iframe.src = autoplayURL;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

    iframe.allowFullscreen = true;

    videoElement.appendChild(iframe);
  }
}

// Add a function to check clipboard for YouTube links and set search query if found
const generatedquery = (link: string): string => {
  const src = link.replace("youtube", "yout-ube").trim();
  return src;
};

window.onload = function () {
  console.log("Page is fully loaded!");
  // Your animation or logic here
  replaceplayer();
  if (window.location.href.includes("youtube")) {
    document.addEventListener("click", performeclickaction);
  }
};
function performeclickaction() {
  const iframe: HTMLElement | null = document.getElementById("YTTabMaster");
  if (!iframe) {
    replaceplayer();
    // const kKeyEvent = new KeyboardEvent("keydown", {
    //   key: "k",
    //   code: "KeyK",
    //   keyCode: 75, // Deprecated but still used in some cases
    //   charCode: 0,
    //   bubbles: true,
    //   cancelable: true,
    // });

    // // Dispatch the event to the desired element or the whole document
    // document.dispatchEvent(kKeyEvent);
  } else {
    document.removeEventListener("click", performeclickaction);
  }
}

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
  const parts = [];
  while (el && el.nodeType === Node.ELEMENT_NODE) {
    const index =
      Array.from(el.parentNode?.childNodes || [])
        .filter((node) => node.nodeName === el.nodeName)
        .indexOf(el) + 1;
    const tag = (el as HTMLElement).tagName;
    parts.unshift(`${tag}:nth-of-type(${index})`);
    el = el.parentNode!;
  }
  return parts.join(" > ");
}

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
      // Optionally: update chrome.storage with new text
    }
  }
});

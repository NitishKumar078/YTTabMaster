/**
 * This is content script of the chrome extention
 *
 */

var hightlightoption;
console.log("hello world... from the content script");

chrome.runtime.sendMessage({ action: "hightlightoption" }, function (response) {
  // console.log("Popup responded:", response);

  hightlightoption = response?.reply || true;
  if (hightlightoption) {
    addDock();
  }
});

function addDock() {
  // Optional: Load Lucide icon script dynamically (remove if not needed)
  const script = document.createElement("script");
  document.body.appendChild(script);

  // Prevent duplicate dock creation
  if (document.getElementById("floating-dock")) return;

  // Create the dock container
  const dock = document.createElement("div");
  dock.id = "floating-dock";

  // Style the dock
  Object.assign(dock.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: 999999999,
    width: "48px",
    height: "48px",
    background: "#1E90FF",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  });

  // Create and append the image
  const image = document.createElement("img");
  image.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhpZ2hsaWdodGVyLWljb24gbHVjaWRlLWhpZ2hsaWdodGVyIj48cGF0aCBkPSJtOSAxMS02IDZ2M2g5bDMtMyIvPjxwYXRoIGQ9Im0yMiAxMi00LjYgNC42YTIgMiAwIDAgMS0yLjggMGwtNS4yLTUuMmEyIDIgMCAwIDEgMC0yLjhMMTQgNCIvPjwvc3ZnPg==";
  image.style.width = "24px";
  image.style.height = "24px";

  dock.appendChild(image);

  // Click behavior
  dock.addEventListener("click", () => {
    alert("Floating dock clicked!");
  });

  document.body.appendChild(dock);
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

  document.addEventListener("click", performeclickaction);
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

let previousUrl = window.location.href;
const CHECK_INTERVAL_MS = 2000;
const TARGET_CONTAINER_ID = "player-container-inner";
const IFRAME_ID = "YTTabMaster";

// Generate clean, ad-free iframe src
const generateAdFreeURL = (url: string): string => {
  const modified = url.replace("youtube", "yout-ube").trim();
  return modified.includes("autoplay=1")
    ? modified
    : modified + (modified.includes("?") ? "&" : "?") + "autoplay=1";
};

// Replace or update the iframe player
function replaceOrUpdatePlayer() {
  const container = document.getElementById(TARGET_CONTAINER_ID);
  if (!container) {
    console.log("[YTTabMaster] Player container not found.");
    return;
  }

  const newSrc = generateAdFreeURL(window.location.href);

  let iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;

  if (iframe) {
    // If already present, update the src
    if (iframe.src !== newSrc) {
      iframe.src = newSrc;
      console.log("[YTTabMaster] Iframe src updated.");
    }
  } else {
    // Create new iframe
    const { width, height } = container.getBoundingClientRect();
    container.innerHTML = "";
    container.style.padding = "0px";

    iframe = document.createElement("iframe");
    iframe.id = IFRAME_ID;
    iframe.width = String(width);
    iframe.height = String(height);
    iframe.style.borderRadius = "10px";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.src = newSrc;

    container.appendChild(iframe);
    console.log("[YTTabMaster] Iframe player injected.");
  }

  // Optional: try blanking the real YouTube player (just in case it's running in background)
  const originalPlayer = document.querySelector("video");
  if (originalPlayer) {
    originalPlayer.pause?.();
    originalPlayer.src = "";
    console.log("[YTTabMaster] Background YouTube video paused.");
  }
}

// Track SPA navigation changes
function observeURLChanges() {
  setInterval(() => {
    const currentUrl = window.location.href;
    const isVideoPage = currentUrl.includes("/watch?v=");

    if (currentUrl !== previousUrl && isVideoPage) {
      console.log(`[YTTabMaster] URL changed: ${currentUrl}`);
      previousUrl = currentUrl;
      setTimeout(() => {
        replaceOrUpdatePlayer();
      }, 1000); // give time for new page content to load
    }
  }, 1000);
}

window.onload = () => {
  if (window.location.href.includes("/watch?v=")) {
    console.log("[YTTabMaster] YouTube video page loaded.");
    const pollInterval = setInterval(() => {
      const container = document.getElementById(TARGET_CONTAINER_ID);
      if (container) {
        clearInterval(pollInterval);
        replaceOrUpdatePlayer();
        observeURLChanges();
      }
    }, CHECK_INTERVAL_MS);
  }
};

/**
 * This is background script of the chrome extention
 *
 */
// chrome.runtime.onInstalled.addListener(() => {
//     chrome.sidePanel.setOptions({
//       path: 'panel.html',
//       enabled: true
//     });

//     chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
//       .catch((error) => console.error(error));
//   });
const welcomePage = "index.html";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({ path: welcomePage, enabled: true });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

function generateYouTubeEmbedLink(
  youtubeUrl: string,
  startTimeInSeconds: number
) {
  // Extract video ID from the YouTube URL
  const videoIdMatch = youtubeUrl.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (!videoIdMatch) {
    throw new Error("Invalid YouTube URL");
  }
  const videoId = videoIdMatch[1];

  // Construct the embed URL with autoplay and start time
  return `https://www.yout-ube.com/embed/${videoId}?start=${startTimeInSeconds}&autoplay=1`;
}

// Example Usage
const youtubeUrl: string = "https://youtu.be/t8HrZTLRCeU";
const startTimeInSeconds: number = 985; // Start time in seconds
const embedLink = generateYouTubeEmbedLink(youtubeUrl, startTimeInSeconds);
console.log(embedLink);

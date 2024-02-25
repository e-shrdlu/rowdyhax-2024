function interceptURL(requestDetails) {
  console.log(`BG SCRIPT WORKING - Loading: ${requestDetails.url}`);
}

browser.webRequest.onBeforeRequest.addListener(interceptURL, {
  urls: ["<all_urls>"],
});



// console.log("BACKGROUND SCRIPT IS RUNNING!");

// if (typeof browser == "undefined") {
//   // Chrome does not support the browser namespace yet.
//   globalThis.browser = chrome;
// }

// // test
// browser.runtime.onInstalled.addListener(() => {
//   browser.tabs.create({ url: "http://example.com/firstrun.html" });
// });

// // test2{
// function logURL(requestDetails) {
//   console.log(`Loading: ${requestDetails.url}`);
//   browser.tabs.create({ url: "http://example.com/yippee.html" });
// }

// browser.webRequest.onBeforeRequest.addListener(logURL, {
//   urls: ["<all_urls>"],
// });



// // browser.webRequest.onBeforeRequest.addListener(
//     // checkLink,
//     // {urls: ["<all_urls>"]},
//     // ["blocking"]
// // );

// function checkLink(details) {
//     // Implement your logic to check if the link is malicious
//     if (isMalicious(details.url)) {
//         return {cancel: true};
//     }
//     return {cancel: false};
// }

// function isMalicious(url) {
//     console.log("URL IS MALICIOUS!!!");
//     return true
//     // Implement your malicious site detection logic here
//     // Return true if the site is malicious, false otherwise
// }


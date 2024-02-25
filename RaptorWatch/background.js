// import levenshtein  distance function from "https://cdn.jsdelivr.net/npm/js-levenshtein@1.1.6/index.min.js";
levenshtein = (() => {function r(r,t,e,o,h){return r<t||e<t?r>e?e+1:r+1:o===h?t:t+1}return function(t,e){if(t===e)return 0;if(t.length>e.length){var o=t;t=e,e=o}for(var h=t.length,n=e.length;h>0&&t.charCodeAt(h-1)===e.charCodeAt(n-1);)h--,n--;for(var a=0;a<h&&t.charCodeAt(a)===e.charCodeAt(a);)a++;if(n-=a,0===(h-=a)||n<3)return n;var c,f,u,d,A,C,i,l,g,s,v,p,m=0,x=[];for(c=0;c<h;c++)x.push(c+1),x.push(t.charCodeAt(a+c));for(var b=x.length-1;m<n-3;)for(g=e.charCodeAt(a+(f=m)),s=e.charCodeAt(a+(u=m+1)),v=e.charCodeAt(a+(d=m+2)),p=e.charCodeAt(a+(A=m+3)),C=m+=4,c=0;c<b;c+=2)f=r(i=x[c],f,u,g,l=x[c+1]),u=r(f,u,d,s,l),d=r(u,d,A,v,l),C=r(d,A,C,p,l),x[c]=C,A=d,d=u,u=f,f=i;for(;m<n;)for(g=e.charCodeAt(a+(f=m)),C=++m,c=0;c<b;c+=2)i=x[c],x[c]=C=r(i,f,C,g,x[c+1]),f=i;return C}})();

// if domain is simmilar to common domain, return true, else return false
function isSuspectedTyposquat(url) {
  const common_domains = ["microsoft.com", "uber.com", "zoom.us", "max.com", "netflix.com", "wikipedia.com", "patreon.com", "shopify.com", "okta.com", "imdb.com", "thesaurus.com", "realtor.com", "live.com", "nordstrom.com", "nytimes.com", "usaa.com", "medium.com", "archive.org", "kmart.com", "baidu.com", "microsoftonline.com", "naver.com", "msn.com", "bilibili.com", "globo.com", "wikimedia.org", "zalando.de", "urbanoutfitters.com", "apple.com", "allrecipes.com", "wellsfargo.com", "hsn.com", "walmart.com", "mail.ru", "steampowered.com", "xvideos.com", "epicgames.com", "xnxx.com", "duosecurity.com", "turbopages.org", "intuit.com", "urbandictionary.com", "wikipedia.org", "itch.io", "t.me", "amazon.com", "google.net", "spotify.com", "levi.com", "qq.com", "wunderground.com", "bankofamerica.com", "wolframalpha.com", "google.org", "facebook.com", "hulu.com", "disney.com", "cnn.com", "pnc.com", "lyft.com", "adobe.com", "character.ai", "heb.com", "xhamster.desi", "stackoverflow.com", "steamcommunity.com", "fedex.com", "chase.com", "github.com", "duckduckgo.com", "disneystore.com", "docomo.ne.jp", "target.com", "gamespot.com", "slickdeals.net", "temu.com", "samsung.com", "yahoo.co.jp", "yelp.com", "yandex.ru", "twitter.com", "linkedin.com", "openai.com", "washingtonpost.com", "dillards.com", "onelook.com", "hottopic.com", "weather.gov", "bbc.com", "youtube.com", "tiktok.com", "cbsnews.com", "amazonaws.com", "airbnb.com", "apnews.com", "lowes.com", "dictionary.com", "weather.com", "fandom.com", "dzen.ru", "macys.com", "pornhub.com", "google.com", "buzzfeed.com", "startpage.com", "whatsapp.com", "bing.com", "flickr.com", "sharepoint.com", "x.com", "roblox.com", "gamestop.com", "capitalone.com", "frostbank.com", "healthline.com", "cnet.com", "bestbuy.com", "kohls.com", "quora.com", "canva.com", "npr.org", "shein.com", "ebay.com", "xfinity.com", "xhamster.com", "breitbart.com", "yahoo.com", "office.com", "twitch.tv", "discord.com", "theguardian.com", "shopusa.com", "aol.com", "nfl.com", "pinterest.com", "reddit.com", "vk.com", "zillow.com", "wikimedia.com", "nbcnews.com", "instagram.com", "gmail.com", "nextdoor.com", "nih.gov", "tjx.com", "craigslist.org", "costco.com"];

  let levenshtein_tolerance = 3; // this many characters off

  // extract domain from url
  const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i;
  const match = url.match(regex);
  const domain = match ? match[1] : "";
  console.log("found domain: " + domain + " from url: " + url);

  for (let valid_domain of common_domains) {
      // if potential typosquat, return false
      result = levenshtein(valid_domain, domain);
      if (result <= levenshtein_tolerance && ! common_domains.includes(domain)) { // if distance lower than tolerance and not a common domain
          return true;
      }
  }

  // if no potential typosquats found, return false
  return false;
}



function interceptURL(requestDetails) {
  console.log(`BG SCRIPT WORKING - Loading: ${requestDetails.url}`);
  let sus = isSuspectedTyposquat(requestDetails.url);
  console.log("BG SCRIPT: domain is sus?", sus);
  if (sus) {
    chrome.tabs.create({
      url: location.origin + '/site.html?link=' + requestDetails.url});
      return {cancel: true};
  }

}

browser.webRequest.onBeforeRequest.addListener(interceptURL, {
  urls: ["<all_urls>"],
}, ["blocking"]);



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


// check cache to detect vue and search-widget-ocean exist or not
loadAndPopupSearch_Cached = function () {
  if (typeof $.cachedScript != 'function') $.cachedScript = function (url, options) {
    // to do this without recurring delay, we need to have a getScript which caches
    options = $.extend(options || {}, { dataType: "script", cache: true, url: url })
    return $.ajax(options);
  }
  // load scripts first (will be very fast when cached)
  let script1 = 'https://unpkg.com/vue@2.6.10/dist/vue.js'
  let script2 = 'https://search-widget.current.build.ocean.isddesign.com/search-widget-ocean.min.js'
  $.cachedScript(script1).done(() => {
    $.cachedScript(script2);
  });
}

// get hostname and detect
detectUrl = function () {
  var hostname = window.location.hostname;
  
  switch (hostname) {
    case 'www.google.com': {
      $("body").children[3].children[6].children[2].children[1].children[0].children[0].children[0].append('<search-widget-ocean>Ocean Search 2.0</search-widget-ocean>');
      break;
    }
  }
}




loadAndPopupSearch_Cached();
detectUrl();
// insert component
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd) {
    if ($('search-widget-ocean')) $('search-widget-ocean').remove();
    $("body").append(
      "<search-widget-ocean language=" +
      request.cmd +
      "></search-widget-ocean>"
    );
    $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
    sendResponse({ res: 'success' });
  }
  return true;
});


// detect URL
// function detectUrl(hostname) {
//   switch (hostname) {
//     case "www.facebook.com":
//       url = "facebook"
//   }
// }
// detectUrl(hostname);

// check cache to detect vue and search-widget-ocean exist or not
loadAndPopupSearch_Cached = function() {
  if (typeof $.cachedScript != 'function') $.cachedScript = function (url, options) {
    // to do this without recurring delay, we need to have a getScript which caches
    options = $.extend(options || {}, { dataType: "script", cache: true, url: url })
    return $.ajax(options);
  }
  // load scripts first (will be very fast when cached)
  let script1 = 'https://unpkg.com/vue@2.6.10/dist/vue.js'
  let script2 = 'https://search-widget.current.build.ocean.isddesign.com/search-widget-ocean.min.js'
  $.cachedScript(script1).done(() => {
    $.cachedScript(script2).done(() => {
      $("body").append("<search-widget-ocean></search-widget-ocean>")
    })
  })
}
loadAndPopupSearch_Cached();
// listen click event on extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd) {
    console.log(request.cmd);
    if (request.cmd == 'toggle-feature-foo') {
      $("search-widget-ocean").attr('language', 'en'); 
    } else {
      $("search-widget-ocean").attr('language', requst.cmd); 
    }
    $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
    sendResponse({ res: 'success' });
  }
  return true;
});
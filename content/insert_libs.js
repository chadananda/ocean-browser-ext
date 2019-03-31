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
    $.cachedScript(script2);
  });
}
loadAndPopupSearch_Cached();
// listen click event on extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd) {
    if ($('search-widget-ocean')) $('search-widget-ocean').remove();
    if (request.cmd == 'toggle-feature-foo') {
      $("body").append("<search-widget-ocean language='en'></search-widget-ocean>");
    } else {
      $("body").append("<search-widget-ocean language=" + request.cmd + "></search-widget-ocean>");
    }
    $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
    sendResponse({ res: 'success' });
  }
  return true;
});
$(window).on('load', function(){
  loadAndPopupSearch_Cached();
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cmd) {
      if ($('search-widget-ocean')) $('search-widget-ocean').remove();
      $("body").append(
        "<search-widget-ocean language=" + request.cmd + "></search-widget-ocean>"
      );
      $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
      sendResponse({ res: 'success' });
    }
    return true;
  });
})

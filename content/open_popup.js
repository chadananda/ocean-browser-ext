chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == "openOceanSearch") {
    document.querySelector('search-widget-ocean').shadowRoot.querySelector('#openOceanSearch').click();
    sendResponse({ res: 'success' });
  }
  return true;
});


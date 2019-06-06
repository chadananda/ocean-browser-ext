$(window).on('load', function () {
  // get lanauge setting when user press shortkey to open ocean search
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cmd) {
      sendResponse({ res: 'success' });
      loadAndPopupSearch_Cached();
      setTimeout(function () {
        if ($('search-widget-ocean')) $('search-widget-ocean').remove();
        $("body").append(
          "<search-widget-ocean language=" + request.cmd + "></search-widget-ocean>"
        );
        $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
      }, 1000);

    }
    return true;
  });
  var port = chrome.runtime.connect({
    name: 'ocean extension'
  })
  port.postMessage({
    method: 'getEditToolSetting'
  })
  port.onMessage.addListener(function (msg) {
    if (msg.response == 'editToolSetting') {
      if (msg.data.keyMapping) {
        var focusEl;

        var findEditingIframe = setInterval(function () {
          // editingIframe = document.getElementsByTagName('iframe')[4];
          focusEl = window.top.document;

          console.log('...finding focus element...');
          if (focusEl.activeElement) {
            focusEl = focusEl.activeElement;
            function insertGoogleDoc(a) {
              parseTexter = new rwGoogleTextParse;
              parseTexter.CurrentWord = a;
              parseTexter.InsertText(focusEl, parseTexter.CurrentWord);
              newCaretPosition = parseTexter.CursorPosition;
            }
            console.log('found');
            Mousetrap(focusEl.contentDocument).bind("alt+. h", function (e) {
              e.preventDefault();
              console.log('called');
              insertGoogleDoc('apple');
            })
            clearInterval(findEditingIframe);
          }
        }, 2000);
      }
    }
  })
})
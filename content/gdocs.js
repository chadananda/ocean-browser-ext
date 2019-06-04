$(window).on('load', function () {
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
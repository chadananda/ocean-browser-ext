$(window).on('load', function () {
  loadAndPopupSearch_Cached();

  // get lanauge setting when user press shortkey to open ocean search
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cmd) {
      sendResponse({ res: 'success' });
      if ($('search-widget-ocean')) $('search-widget-ocean').remove();
      $("body").append(
        "<search-widget-ocean language=" + request.cmd + "></search-widget-ocean>"
      );
      $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
    }
    return true;
  });

  // get editToolSetting from backend using chrome.storage.sync
  var port = chrome.runtime.connect({
    name: 'ocean extension'
  })
  port.postMessage({
    method: 'getEditToolSetting'
  })
  port.onMessage.addListener(function (msg) {
    if (msg.response == 'editToolSetting') {
      if (msg.data.keyMapping) {
        if (location.href.indexOf('https://docs.google.com/document') > -1) {
          // var editingIFrame = $('iframe.docs-texteventtarget-iframe');
          var iframe = $('iframe');
          if (iframe) {
          }
          // if(editingIFrame) {
          //   var iframeDocument = editingIFrame.contentDocument;
          //   Mousetrap.bind( iframeDocument );
          // }

          // var googleDoc = googleDocsUtil.getGoogleDocument();
          // console.log(googleDoc);
          // var editingIFrame;
          // setTimeout(() => {
          //   editingIFrame = document.getElementsByTagName("iframe")[0].contentDocument;
          //   // editingIFrame = $('iframe.docs-texteventtarget-iframe').contentDocument;
          // }, 5000);
          // if (editingIFrame) {
          //   console.log('focus');
          //   editingIFrame.focus(function () {
          //     Mousetrap.bind("alt+.", function (e) {
          //       console.log('key press');
          //       e.preventDefault();
          //       googleDocsUtil.setTextCurrentCursor("apple");
          //       return false;
          //     })
          //   })
          // }
        }
        var lastFocused;
        $("input, textarea").focus(function () {
          lastFocused = document.activeElement;
        });

        $("input, textarea").addClass('mousetrap');

        // dot-unders: Ḥ ḥ Ṭ ṭ Ẓ ẓ Ṣ ṣ Ḍ ḍ
        Mousetrap.bind("alt+. h", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. h"])
          return false;
        })
        Mousetrap.bind("alt+. shift+h", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. shift+h"])
          return false;
        })
        Mousetrap.bind("alt+. shift+t", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. shift+t"])
          return false;
        })
        Mousetrap.bind("alt+. t", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. t"])
        })
        Mousetrap.bind("alt+. shift+z", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. shift+z"])
          return false;
        })
        Mousetrap.bind("alt+. z", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. z"])
        })
        Mousetrap.bind("alt+. shift+s", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. shift+s"])
          return false;
        })
        Mousetrap.bind("alt+. s", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. s"])
        })
        Mousetrap.bind("alt+. shift+d", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. shift+d"])
          return false;
        })
        Mousetrap.bind("alt+. d", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+. d"])
          return false;
        })

        // Ayn and Hamza (6 and 9 curly single quotes): ’ ‘
        Mousetrap.bind("alt+' 9", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+' 9"])
          return false;
        })
        Mousetrap.bind("alt+' 6", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+' 6"])
          return false;
        })

        // Acute vowels: Á á Í í Ú ú
        Mousetrap.bind("alt+' a", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+' a"])
          return false;
        })
        Mousetrap.bind("alt+' shift+a", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+' shift+a"])
          return false;
        })
        Mousetrap.bind("alt+' i", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+' i"])
          return false;
        })
        Mousetrap.bind("alt+' shift+i", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+' shift+i"])
          return false;
        })
        Mousetrap.bind("alt+' u", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+' u"])
          return false;
        })
        Mousetrap.bind("alt+' shift+u", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["alt+' shift+u"])
          return false;
        })


        // autoreplace
        // Mousetrap.bind("space", function (e) {
        //   e.preventDefault();

        //   return false;
        // })
      }
    }
  })
})

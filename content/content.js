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
        var lastFocused;
        $("input, textarea").focus(function () {
          lastFocused = document.activeElement;
        });

        $("input, textarea").addClass('mousetrap');

        // dot-unders: Ḥ ḥ Ṭ ṭ Ẓ ẓ Ṣ ṣ Ḍ ḍ
        Mousetrap.bind("ctrl+. h", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. h"])
          return false;
        })
        Mousetrap.bind("ctrl+. shift+h", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. shift+h"])
          return false;
        })
        Mousetrap.bind("ctrl+. shift+t", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. shift+t"])
          return false;
        })
        Mousetrap.bind("ctrl+. t", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. t"])
        })
        Mousetrap.bind("ctrl+. shift+z", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. shift+z"])
          return false;
        })
        Mousetrap.bind("ctrl+. z", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. z"])
        })
        Mousetrap.bind("ctrl+. shift+s", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. shift+s"])
          return false;
        })
        Mousetrap.bind("ctrl+. s", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. s"])
        })
        Mousetrap.bind("ctrl+. shift+d", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. shift+d"])
          return false;
        })
        Mousetrap.bind("ctrl+. d", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+. d"])
          return false;
        })

        // Ayn and Hamza (6 and 9 curly single quotes): ’ ‘
        Mousetrap.bind("ctrl+' 9", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+' 9"])
          return false;
        })
        Mousetrap.bind("ctrl+' 6", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+' 6"])
          return false;
        })

        // Acute vowels: Á á Í í Ú ú
        Mousetrap.bind("ctrl+' a", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+' a"])
          return false;
        })
        Mousetrap.bind("ctrl+' shift+a", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+' shift+a"])
          return false;
        })
        Mousetrap.bind("ctrl+' i", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+' i"])
          return false;
        })
        Mousetrap.bind("ctrl+' shift+i", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+' shift+i"])
          return false;
        })
        Mousetrap.bind("ctrl+' u", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+' u"])
          return false;
        })
        Mousetrap.bind("ctrl+' shift+u", function (e) {
          e.preventDefault();
          insertText(lastFocused, keyMapping["ctrl+' shift+u"])
          return false;
        })
      }
    }
  })
})

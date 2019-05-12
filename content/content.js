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

        Mousetrap.bind({
          /***********************************
           * DOT-UNDERS: Ḥ Ḥ Ṭ Ṭ Ẓ Ẓ Ṣ Ṣ Ḍ Ḍ *
           ***********************************/
          "alt+. h": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. h"])
          },
          "alt+. shift+h": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. shift+h"])
          },

          "alt+. t": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. t"]);
          },
          "alt+. shift+t": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. shift+t"]);
          },

          "alt+. z": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. z"]);
          },
          "alt+. shift+z": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. shift+z"]);
          },

          "alt+. s": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. s"]);
          },
          "alt+. shift+s": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. shift+s"]);
          },

          "alt+. d": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. d"]);
          },
          "alt+. shift+d": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+. shift+d"]);
          },

          /****************************************************
           * AYN AND HAMZA (6 AND 9 CURLY SINGLE QUOTES): ’ ‘ *
           ****************************************************/
          "alt+' 9": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+' 9"]);
          },
          "alt+' 6": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+' 6"]);
          },

          /*****************************
           * ACUTE VOWELS: Á Á Í Í Ú Ú *
           *****************************/
          "alt+' a": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+' a"]);
          },
          "alt+' shift+a": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+' shift+a"]);
          },
          "alt+' i": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+' i"]);
          },
          "alt+' shift+i": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+' shift+i"]);
          },
          "alt+' u": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+' u"]);
          },
          "alt+' shift+u": function (e) {
            e.preventDefault();
            insertText(lastFocused, keyMapping["alt+' shift+u"]);
          },
        })
      }
    }
  })
})

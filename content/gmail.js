$(window).on('load', function () {
  var port = chrome.runtime.connect({
    name: 'ocean extension'
  })
  port.postMessage({
    method: 'getEditToolSetting'
  })
  port.onMessage.addListener(function (msg) {
    if (msg.response = 'editToolSetting') {
      if (msg.data.keyMapping) {
        function insertCharacter(text) {
          var selection = parent.getSelection();
          var range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(text))
          range.collapse(null, text.length);
          range.detach();
          return true;
        }
        // wait for 60s until find editcontent
        var focusEl;
        var findFocusEl = setInterval(function () {
          focusEl = document.getElementsByClassName("editable")[0];
          console.log('...finding...');
          if (focusEl) {
            console.log('found')
            Mousetrap(focusEl).bind({
              /***********************************
               * DOT-UNDERS: Ḥ Ḥ Ṭ Ṭ Ẓ Ẓ Ṣ Ṣ Ḍ Ḍ *
               ***********************************/
              "alt+. h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. h"]);
              },
              "alt+. shift+h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+h"]);
              },

              "alt+. t": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. t"]);
              },
              "alt+. shift+t": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+t"]);
              },

              "alt+. z": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. z"]);
              },
              "alt+. shift+z": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+z"]);
              },

              "alt+. s": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. s"]);
              },
              "alt+. shift+s": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+s"]);
              },

              "alt+. d": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. d"]);
              },
              "alt+. shift+d": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+d"]);
              },

              /****************************************************
               * AYN AND HAMZA (6 AND 9 CURLY SINGLE QUOTES): ’ ‘ *
               ****************************************************/
              "alt+' 9": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' 9"]);
              },
              "alt+' 6": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' 6"]);
              },

              /*****************************
               * ACUTE VOWELS: Á Á Í Í Ú Ú *
               *****************************/
              "alt+' a": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' a"]);
              },
              "alt+' shift+a": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' shift+a"]);
              },
              "alt+' i": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' i"]);
              },
              "alt+' shift+i": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' shift+i"]);
              },
              "alt+' u": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' u"]);
              },
              "alt+' shift+u": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' shift+u"]);
              }
            })
            clearInterval(findFocusEl);
          }
        }, 2000);
      }
    }
  })
})
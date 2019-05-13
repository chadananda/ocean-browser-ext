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
        function insertCharacter(text, type) {
          var selection = parent.getSelection();
          var range = selection.getRangeAt(0);
          range.deleteContents();
          if (type === 'string') {
            range.insertNode(document.createTextNode(text))
          } else if (type === 'html') {
            var u = document.createElement('u');
            u.innerHTML = text;
            range.insertNode(u);
          }
          range.collapse(null, text.length);
          range.detach();
          return true;
        }

        /*******************************
         * WAIT FOR 60S UNTIL FIND EDITCONTENT *
         *******************************/
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
                insertCharacter(keyMapping["alt+. h"], 'string');
              },
              "alt+. shift+h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+h"], 'string');
              },

              "alt+. t": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. t"], 'string');
              },
              "alt+. shift+t": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+t"], 'string');
              },

              "alt+. z": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. z"], 'string');
              },
              "alt+. shift+z": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+z"], 'string');
              },

              "alt+. s": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. s"], 'string');
              },
              "alt+. shift+s": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+s"], 'string');
              },

              "alt+. d": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. d"], 'string');
              },
              "alt+. shift+d": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+. shift+d"], 'string');
              },

              /****************************************************
               * AYN AND HAMZA (6 AND 9 CURLY SINGLE QUOTES): ’ ‘ *
               ****************************************************/
              "alt+' 9": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' 9"], 'string');
              },
              "alt+' 6": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' 6"], 'string');
              },

              /*****************************
               * ACUTE VOWELS: Á Á Í Í Ú Ú *
               *****************************/
              "alt+' a": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' a"], 'string');
              },
              "alt+' shift+a": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' shift+a"], 'string');
              },
              "alt+' i": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' i"], 'string');
              },
              "alt+' shift+i": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' shift+i"], 'string');
              },
              "alt+' u": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' u"], 'string');
              },
              "alt+' shift+u": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+' shift+u"], 'string');
              },

              /***************************************************
               * UNDERSCORE LETTERS: SH, GH, DH, TH, KH, ZH, CH  *
               * (MAY NEED TO USE MACRONS OR UNDERLINE INSTEAD!! *
               ***************************************************/
              "alt+u shift+s h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+s h"], "html");
              },
              "alt+u shift+s shift+h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+s shift+h"], "html");
              },

              "alt+u g h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u g h"], "html");
              },
              "alt+u shift+g h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+g h"], "html");
              },
              "alt+u shift+g shift+h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+g shift+h"], "html");
              },

              "alt+u d h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u d h"], "html");
              },
              "alt+u shift+D h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+D h"], "html");
              },
              "alt+u shift+D shift+H": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+D shift+H"], "html");
              },

              "alt+u t h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u t h"], "html");
              },
              "alt+u shift+T h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+T h"], "html");
              },
              "alt+u shift+T shift+H": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+T shift+H"], "html");
              },

              "alt+u k h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u k h"], "html");
              },
              "alt+u shift+K h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+K h"], "html");
              },
              "alt+u shift+K shift+H": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+K shift+H"], "html");
              },

              "alt+u z h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u z h"], "html");
              },
              "alt+u shift+Z h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+Z h"], "html");
              },
              "alt+u shift+Z shift+H": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+Z shift+H"], "html");
              },

              "alt+u c h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u c h"], "html");
              },
              "alt+u shift+C h": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+C h"], "html");
              },
              "alt+u shift+C shift+H": function (e) {
                e.preventDefault();
                insertCharacter(keyMapping["alt+u shift+C shift+H"], "html");
              },
            })
            clearInterval(findFocusEl);
          }
        }, 2000);
      }
    }
  })
})
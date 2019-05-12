// check cache to detect vue and search-widget-ocean exist or not
loadAndPopupSearch_Cached = function () {
  if (typeof $.cachedScript != 'function') $.cachedScript = function (url, options) {
    // to do this without recurring delay, we need to have a getScript which caches
    options = $.extend(options || {}, { dataType: "script", cache: true, url: url })
    return $.ajax(options);
  }
  // load scripts first (will be very fast when cached)
  let script1 = 'https://unpkg.com/vue@2.6.10/dist/vue.js'
  let script2 = 'https://search-widget.current.build.ocean.isddesign.com/search-widget-ocean.min.js'
  $.cachedScript(script1).done(() => {
    $.cachedScript(script2).done();
  });
}

// for ocean component style
var nodes = {
  img: {
    url: 'https://sacred-traditions.org/ocean_assets/images/ocean-logo.svg',
    width: '20px',
    verticalAlign: 'middle',
    margin: '0 5px'
  },
  lang: '',
  title: 'Ocean 2.0 Search',
  cursor: 'pointer'
}

container = function (obj) {
  var parent = document.createElement('div');
  parent.className = obj.parentClass || "";
  parent.style.cursor = nodes.cursor;

  var pic = document.createElement('img');
  pic.src = nodes.img.url;
  pic.style.width = nodes.img.width;
  pic.style.verticalAlign = nodes.img.verticalAlign;
  pic.style.margin = nodes.img.margin;

  var child = document.createElement('a');
  child.textContent = nodes.title;
  child.className = obj.childClass || "";

  parent.appendChild(pic);
  parent.appendChild(child);

  parent.addEventListener('click', function () {
    chrome.storage.sync.get(['lang'], function (result) {
      if (result.lang) {
        nodes.lang = result.lang;
      } else {
        nodes.lang = 'en';
      }
      if ($('search-widget-ocean')) $('search-widget-ocean').remove();
      $("body").append(
        "<search-widget-ocean language=" + nodes.lang + "></search-widget-ocean>"
      );
      $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
    });
  });
  return parent;
}


var keyMapping = {
  // dot-unders: Ḥ ḥ Ṭ ṭ Ẓ ẓ Ṣ ṣ Ḍ ḍ
  "alt+. h": "ḥ",
  "alt+. shift+h": "Ḥ",

  "alt+. t": "ṭ",
  "alt+. shift+t": "Ṭ",

  "alt+. z": "ẓ",
  "alt+. shift+z": "Ẓ",

  "alt+. s": "ṣ",
  "alt+. shift+s": "Ṣ",

  "alt+. d": "ḍ",
  "alt+. shift+d": "Ḍ",

  // Ayn and Hamza (6 and 9 curly single quotes): ’ ‘
  "alt+' 9": "’",
  "alt+' 6": "‘",

  // Acute vowels: Á á Í í Ú ú
  "alt+' a": "á",
  "alt+' shift+a": "Á",

  "alt+' i": "í",
  "alt+' shift+i": "Í",

  "alt+' u": "ú",
  "alt+' shift+u": "Ú",

  // Underscore letters: Sh, Gh, Dh, Th, Kh, Zh, Ch  
//  (may need to use macrons or underline instead!!
  "alt+- g h": "test"
// "alt+u g h": '<u>gh</u>'
// "alt+u","S","h"], "command": "insert", "args": {"characters": "<u>Sh</u>"} },
// "alt+u","S","H"], "command": "insert", "args": {"characters": "<u>SH</u>"} },
// "alt+u","g","h"], "command": "insert", "args": {"characters": "<u>gh</u>"} },
// "alt+u","G","h"], "command": "insert", "args": {"characters": "<u>Gh</u>"} },
// "alt+u","G","H"], "command": "insert", "args": {"characters": "<u>GH</u>"} },
// "alt+u","d","h"], "command": "insert", "args": {"characters": "<u>dh</u>"} },
// "alt+u","D","h"], "command": "insert", "args": {"characters": "<u>Dh</u>"} },
// "alt+u","D","H"], "command": "insert", "args": {"characters": "<u>DH</u>"} },
// "alt+u","t","h"], "command": "insert", "args": {"characters": "<u>th</u>"} },
// "alt+u","T","h"], "command": "insert", "args": {"characters": "<u>Th</u>"} },
// "alt+u","T","H"], "command": "insert", "args": {"characters": "<u>TH</u>"} },
// "alt+u","k","h"], "command": "insert", "args": {"characters": "<u>kh</u>"} },
// "alt+u","K","h"], "command": "insert", "args": {"characters": "<u>Kh</u>"} },
// "alt+u","K","H"], "command": "insert", "args": {"characters": "<u>KH</u>"} },
// "alt+u","z","h"], "command": "insert", "args": {"characters": "<u>zh</u>"} },
// "alt+u","Z","h"], "command": "insert", "args": {"characters": "<u>Zh</u>"} },
// "alt+u","Z","H"], "command": "insert", "args": {"characters": "<u>ZH</u>"} },
// "alt+u","c","h"], "command": "insert", "args": {"characters": "<u>ch</u>"} },
// "alt+u","C","h"], "command": "insert", "args": {"characters": "<u>Ch</u>"} },
// "alt+u","C","H"], "command": "insert", "args": {"characters": "<u>CH</u>"} } 
}


insertText = function (lastFocused, text) {
  var input = lastFocused;
  if (input == undefined) { return; }
  var scrollPos = input.scrollTop;
  var pos = 0;
  var browser = ((input.selectionStart || input.selectionStart == "0") ?
    "ff" : (document.selection ? "ie" : false));
  if (browser == "ie") {
    input.focus();
    var range = document.selection.createRange();
    range.moveStart("character", -input.value.length);
    pos = range.text.length;
  }
  else if (browser == "ff") { pos = input.selectionStart };

  var front = (input.value).substring(0, pos);
  var back = (input.value).substring(pos, input.value.length);
  input.value = front + text + back;
  pos = pos + text.length;
  if (browser == "ie") {
    input.focus();
    var range = document.selection.createRange();
    range.moveStart("character", -input.value.length);
    range.moveStart("character", pos);
    range.moveEnd("character", 0);
    range.select();
  }
  else if (browser == "ff") {
    input.selectionStart = pos;
    input.selectionEnd = pos;
    input.focus();
  }
  input.scrollTop = scrollPos;
}
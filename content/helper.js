// CHECK CACHE TO DETECT VUE AND SEARCH-WIDGET-OCEAN EXIST OR NOT

loadAndPopupSearch_Cached = function () {
  if (typeof $.cachedScript != 'function') $.cachedScript = function (url, options) {
    //  TO DO THIS WITHOUT RECURRING DELAY, WE NEED TO HAVE A GETSCRIPT WHICH CACHES
    options = $.extend(options || {}, { dataType: "script", cache: true, url: url })
    return $.ajax(options);
  }
  //  LOAD SCRIPTS FIRST (WILL BE VERY FAST WHEN CACHED)
  let script1 = 'https://unpkg.com/vue@2.6.10/dist/vue.js'
  let script2 = 'https://search-widget.current.build.ocean.isddesign.com/search-widget-ocean.min.js'
  $.cachedScript(script1).done(() => {
    $.cachedScript(script2).done();
  });
}

/********************************
 * FOR OCEAN COMPONENT STYLE *
 ********************************/
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
  /***********************************
   * DOT-UNDERS: Ḥ Ḥ Ṭ Ṭ Ẓ Ẓ Ṣ Ṣ Ḍ Ḍ *
   ***********************************/
  "alt+. h"       : "ḥ",
  "alt+. shift+h" : "Ḥ",

  "alt+. t"       : "ṭ",
  "alt+. shift+t" : "Ṭ",

  "alt+. z"       : "ẓ",
  "alt+. shift+z" : "Ẓ",

  "alt+. s"       : "ṣ",
  "alt+. shift+s" : "Ṣ",

  "alt+. d"       : "ḍ",
  "alt+. shift+d" : "Ḍ",

  /****************************************************
   * AYN AND HAMZA (6 AND 9 CURLY SINGLE QUOTES): ’ ‘ *
   ****************************************************/
  "alt+' 9"       : "’",
  "alt+' 6"       : "‘",

  /*****************************
   * ACUTE VOWELS: Á Á Í Í Ú Ú *
   *****************************/
  "alt+' a"       : "á",
  "alt+' shift+a" : "Á",

  "alt+' i"       : "í",
  "alt+' shift+i" : "Í",

  "alt+' u"       : "ú",
  "alt+' shift+u" : "Ú"

  /***************************************************
   * UNDERSCORE LETTERS: SH, GH, DH, TH, KH, ZH, CH  *
   * (MAY NEED TO USE MACRONS OR UNDERLINE INSTEAD!! *
   ***************************************************/
  // "alt+u shift+s h"      : "Sh",
  // "alt+u shift+s shift+h": "SH",

  // "alt+u g h"            : "gh",
  // "alt+u shift+g h"      : "Gh",
  // "alt+u shift+g shift+h": "GH",

  // "alt+u d h"            : "dh",
  // "alt+u shift+D h"      : "Dh",
  // "alt+u shift+D shift+H": "DH",

  // "alt+u t h"            : "th",
  // "alt+u shift+T h"      : "Th",
  // "alt+u shift+T shift+H": "TH",

  // "alt+u k h"            : "kh",
  // "alt+u shift+K h"      : "Kh",
  // "alt+u shift+K shift+H": "KH",

  // "alt+u z h"            : "zh",
  // "alt+u shift+Z h"      : "Zh",
  // "alt+u shift+Z shift+H": "ZH",

  // "alt+u c h"            : "ch",
  // "alt+u shift+C h"      : "Ch",
  // "alt+u shift+C shift+H": "CH"
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
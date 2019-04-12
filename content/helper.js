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
  let script3 = 'https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js'
  $.cachedScript(script1).done(() => {
    $.cachedScript(script2).done(() => {
      $.cachedScript(script3)
    });
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
  "ctrl+.+h": "ḥ",
  "ctrl+.+t": "ṭ",
  "ctrl+.+z": "ẓ",
  "ctrl+.+s": "ṣ",
  "ctrl+.+d": "ḍ",

  // Ayn and Hamza (6 and 9 curly single quotes): ’ ‘
  "ctrl+'+9": "’",
  "ctrl+'+6": "‘"
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
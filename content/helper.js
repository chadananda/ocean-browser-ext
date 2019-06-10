// CHECK CACHE TO DETECT VUE AND SEARCH-WIDGET-OCEAN EXIST OR NOT
loadAndPopupSearch_Cached = function () {
  if (typeof $.cachedScript != "function")
    $.cachedScript = function (url, options) {
      //  TO DO THIS WITHOUT RECURRING DELAY, WE NEED TO HAVE A GETSCRIPT WHICH CACHES
      options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
      });
      return $.ajax(options);
    };
  //  LOAD SCRIPTS FIRST (WILL BE VERY FAST WHEN CACHED)
  let script1 = "https://unpkg.com/vue@2.6.10/dist/vue.js";
  let script2 =
    "https://search-widget.current.build.ocean.isddesign.com/search-widget-ocean.min.js";
  $.cachedScript(script1).done(() => {
    $.cachedScript(script2).done();
  });
};

/********************************
 * FOR OCEAN COMPONENT STYLE *
 ********************************/
var nodes = {
  img: {
    url: "https://sacred-traditions.org/ocean_assets/images/ocean-logo.svg",
    width: "20px",
    verticalAlign: "middle",
    margin: "0 5px"
  },
  lang: "",
  title: "Ocean 2.0 Search",
  cursor: "pointer"
};

var keyMapping = {
  /***********************************
   * DOT-UNDERS: Ḥ Ḥ Ṭ Ṭ Ẓ Ẓ Ṣ Ṣ Ḍ Ḍ *
   ***********************************/
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

  /****************************************************
   * AYN AND HAMZA (6 AND 9 CURLY SINGLE QUOTES): ’ ‘ *
   ****************************************************/
  "alt+' 9": "’",
  "alt+' 6": "‘",

  /*****************************
   * ACUTE VOWELS: Á Á Í Í Ú Ú *
   *****************************/
  "alt+' a": "á",
  "alt+' shift+a": "Á",

  "alt+' i": "í",
  "alt+' shift+i": "Í",

  "alt+' u": "ú",
  "alt+' shift+u": "Ú",

  /***************************************************
   * UNDERSCORE LETTERS: SH, GH, DH, TH, KH, ZH, CH  *
   * (MAY NEED TO USE MACRONS OR UNDERLINE INSTEAD!! *
   ***************************************************/
  "alt+u shift+s h": "S_h",
  "alt+u shift+s shift+h": "S_H",

  "alt+u g h": "g_h",
  "alt+u shift+g h": "G_h",
  "alt+u shift+g shift+h": "G_H",

  "alt+u d h": "d_h",
  "alt+u shift+d h": "D_h",
  "alt+u shift+d shift+h": "D_H",

  "alt+u t h": "t_h",
  "alt+u shift+t h": "T_h",
  "alt+u shift+t shift+h": "T_H",

  "alt+u k h": "k_h",
  "alt+u shift+k h": "K_h",
  "alt+u shift+k shift+h": "K_H",

  "alt+u z h": "z_h",
  "alt+u shift+z h": "Z_h",
  "alt+u shift+z shift+h": "Z_H",

  "alt+u c h": "c_h",
  "alt+u shift+c h": "C_h",
  "alt+u shift+c shift+h": "C_H"
};

container = function (obj) {
  var parent = document.createElement("div");
  parent.className = obj.parentClass || "";
  parent.style.cursor = nodes.cursor;

  var pic = document.createElement("img");
  pic.src = nodes.img.url;
  pic.style.width = nodes.img.width;
  pic.style.verticalAlign = nodes.img.verticalAlign;
  pic.style.margin = nodes.img.margin;

  var child = document.createElement("a");
  child.textContent = nodes.title;
  child.className = obj.childClass || "";

  parent.appendChild(pic);
  parent.appendChild(child);

  parent.addEventListener("click", function () {
    chrome.storage.sync.get(["lang"], function (result) {
      if (result.lang) {
        nodes.lang = result.lang;
      } else {
        nodes.lang = "en";
      }
      if ($("search-widget-ocean")) $("search-widget-ocean").remove();
      $("body").append(
        "<search-widget-ocean language=" +
        nodes.lang +
        "></search-widget-ocean>"
      );
      $("search-widget-ocean")[0]
        .shadowRoot.querySelector("#search-popup")
        .click();
    });
  });
  return parent;
};

// find element from parent to child (opposite closet)
closestDescendant = function (root, selector) {
  const elements = [root];
  let e;
  do {
    e = elements.shift();
  } while (!e.matches(selector) && elements.push(...e.children));
  return e.matches(selector) ? e : null;
};

// insert bahai-text when shortcut key is pressed
insertText = function (lastFocused, text) {
  var input = lastFocused;
  if (input == undefined) {
    return;
  }
  var scrollPos = input.scrollTop;
  var pos = 0;
  var browser =
    input.selectionStart || input.selectionStart == "0"
      ? "ff"
      : document.selection
        ? "ie"
        : false;
  if (browser == "ie") {
    input.focus();
    var range = document.selection.createRange();
    range.moveStart("character", -input.value.length);
    pos = range.text.length;
  } else if (browser == "ff") {
    pos = input.selectionStart;
  }

  var front = input.value.substring(0, pos);
  var back = input.value.substring(pos, input.value.length);
  input.value = front + text + back;
  pos = pos + text.length;
  if (browser == "ie") {
    input.focus();
    var range = document.selection.createRange();
    range.moveStart("character", -input.value.length);
    range.moveStart("character", pos);
    range.moveEnd("character", 0);
    range.select();
  } else if (browser == "ff") {
    input.selectionStart = pos;
    input.selectionEnd = pos;
    input.focus();
  }
  input.scrollTop = scrollPos;
};

// autocorrect when space button is pressed
autoCorrect = function (lastFocused) {
  var fullArr = lastFocused.value.split(" ");
  var lastStr = fullArr[fullArr.length - 1];
  var bahaiAutocorrect = new BahaiAutocorrect(lastStr).correct().stripUnderlines();
  var fixedStr = bahaiAutocorrect.toString();
  // var caretPos = lastFocused.selectionStart;
  fullArr.splice(-1, 1, fixedStr);
  var fullString = fullArr.join(" ");
  lastFocused.value = fullString;
}


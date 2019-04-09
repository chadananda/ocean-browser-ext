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
    $.cachedScript(script2);
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

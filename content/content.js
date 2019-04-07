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

// get url and detect
insertOceanElement = function () {
  var url = window.location.href;
  switch (url) {
    case 'https://www.google.com/': {
      $(document).ready(function () {
        var element = document.querySelector('.gb_Zd');
        var oceanComponent = container({
          parentClass: element.childNodes[0].className,
          childClass: element.childNodes[0].childNodes[0].className
        });
        element.insertBefore(oceanComponent, element.childNodes[0]);
      })
      break;
    }
    case 'http://bahai-library.com/': {
      var oceanComponent = container({});
      oceanComponent.style.margin = '13px';

      $(document).ready(function () {
        var element = document.querySelector('.gsc-search-box').closest('table');
        element.removeAttribute('align');

        var parent = element.parentNode;
        var wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';

        // set the wrapper as child (instead of the element)
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
        wrapper.appendChild(oceanComponent);
      })
      break;
    }
    case 'https://www.bahai.org/': {
      var oceanComponent = container({});
      oceanComponent.childNodes[1].style.color = '#fff';
      oceanComponent.childNodes[1].style.textDecoration = 'none';

      $(document).ready(function () {
        var element = document.querySelector('#mastersearch');
        element.style.width = '25%';
        element.parentNode.insertBefore(oceanComponent, element);
      })
      break;
    }
    case 'https://news.bahai.org/' : {
      var oceanComponent = container({});
      oceanComponent.style.margin = '10px';
      oceanComponent.childNodes[1].style.color = '#fff';
      oceanComponent.childNodes[1].style.display = 'none';

      $(document).ready(function() {
        var element = document.querySelector('#languages');
        var parent = element.parentNode;
        parent.style.display = 'flex';
        parent.insertBefore(oceanComponent, element)
      })
      break;
    }
  }
}

loadAndPopupSearch_Cached();
insertOceanElement();
// insert component when user clicks extension or press shortcut (CTRL+SHIFT+Y)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd) {
    if ($('search-widget-ocean')) $('search-widget-ocean').remove();
    $("body").append(
      "<search-widget-ocean language=" + request.cmd + "></search-widget-ocean>"
    );
    $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
    sendResponse({ res: 'success' });
  }
  return true;
});


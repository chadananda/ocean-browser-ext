
// Get url and detect
insertOceanElement = function () {
  var url = window.location.href;
  switch (url) {
    case 'https://www.google.com/':
      $(document).ready(function () {
        var element = document.querySelector('.gb_Zd');
        var oceanComponent = container({
          parentClass: element.childNodes[0].className,
          childClass: element.childNodes[0].childNodes[0].className
        });
        element.insertBefore(oceanComponent, element.childNodes[0]);
      })
      break;

    case 'http://bahai-library.com/':
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

    case 'https://www.bahai.org/':
      var oceanComponent = container({});
      oceanComponent.childNodes[1].style.color = '#fff';
      oceanComponent.childNodes[1].style.textDecoration = 'none';

      $(document).ready(function () {
        var element = document.querySelector('#mastersearch');
        element.style.width = '25%';
        element.parentNode.insertBefore(oceanComponent, element);
      })
      break;

    case 'https://news.bahai.org/':
      var oceanComponent = container({});
      oceanComponent.style.margin = '10px';
      oceanComponent.childNodes[1].style.color = '#fff';
      oceanComponent.childNodes[1].style.textDecoration = 'none';

      $(window).on('load', function () {
        setTimeout(function () {
          var element = document.querySelector('#languages');
          var parent = element.parentNode;
          parent.style.display = 'flex';
          parent.insertBefore(oceanComponent, element);
        }, 500);
      })
      break;

    case 'http://reference.bahai.org/en/':
      var oceanComponent = container({});
      oceanComponent.style.margin = '0 0 10px 0';
      oceanComponent.childNodes[1].style.color = '#3c6d8b';
      oceanComponent.childNodes[1].style.textDecoration = 'none';
      oceanComponent.childNodes[1].style.fontSize = '14px';

      $(document).ready(function () {
        var element = document.querySelector('.menuDivider');
        var parent = element.parentNode;
        parent.insertBefore(oceanComponent, element)
      })
      break;
    case 'https://www.youtube.com/':
      var oceanComponent = container({});
      oceanComponent.style.margin = '15px 0 0 0';
      oceanComponent.childNodes[0].style.padding = '0 20px';
      oceanComponent.childNodes[1].style.fontSize = '1.4rem';

      $(document).ready(function () {
        var element = document.querySelector('#guide-content');
        var parent = element.parentNode;
        parent.insertBefore(oceanComponent, element);
      })
      break;
    case 'https://www.bic.org/':
      var oceanComponent = container({});
      oceanComponent.childNodes[0].style.display = 'none';
      $(document).ready(function () {
        var element = document.querySelector('#superfish-3');
        var wrapper = document.createElement('li');
        wrapper.appendChild(oceanComponent);
        element.appendChild(wrapper);
      })
      break;
    // case 'https://www.reddit.com/':
    //   var oceanComponent = container({});
    // case 'https://www.yahoo.com/':
    case 'https://www.baidu.com/':
      var oceanComponent = container({});

      oceanComponent.style.position = 'absolute';
      oceanComponent.style.top = '0px';
      oceanComponent.style.margin = '20px 15px 5px';

      oceanComponent.childNodes[1].style.color = '#000';
      oceanComponent.childNodes[1].style.fontWeight = '700';

      $(window).on('load', function () {
        var element = document.querySelector('.head_wrapper');
        element.appendChild(oceanComponent);
      })
      break;
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

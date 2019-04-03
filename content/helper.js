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
  parent.id = obj.id;
  parent.className = obj.parentClass;
  parent.style.cursor = nodes.cursor;

  var pic = document.createElement('img');
  pic.src = nodes.img.url;
  pic.style.width = nodes.img.width;
  pic.style.verticalAlign = nodes.img.verticalAlign;
  pic.style.margin = nodes.img.margin;

  var child = document.createElement('a');
  child.textContent = nodes.title;
  child.className = obj.childClass;

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
  })
  return parent;
}
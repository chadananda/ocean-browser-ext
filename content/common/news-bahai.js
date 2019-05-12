
$(window).on('load', function () {
  // // history.pushState({}, "home", "https://news.bahai.org");
  // // history.pushState({}, "archive", "https://news.bahai.org/archive");
  // // history.pushState({}, "podcast", "https://news.bahai.org/podcast");
  // // history.pushState({}, "media-information", "https://news.bahai.org/media-information");
  // history.pushState({}, "subscribe", "https://news.bahai.org/subscribe");

  setTimeout(function () {
    var oceanComponent = container({});
    oceanComponent.style.margin = '10px';
    oceanComponent.childNodes[1].style.color = '#fff';
    oceanComponent.childNodes[1].style.textDecoration = 'none';

    var element = document.querySelector('#languages');
    var parent = element.parentNode;
    parent.style.display = 'flex';
    parent.insertBefore(oceanComponent, element);
  }, 500);

  // chrome.webNavigation.onHistoryStateUpdated.addListener(function (e) {
  //   console.log(e);
  // }, { url: { hostEquals: 'https://news.bahai.org' } })
})
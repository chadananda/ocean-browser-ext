$(window).on('load', function () {
  var oceanComponent = container({});
  oceanComponent.style.margin = '15px 0 0 0';
  oceanComponent.childNodes[0].style.padding = '0 20px';
  oceanComponent.childNodes[1].style.fontSize = '1.4rem';

  $(document).ready(function () {
    var element = document.querySelector('#guide-content');
    var parent = element.parentNode;
    parent.insertBefore(oceanComponent, element);
  })
})
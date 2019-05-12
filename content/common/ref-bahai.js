$(window).on('load', function () {
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
})
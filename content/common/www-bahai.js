$(window).on('load', function () {
  var oceanComponent = container({});
  oceanComponent.childNodes[1].style.color = '#fff';
  oceanComponent.childNodes[1].style.textDecoration = 'none';

  $(document).ready(function () {
    var element = document.querySelector('#mastersearch');
    element.style.width = '25%';
    element.parentNode.insertBefore(oceanComponent, element);
  })
})
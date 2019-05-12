$(window).on('load', function () {
  var oceanComponent = container({});
  oceanComponent.style.margin = '0 15px 0 0';
  oceanComponent.childNodes[0].style.width = '35px';
  oceanComponent.childNodes[1].style.display = 'none';

  var element = document.querySelector('#uh-signin');
  var parent = element.parentNode.parentNode;
  parent.style.display = 'flex';
  parent.insertBefore(oceanComponent, element.parentNode)
})
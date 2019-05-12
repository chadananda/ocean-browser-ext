$(window).on('load', function () {
  var oceanComponent = container({});
  oceanComponent.childNodes[0].style.display = 'none';
  $(document).ready(function () {
    var element = document.querySelector('#superfish-3');
    var wrapper = document.createElement('li');
    wrapper.appendChild(oceanComponent);
    element.appendChild(wrapper);
  })
})
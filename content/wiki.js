$(window).on('load', function() {
  var oceanComponent = container({});
  oceanComponent.style.padding = '15px 0 0 0';
  oceanComponent.childNodes[0].style.display = 'none';
  oceanComponent.childNodes[1].style.color = '#222';

  var element = document.querySelector('#ca-talk');
  var wrapper = document.createElement('li');
  wrapper.appendChild(oceanComponent);
  element.parentNode.appendChild(wrapper);
})
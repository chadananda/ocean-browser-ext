$(window).on('load', function () {
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
})
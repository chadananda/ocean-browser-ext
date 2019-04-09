$(window).on('load', function () {
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
})
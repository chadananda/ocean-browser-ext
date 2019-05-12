$(window).on('load', function () {
  var element = document.querySelector('.gb_Zd');

  var oceanComponent = container({
    parentClass: element.childNodes[0].className,
    childClass: element.childNodes[0].childNodes[0].className
  });
  
  element.insertBefore(oceanComponent, element.childNodes[0]);
})
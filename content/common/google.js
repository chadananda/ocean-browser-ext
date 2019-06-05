$(window).on('load', function () {
  var gmailDiv = closestDescendant(document.querySelector('#searchform'), '[data-pid="23"]');
  var parent = gmailDiv.parentNode;
  
  var oceanComponent = container({
    parentClass: parent.className,
    childClass: gmailDiv.className
  });
  
  parent.parentNode.insertBefore(oceanComponent, parent);
})
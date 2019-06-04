$(window).on('load', function () {
  var gmailDiv = closestDescendant(document.querySelector('#searchform'), 'a[href$="ogbl"]');
  // var gmailDiv = closestDescendant(document.querySelector('#searchform'), 'a[href]');
  var parent = gmailDiv.parentNode;
  
  var oceanComponent = container({
    parentClass: parent.className,
    childClass: gmailDiv.className
  });
  
  parent.parentNode.insertBefore(oceanComponent, parent);
})
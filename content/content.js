$(window).on('load', function () {
  loadAndPopupSearch_Cached();
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cmd) {
      if ($('search-widget-ocean')) $('search-widget-ocean').remove();
      $("body").append(
        "<search-widget-ocean language=" + request.cmd + "></search-widget-ocean>"
      );
      $('search-widget-ocean')[0].shadowRoot.querySelector('#search-popup').click();
      sendResponse({ res: 'success' });
    }
    return true;
  });

  var lastFocused;
  $("input, textarea").focus(function () {
    lastFocused = document.activeElement;
  });

  $("input, textarea").addClass('mousetrap');
  Mousetrap.bind("ctrl+.+h", function(e){
    e.preventDefault();
    insertText(lastFocused, keyMapping["ctrl+.+h"])
    return false;
  })

  Mousetrap.bind("ctrl+.+t", function(e){
    e.preventDefault();
    insertText(lastFocused, keyMapping["ctrl+.+t"])
  })

  Mousetrap.bind("ctrl+.+z", function(e){
    e.preventDefault();
    insertText(lastFocused, keyMapping["ctrl+.+z"])
  })

  Mousetrap.bind("ctrl+.+s", function(e){
    e.preventDefault();
    insertText(lastFocused, keyMapping["ctrl+.+s"])
  })

  Mousetrap.bind("ctrl+.+d", function(e){
    e.preventDefault();
    insertText(lastFocused, keyMapping["ctrl+.+d"])
  })

  Mousetrap.bind("ctrl+'+9", function(e){
    e.preventDefault();
    insertText(lastFocused, keyMapping["ctrl+'+9"])
  })

  Mousetrap.bind("ctrl+'+6", function(e){
    e.preventDefault();
    insertText(lastFocused, keyMapping["ctrl+'+6"])
  })
})

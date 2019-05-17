$(window).on('load', function () {
  var port = chrome.runtime.connect({
    name: 'ocean extension'
  })
  port.postMessage({
    method: 'getEditToolSetting'
  })
  port.onMessage.addListener(function (msg) {
    if (msg.response == 'editToolSetting') {
      if (msg.data.keyMapping) {


        // function insertCharacter(text) {
        //   googleDocsUtil.setTextCurrentCursor(text);
        //   // var googleDoc = googleDocsUtil.getGoogleDocument();
        // }
        var editingIframe;
        var findEditingIframe = setInterval(function () {
          editingIframe = document.getElementsByTagName('iframe')[4];
          console.log('...finding editIframe...');
          if (editingIframe) {
            console.log('found');
            Mousetrap(editingIframe.contentDocument).bind("alt+. h", function (e) {
              e.preventDefault();
              console.log('called');
              googleDocsUtil.setTextCurrentCursor("ḥ");
            })
            // Mousetrap(editingIframe).bind({
            //   "alt+. h": function(e) {
            //     e.preventDefault();
            //     console.log('called');
            //     // insertCharacter("ḥ");
            //     googleDocsUtil.setTextCurrentCursor("ḥ");
            //   }
            // })
            clearInterval(findEditingIframe);
          }
        }, 2000);
      }
    }
  })
})
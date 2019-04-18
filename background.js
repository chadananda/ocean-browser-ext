var lang = 'en';
var editTool = {
  keyMapping: false,
  autoCorrect: false,
  spellCheck: false
};

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == 'ocean extension');
  port.onMessage.addListener(function (msg) {
    if (msg.method == 'getEditToolSetting') {
      chrome.storage.sync.get(['keyMapping', 'autoCorrect', 'spellCheck'], function (result) {
        if (result) {
          editTool = result;
        }
        port.postMessage({
          response: 'editToolSetting',
          data: editTool
        })
      })
    }
  })
})

chrome.commands.onCommand.addListener(function (command) {
  if (command == "toggle-feature-foo") {
    chrome.storage.sync.get(['lang'], function (result) {
      if (result.lang) {
        lang = result.lang;
      }
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { cmd: lang }, function (response) {
          if (response.res == 'success') {
            console.log('success');
          }
        });
      });
    });
  }
});




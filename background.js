var lang = '';
chrome.commands.onCommand.addListener(function (command) {
  if (command == "toggle-feature-foo") {
    chrome.storage.sync.get(['lang'], function (result) {
      if (result.lang) {
        lang = result.lang;
      } else {
        lang = 'en';
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
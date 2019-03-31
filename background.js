// chrome.commands.onCommand.addListener(function(command) {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//     chrome.tabs.sendMessage(tabs[0].id, {cmd: command}, function(response){
//       if (response.res == 'success') {
//         console.log('success');
//       }
//     });
//   });
// });
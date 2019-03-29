chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.cmd == "openOceanSearch") {
      //import libraries in head tag
      // window.onload = function () {
        var head = document.getElementsByTagName("head")[0];

        var vue = document.createElement("script");
        vue.type = "text/javascript";
        vue.src = "https://unpkg.com/vue@2.6.10/dist/vue.js";
        head.appendChild(vue);

        var component = document.createElement("script");
        component.type = "text/javascript";
        component.src = "https://search-widget.current.build.ocean.isddesign.com/search-widget-ocean.min.js";
        head.appendChild(component);

        var component = document.createElement("search-widget-ocean");
        var childComponent = document.createElement("div");
        childComponent.setAttribute('id', 'openOceanSearch');
        component.appendChild(childComponent);
        document.body.insertBefore(component, document.body.firstChild);

        setTimeout(function () {
          document.querySelector('search-widget-ocean').shadowRoot.querySelector('#openOceanSearch').click();
        }, 3000)
      }
      // sendResponse({ res: 'success' });
    // }
    return true;
  }
);
// chrome.runtime.onConnect.addListener(function(port) {
//   console.assert(port.name == "knockknock");
//   port.onMessage.addListener(function(msg) {
//     if (msg.joke == "Knock knock")
//       port.postMessage({question: "Who's there?"});
//     else if (msg.answer == "Madame")
//       port.postMessage({question: "Madame who?"});
//     else if (msg.answer == "Madame... Bovary")
//       port.postMessage({question: "I don't get it."});
//   });
// });


//import libraries in head
var head = document.getElementsByTagName("head")[0];

var vue = document.createElement("script");
vue.type = "text/javascript";
vue.src = "https://unpkg.com/vue@2.6.10/dist/vue.js";
head.appendChild(vue);

var component = document.createElement("script");
component.type = "text/javascript";
component.src = "https://search-widget.current.build.ocean.isddesign.com/search-widget-ocean.min.js";
head.appendChild(component);

//insert component in body
var component = document.createElement("search-widget-ocean");
var childComponent = document.createElement("div");
childComponent.setAttribute('id', 'openOceanSearch');
component.appendChild(childComponent);
document.body.insertBefore(component, document.body.firstChild);

// listen click event on extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == "openOceanSearch") {
    document.querySelector('search-widget-ocean').shadowRoot.querySelector('#openOceanSearch').click();
    sendResponse({ res: 'success' });
  }
  return true;
});
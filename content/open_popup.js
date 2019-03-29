chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.cmd == "openPopup") {
      var component = document.createElement("search-widget-ocean");
      var childComponent = document.createElement("div");
      childComponent.setAttribute('id', 'openOceanSearch');
      component.appendChild(childComponent);
      document.body.insertBefore(component, document.body.firstChild);
      document.querySelector('search-widget-ocean').shadowRoot.querySelector('#openOceanSearch').click();
      return true;
    }
  });
"use strict";

var nodes = {
  openOceanSearch: document.getElementById('openOceanSearch'),
  language: document.getElementById('language'),
  tools: document.getElementById('tools'),
  download: document.getElementById('download')
}
const downloadLink = "https://sacred-traditions.org/ocean/";
function setListeners() {
  // function openOceanSearch(){

  // }
  function openDownloadPage() {
    chrome.tabs.create({ url: downloadLink });
  }
  function checkBoxHandler(handler){
    if (handler.checked) {
      console.log(handler.value)
    } else {
      console.log('unchecked')
    }
  }
  nodes.tools.querySelector('input[name=key_mapping]').addEventListener('change', function(){
    checkBoxHandler(this);
  })
  nodes.tools.querySelector('input[name=auto_correct]').addEventListener('change', function(){
    checkBoxHandler(this);
  })
  nodes.tools.querySelector('input[name=spell_check]').addEventListener('change', function(){
    checkBoxHandler(this);
  })
  nodes.download.addEventListener('click', function(){
    openDownloadPage()
  })
  
  // nodes.openOceanSearch.addEventListener('click', function(){
  //   openOceanSearch();
  // })

}
setListeners();
"use strict";

var nodes = {
  openOceanSearch: document.getElementById('openOceanSearch'),
  language: document.getElementById('language'),
  tools: {
    key_mapping: document.getElementById(key_mapping),
    auto_correct: document.getElementById(auto_correct),
    spellcheck: document.getElementById(spellcheck)
  },
  download: document.getElementById('download')
}
const downloadLink = "https://sacred-traditions.org/ocean/";
function setListeners() {
  function openDownloadPage() {
    chrome.tabs.create({ url: downloadLink });
  }
  // function openOceanSearch(){

  // }
  nodes.download.addEventListener('click', function(){
    openDownloadPage()
  })
  // nodes.openOceanSearch.addEventListener('click', function(){
  //   openOceanSearch();
  // })
}
setListeners();
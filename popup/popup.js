"use strict";

var nodes = {
  openOceanSearch: document.getElementById('open_ocean_search'),
  language: document.getElementById('language_letter'),
  tools: document.getElementById('tools'),
  download: document.getElementById('download')
}
const downloadLink = "https://sacred-traditions.org/ocean/";
const locales = {
  en: {
    openOceanSearch: 'Ocean 2.0 Search, Alt-S',
    language: 'Language',
    editTool: 'Editing Tools',
    keyMapping: 'Shortcut Characters',
    autoCorrect: 'Auto-correct Common',
    spellCheck: 'Spellcheck Terms',
    download: 'Ocean 2.0 App'
  },
  ar: {
    openOceanSearch: 'بحث المحيط 2.0 ، Alt-S',
    language: 'لغة',
    editTool: 'أدوات التحرير',
    keyMapping: 'أحرف الاختصار',
    autoCorrect: 'التصحيح التلقائي المشترك',
    spellCheck: 'شروط التدقيق الإملائي',
    download: 'محيط 2.0 التطبيق'
  },
  fa: {
    openOceanSearch: 'اقیانوس 2.0 جستجو، Alt-S',
    language: 'زبان',
    editTool: 'ویرایش ابزارها',
    keyMapping: 'شخصیت های میانبر',
    autoCorrect: 'تصحیح خودکار رایج است',
    spellCheck: 'اصطلاحات املا',
    download: 'اقیانوس 2.0 برنامه'
  }
}
function setListeners() {
  function changePopupUI(lang) {
    // nodes.openOceanSearch.innerHTML = locales[lang].openOceanSearch;
    // nodes.language.innerHTML = locales[lang].language;
    console.log(nodes.language.innerHTML);
    console.log(locales[lang].language);
  }
  function openOceanSearch(){

  }
  function openDownloadPage() {
    chrome.tabs.create({ url: downloadLink });
  }
  function checkBoxHandler(handler){
    if (handler.checked) {
      console.log(handler.value);
    } else {
      console.log('unchecked');
    }
  }
  nodes.language.onchange = function() {
    var value = this.options[this.selectedIndex].value;
    if (value == 'ar') changePopupUI('ar');
    else if (value == 'fa') changePopupUI('fa');
    else changePopupUI('en');
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
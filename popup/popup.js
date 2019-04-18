"use strict";

var nodes = {
  openOceanSearch: document.getElementById('open_ocean_search'),
  openOceanSearchLetter: document.getElementById('open_ocean_search_letter'),
  language_letter: document.getElementById('language_letter'),
  language: document.getElementById('language'),
  tools: {
    legend: document.getElementById('edit_tool_letter'),
    key_mapping: document.querySelector('#key_mapping'),
    auto_correct: document.querySelector('#auto_correct'),
    spell_check: document.querySelector('#spell_check'),
    key_mapping_letter: document.getElementById('key_mapping_letter'),
    auto_correct_letter: document.getElementById('auto_correct_letter'),
    spell_check_letter: document.getElementById('spell_check_letter')
  },
  download: {
    button: document.getElementById('download'),
    letter: document.getElementById('download_letter')
  }
}
const downloadLink = "https://sacred-traditions.org/ocean/";
const locales = {
  en: {
    openOceanSearchLetter: 'Ocean 2.0 Search, Alt-S',
    language: 'Language',
    editTool: 'Editing Tools',
    keyMapping: 'Shortcut Characters',
    autoCorrect: 'Auto-correct Common',
    spellCheck: 'Spellcheck Terms',
    download: 'Ocean 2.0 App'
  },
  ar: {
    openOceanSearchLetter: 'محيط 2.0 بحث, Alt-S',
    language: 'لغة',
    editTool: 'أدوات التحرير',
    keyMapping: 'أحرف الاختصار',
    autoCorrect: 'التصحيح التلقائي المشترك',
    spellCheck: 'شروط التدقيق الإملائي',
    download: 'محيط 2.0 التطبيق'
  },
  fa: {
    openOceanSearchLetter: 'اقیانوس 2.0 جستجو، Alt-S',
    language: 'زبان',
    editTool: 'ویرایش ابزارها',
    keyMapping: 'شخصیت های میانبر',
    autoCorrect: 'تصحیح خودکار رایج است',
    spellCheck: 'اصطلاحات املا',
    download: 'اقیانوس 2.0 برنامه'
  }
}

var setting = {
  lang: 'en',
  keyMapping: false,
  autoCorrect: false,
  spellCheck: false
};

function changePopupUI(setting) {
  var lang = setting.lang;
  nodes.openOceanSearchLetter.innerHTML = locales[lang].openOceanSearchLetter;
  nodes.language_letter.innerHTML = locales[lang].language;
  nodes.tools.legend.innerHTML = locales[lang].editTool;
  nodes.tools.key_mapping_letter.innerHTML = locales[lang].keyMapping;
  nodes.tools.auto_correct_letter.innerHTML = locales[lang].autoCorrect;
  nodes.tools.spell_check_letter.innerHTML = locales[lang].spellCheck;
  nodes.download.letter.innerHTML = locales[lang].download;
}
function openOceanSearch(lang) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {cmd: lang}, function(response) {
      if(response.res == 'success') {
        window.close();
      }
    });
  });
}

function openDownloadPage() {
  chrome.tabs.create({ url: downloadLink });
}

function setListeners() {
  // open ocean search  
  nodes.openOceanSearch.addEventListener('click', function () {
    openOceanSearch(nodes.language.value);
  });
  // change language option
  nodes.language.onchange = function () {
    var value = this.options[this.selectedIndex].value;
    setting.lang = value;
    chrome.storage.sync.set({lang: setting.lang}, function(){
    });
    changePopupUI(setting);
  }
  // set tool
  nodes.tools.key_mapping.addEventListener('change', function () {
    chrome.storage.sync.set({keyMapping: this.checked}, function(){})
  });

  nodes.tools.auto_correct.addEventListener('change', function () {
    chrome.storage.sync.set({autoCorrect: this.checked}, function(){})
  });

  nodes.tools.spell_check.addEventListener('change', function () {
    chrome.storage.sync.set({spellCheck: this.checked}, function(){})
  });
 
  nodes.download.button.addEventListener('click', function () {
    openDownloadPage()
  });
}


chrome.storage.sync.get(['lang', 'keyMapping', 'autoCorrect', 'spellCheck'], function(result) {
  if (result.lang) {
    setting.lang = result.lang
    nodes.language.value = result.lang;
  }
  if (result.keyMapping) {
    setting.keyMapping = result.keyMapping
    nodes.tools.key_mapping.checked = true;
  }
  if (result.autoCorrect) {
    setting.autoCorrect = true;
    nodes.tools.auto_correct.checked = true;
  }
  if (result.spellCheck) {
    setting.spellCheck = true;
    nodes.tools.spell_check.checked = true;
  }
  changePopupUI(setting);
});

setListeners();


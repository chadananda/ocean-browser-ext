"use strict";

var nodes = {
  openOceanSearch: document.getElementById('open_ocean_search'),
  openOceanSearchLetter: document.getElementById('open_ocean_search_letter'),
  language_letter: document.getElementById('language_letter'),
  language: document.getElementById('language'),
  tools: {
    edit_tool: document.getElementById('tools'),
    legend: document.getElementById('edit_tool_letter'),
    key_mapping: document.getElementById('key_mapping'),
    auto_correct: document.getElementById('auto_correct'),
    spell_check: document.getElementById('spell_check')
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
function setListeners() {
  function openOceanSearch() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {cmd: "openOceanSearch"}, function(response) {
        if(response.res == 'success') {
          window.close();
        }
      });
    });
  }
  function changePopupUI(lang) {
    nodes.openOceanSearchLetter.innerHTML = locales[lang].openOceanSearchLetter;
    nodes.language_letter.innerHTML = locales[lang].language;
    nodes.tools.legend.innerHTML = locales[lang].editTool;
    nodes.tools.key_mapping.innerHTML = locales[lang].keyMapping;
    nodes.tools.auto_correct.innerHTML = locales[lang].autoCorrect;
    nodes.tools.spell_check.innerHTML = locales[lang].spellCheck;
    nodes.download.letter.innerHTML = locales[lang].download;
  }
  function checkBoxHandler(handler) {
    if (handler.checked) {
      console.log(handler.value);
    } else {
      console.log('unchecked');
    }
  }
  function openDownloadPage() {
    chrome.tabs.create({ url: downloadLink });
  }
  nodes.openOceanSearch.addEventListener('click', function () {
    // openOceanSearch(nodes.language.value);
    openOceanSearch();
  })
  nodes.language.onchange = function () {
    var value = this.options[this.selectedIndex].value;
    if (value == 'ar') changePopupUI('ar');
    else if (value == 'fa') changePopupUI('fa');
    else changePopupUI('en');
  }
  nodes.tools.edit_tool.querySelector('input[name=key_mapping]').addEventListener('change', function () {
    checkBoxHandler(this);
  })
  nodes.tools.edit_tool.querySelector('input[name=auto_correct]').addEventListener('change', function () {
    checkBoxHandler(this);
  })
  nodes.tools.edit_tool.querySelector('input[name=spell_check]').addEventListener('change', function () {
    checkBoxHandler(this);
  })
  nodes.download.button.addEventListener('click', function () {
    openDownloadPage()
  })
}
setListeners();


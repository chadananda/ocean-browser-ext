function $rw_event_screenshotreader() {
  var a = textHelp.webreader.UserSettingsSingleton.getInst().getUserSettings(),
    b = a.language.services;
  window.postMessage({
    method: 'thCheckExtension',
    type: '1757FROM_PAGERW4G',
    payload: {
      ChromeExtId: texthelp.RW4GC.texthelpScreenShotReaderID,
      Lang: b,
      defaultsettings: a.speechoptions
    }
  }, '*')
}
var timeoutId, timeoutObj, mirrorDiv, computed, style, GlobalPredictionState = !1,
  ie = document.all,
  properties = ['boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'],
  isFirefox = null != window.mozInnerScreenX,
  mirrorDivDisplayCheckbox = document.getElementById('mirrorDivDisplay');
getCaretCoordinates = function (a, b) {
  mirrorDiv = document.getElementById(a.nodeName + '--mirror-div'), mirrorDiv || (mirrorDiv = document.createElement('div'), mirrorDiv.id = a.nodeName + '--mirror-div', document.body.appendChild(mirrorDiv)), style = mirrorDiv.style, computed = getComputedStyle(a), style.whiteSpace = 'pre-wrap', 'INPUT' !== a.nodeName && (style.wordWrap = 'break-word'), style.position = 'absolute', style.top = a.offsetTop + parseInt(computed.borderTopWidth) + 'px', style.left = '400px', style.visibility = 'hidden', properties.forEach(function (a) {
    style[a] = computed[a]
  }), isFirefox ? (style.width = parseInt(computed.width) - 2 + 'px', a.scrollHeight > parseInt(computed.height) && (style.overflowY = 'scroll')) : style.overflow = 'hidden', mirrorDiv.textContent = a.value.substring(0, b), 'INPUT' === a.nodeName && (mirrorDiv.textContent = mirrorDiv.textContent.replace(/\s/g, '\xA0'));
  var c = document.createElement('span');
  c.textContent = a.value.substring(b) || '.', c.style.backgroundColor = 'lightgrey', mirrorDiv.appendChild(c);
  var d = {
    top: c.offsetTop + parseInt(computed.borderTopWidth),
    left: c.offsetLeft + parseInt(computed.borderLeftWidth)
  };
  return d
};
var currentWordCollection = [];
this.currentTextPosition = 0;

function getSelectionCoords(a) {
  a = a || window;
  var b, c, d, e = a.document,
    f = e.selection,
    g = 0,
    h = 0;
  if (f) 'Control' != f.type && (b = f.createRange(), b.collapse(!0), g = b.boundingLeft, h = b.boundingTop);
  else if (a.getSelection && (f = a.getSelection(), f.rangeCount && (b = f.getRangeAt(0).cloneRange(), b.getClientRects && (b.collapse(!0), c = b.getClientRects(), 0 < c.length && (d = b.getClientRects()[0]), g = d.left, h = d.top), 0 == g && 0 == h))) {
    var i = e.createElement('span');
    if (i.getClientRects) {
      i.appendChild(e.createTextNode('\u200B')), b.insertNode(i), d = i.getClientRects()[0], g = d.left, h = d.top;
      var j = i.parentNode;
      j.removeChild(i), j.normalize()
    }
  }
  var k = {
    top: h,
    left: g
  };
  return k
}

function GetOffset(a, b) {
  a && (b.x += a.offsetLeft, b.y += a.offsetTop, GetOffset(a.offsetParent, b))
}

function PositionPopup(a) {
  var b = a,
    c = getComputedStyle(b).getPropertyValue('font-size'),
    d = document.getElementById('rwGooglePredictionResponseDetails');
  if (d.style.position = 'absolute', 'TEXTAREA' == a.nodeName || 'INPUT' == a.nodeName && 'text' == a.type.toLowerCase()) {
    var e = getCaretCoordinates(b, b.selectionEnd),
      f = {
        x: 0,
        y: 0
      };
    GetOffset(b, f), d.style.top = f.y - b.scrollTop + e.top + parseInt(c) + 15 + 'px', d.style.left = f.x - b.scrollLeft + e.left - 18 + 'px', console.log('Element Final Position : ' + d.style.top + ' / ' + d.style.left)
  } else {
    var e = getSelectionCoords();
    d.style.top = e.top + parseInt(c) + 10 + 35 + 'px', d.style.left = e.left + 'px'
  }
}

function getLineNumber(a) {
  return a.value.substr(0, a.selectionStart).split('\n').length
}

function insertTextToCurrentControl(a) {
  console.log(a);
  a != void 0 && (parseTexter = new rwGoogleTextParse, parseTexter.CurrentWord = a, parseTexter.InsertText(currentContextControlID, parseTexter.CurrentWord), newCaretPosition = parseTexter.CursorPosition)
}

function GetScreenCordinates(a) {
  for (var b = {
    x: a.offsetLeft,
    y: a.offsetTop
  }; a.offsetParent && (b.x += a.offsetParent.offsetLeft, b.y += a.offsetParent.offsetTop, a != document.getElementsByTagName('body')[0]);) a = a.offsetParent;
  return b
}

function rwGoogleKeyUpListener(a) {
  if (a.preventDefault(), rwGooglecoreUI = new rwGoogleUIHandling, a.ctrlKey && a.shiftKey) switch (a.keyCode) {
    case 49:
      insertTextToCurrentControl(currentWordCollection[0]);
      break;
    case 50:
      insertTextToCurrentControl(currentWordCollection[1]);
      break;
    case 51:
      insertTextToCurrentControl(currentWordCollection[2]);
      break;
    case 52:
      insertTextToCurrentControl(currentWordCollection[3]);
      break;
    case 53:
      insertTextToCurrentControl(currentWordCollection[4]);
      break;
    case 54:
      insertTextToCurrentControl(currentWordCollection[5]);
      break;
    case 55:
      insertTextToCurrentControl(currentWordCollection[6]);
      break;
    case 56:
      insertTextToCurrentControl(currentWordCollection[7]);
      break;
    case 57:
      insertTextToCurrentControl(currentWordCollection[8]);
    case 48:
      insertTextToCurrentControl(currentWordCollection[9]);
  }
  if (9 != a.keyCode && 13 != a.skeyCode) {
    newRequest = !0;
    var b = null == a.srcElement ? currentContextControlID : a.srcElement;
    var c = b.getBoundingClientRect(),
      d = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
      e = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
    callerTopOffset = c.top + d + 35, callerLeftOffset = c.left + e;
    var f = GetScreenCordinates(b);
    if (callerTopOffset = f.y, callerLeftOffset = f.x, 'rwGooglePredictionResponseDetails' != b.id) switch (b.tagName) {
      case 'SPANx':
      case 'DIVx':
        null != a.srcElement && (currentContextControlID = a.srcElement), currentPosition = 0, callerLeftOffset += currentPosition;
        var g = 0,
          h = '';
        parseTexter = new rwGoogleTextParse;
        document.getElementById(currentContextControlID.id);
        PositionPopup(currentContextControlID), alert(prediction_PredictAhead), rwGooglecoreUI.CallPrediction(h, g, currentContextControlID);
        break;
      case 'INPUT':
      case 'TEXTAREA':
        if (null != a.srcElement && (currentContextControlID = a.srcElement), !rwGooglecoreUI.ignoreControlType(currentContextControlID.type)) {
          var g = getLineNumber(currentContextControlID);
          currentPosition = rwGooglecoreUI.doGetCaretPositionInputField(currentContextControlID), callerLeftOffset += currentPosition + 10, callerTopOffset += 5 * g;
          var h = currentContextControlID.value;
          PositionPopup(currentContextControlID), rwGooglecoreUI.CallPrediction(h, g, currentContextControlID)
        }
    }
  } else document.getElementById('rwGooglePredictionResponseDetails').style.display = 'none', document.getElementById('rwDict').style.display = 'none';
  rwGooglecoreUI = void 0
}

function sleep(a) {
  for (var b = new Date().getTime(); b + a >= new Date().getTime(););
}

function rwHandlePredictionClickEvent(a) {
  a.preventDefault();
  var b = currentContextControlID;
  if (newRequest && (rwGooglecoreUI = new rwGoogleUIHandling, a.target && 'DIV' == a.target.nodeName))
    if (a.target && 'rwlist-group-item-dict rwclearfix' == a.target.className);
    else if ('rwlist-group-item' == a.target.className) {
      switch (g_lastTarget = void 0, b.tagName) {
        case 'DIV':
        case 'SPAN':
          parseTexter = new rwGoogleTextParse;
          var c = 0;
          parseTexter.CurrentWord = a.target.innerText.substr(3, a.target.innerText.length), parseTexter.InsertText(currentContextControlID, parseTexter.CurrentWord), newCaretPosition = parseTexter.CursorPosition;
          break;
        case 'INPUT':
        case 'TEXTAREA':
          var d = b.value;
          parseTexter = new rwGoogleTextParse;
          var c = getLineNumber(currentContextControlID);
          parseTexter.rootText = d, parseTexter.parseText(currentPosition, c, currentContextControlID), parseTexter.CurrentWord = a.target.innerText.substr(3, a.target.innerText.length), parseTexter.InsertText(currentContextControlID, parseTexter.CurrentWord), newCaretPosition = parseTexter.CursorPosition;
      }
      newRequest = !1, a.stopPropagation();
      var e = new KeyboardEvent('keyup', {
        view: window,
        bubbles: !1,
        cancelable: !0
      });
      e.srcElement = currentContextControlID, rwGoogleKeyUpListener(e)
    }
}

function rwHoverSpeechEvent(a) {
  var b = ie ? a.srcElement : a.target;
  a.target && 'DIV' == a.target.nodeName && 'rwlist-group-item' == a.target.className && (timeoutObj = b, timeoutId = setTimeout('rw_speak(\'' + a.target.innerText.substr(3, a.target.innerText.length) + '\')', 1e3))
}

function rwHoverStopSpeechEvent(a) {
  ie ? a.srcElement : a.target;
  a.target && 'DIV' == a.target.nodeName && 'rwlist-group-item' == a.target.className && timeoutId && clearTimeout(timeoutId)
}

function rwClickPrediction() {
  document.getElementById('rwGooglePredictionResponseDetails').style.display = 'none', document.getElementById('rwDict').style.display = 'none'
}

function GetSelection(a) {
  var b, c = a;
  if (document.selection != void 0) {
    c.focus();
    var d = document.selection.createRange();
    b = d.text
  } else if (c.selectionStart != void 0) {
    var e = c.selectionStart,
      f = c.selectionEnd;
    b = c.value.substring(e, f)
  }
  return b
}

function rwClickControlHandler(a) {
  try {
    var b = GetSelection(a.srcElement);
    b != void 0 && 0 == b.length && rwGoogleKeyUpListener(a)
  } catch (a) {
    thLogE(a)
  }
}

function rwPredictionState(a) {
  switch (a) {
    case 'Off':
      try {
        this.GlobalPredictionState && (GlobalPredictionState = !1, document.getElementById('PredictionAll').className = '', document.removeEventListener('keyup', rwGoogleKeyUpListener, !1), document.removeEventListener('click', rwClickControlHandler, !1), document.getElementById('rwGooglePredictionResponseDetails').removeEventListener('click', rwHandlePredictionClickEvent, !1), document.getElementById('rwGooglePredictionResponseDetails').removeEventListener('mouseover', rwHoverSpeechEvent, !1), document.removeEventListener('click', rwClickPrediction, !1), document.getElementById('rwGooglePredictionResponseDetails').style.display = 'none', document.getElementById('rwDict').style.display = 'none')
      } catch (a) {
        thLogE(a)
      }
      break;
    case 'On':
      try {
        if (this.GlobalPredictionState) {
          document.getElementById('PredictionAll').className = 'enabled', document.addEventListener('click', rwClickControlHandler, !1), document.addEventListener('keyup', rwGoogleKeyUpListener, !1), this.GlobalPredictionState = !0;
          document.getElementById('rwGooglePredictionResponseDetails').addEventListener('mouseover', rwHoverSpeechEvent, !1), document.getElementById('rwGooglePredictionResponseDetails').addEventListener('mouseout', rwHoverStopSpeechEvent, !1), document.getElementById('rwGooglePredictionResponseDetails').addEventListener('click', rwHandlePredictionClickEvent, !1), document.addEventListener('click', rwClickPrediction, !1)
        }
      } catch (a) {
        thLogE(a)
      }
  }
}

function rwth_hasClass(a, b) {
  return a.className.match(new RegExp('(\\s|^)' + b + '(\\s|$)'))
}

function rwth_removeClass(a, b) {
  if (rwth_hasClass(a, b)) {
    var c = new RegExp('(\\s|^)' + b + '(\\s|$)');
    a.className = a.className.replace(c, ' ')
  }
}

function $rw_event_PredictionAll() {
  try {
    if (!this.GlobalPredictionState) {
      var a = document.getElementsByClassName('th-prediction-image')[0];
      if (null == a) return;
      rwth_hasClass(a, 'enabled') || (a.className += ' enabled'), document.addEventListener('click', rwClickControlHandler, !1), document.addEventListener('keyup', rwGoogleKeyUpListener, !1), this.GlobalPredictionState = !0;
      document.getElementById('rwGooglePredictionResponseDetails').addEventListener('mouseover', rwHoverSpeechEvent, !1), document.getElementById('rwGooglePredictionResponseDetails').addEventListener('mouseout', rwHoverStopSpeechEvent, !1), document.getElementById('rwGooglePredictionResponseDetails').addEventListener('click', rwHandlePredictionClickEvent, !1), document.addEventListener('click', rwClickPrediction, !1)
    } else {
      GlobalPredictionState = !1;
      var a = document.getElementsByClassName('th-prediction-image')[0];
      if (null == a) return;
      rwth_removeClass(a, 'enabled'), document.removeEventListener('keyup', rwGoogleKeyUpListener, !1), document.removeEventListener('click', rwClickControlHandler, !1), document.getElementById('rwGooglePredictionResponseDetails').removeEventListener('click', rwHandlePredictionClickEvent, !1), document.getElementById('rwGooglePredictionResponseDetails').removeEventListener('mouseover', rwHoverSpeechEvent, !1), document.removeEventListener('click', rwClickPrediction, !1), document.getElementById('rwGooglePredictionResponseDetails').style.display = 'none', document.getElementById('rwDict').style.display = 'none'
    }
  } catch (a) {
    thLogE(a)
  }
}

function rw_speak(a) {
  $rw_stopSpeech();
  try {
    if (g_bChromeExtension && window.postMessage({
      type: '1757FROM_PAGERW4G',
      command: 'trackEvent',
      settings: {
        category: 'FromWebReader',
        action: 'WebReader speak sentence with hover',
        label: window.location.host
      }
    }, '*'), null == a) return;
    if (rw_isSpeechBusy()) return g_aTargetQueue.push('rw_speakHoverTarget'), g_aTargetQueue.push(a), void (0 == g_nTargetQueueTimerId && (g_nTargetQueueTimerId = setTimeout(rw_targetQueueTimer, 500)));
    g_lTargetQueueTime = new Date().getTime(), g_lastTarget = null;
    var b = new SpeechStream.SpeechRequest;
    b.setString(a.toString(), SpeechStream.SpeechRequestBookmarks.NONE);
    var c = b.getText(),
      d = g_controllerFactory.getConnector();
    null == d || g_bDisableSpeech || (SpeechStream.cacheMode.useBackupForLiveRequests() ? d.simpleSpeechFromBackup(c, !g_bLocalPronunciationLoaded) : d.simpleSpeech(c, !g_bLocalPronunciationLoaded))
  } catch (a) {
    thLog('rw_speakHoverTarget error:' + a.message)
  }
}

function rw_PredictionDictionaryRequest(a) {
  try {
    var b = a;
    if (g_bIsScholastic) return void ('function' == typeof displayDictionaryTerm && displayDictionaryTerm(b));
    if (0 < b.length) {
      var c = g_controllerFactory.getConnector();
      if (null != c)
        if ('undefined' != typeof eba_custom_dictionary_url && null != eba_custom_dictionary_url && 0 < eba_custom_dictionary_url.length) c.getCustomDictionaryPage(b, eba_custom_dictionary_url);
        else if ('undefined' != typeof eba_alt_dictionary_url && null != eba_alt_dictionary_url && 0 < eba_alt_dictionary_url.length) {
          var d = eba_alt_dictionary_url + b;
          rw_newWindow(d, 'popup', 700, 500, 1, 1, 0, 0, 0, 0, 0)
        } else rwPredictionGetDictionaryPage(b)
    } else if ('undefined' != typeof eba_alt_dictionary_url && null != eba_alt_dictionary_url && 0 < eba_alt_dictionary_url.length) alert(textHelp.webreader.LocaleSingleton.getInst().getLocaleString('selection_no_word'));
    else {
      var e = 'result=<div class="th-nomatch">' + textHelp.webreader.LocaleSingleton.getInst().getLocaleString('selection_no_word') + '</div>';
      rw_PredictionDictionaryReply(e)
    }
  } catch (a) {
    thLogE(a)
  }
}

function rw_showPredictionDictionaryDiv(a, b) {
  var c;
  g_abVisible[b] = a;
  var d = b === POPUP_DISPLAY ? 'rwDisplay' : b === POPUP_TRANSLATOR ? 'rwTrans' : b === POPUP_FF ? 'rwFF' : b === POPUP_DICTIONARY ? 'rwDict' : b === POPUP_COLLECT ? 'rwCollect' : b === POPUP_STICKYNOTE ? 'rwSticky' : b === POPUP_PRON_CREATE ? 'rwPronCreate' : b === POPUP_PRON_EDIT ? 'rwPronEdit' : b === POPUP_CALCULATOR ? 'rwCal' : b === POPUP_GENERATE_CACHE ? 'rwGenerateCache' : b === POPUP_CHECK_CACHE ? 'rwCache' : b === POPUP_PICTUREDICTIONARY ? 'rwPictureDictionary' : 'rwDisplay';
  var e = rw_getDomObject(d);
  if (null != e) {
    if (c = e.style, null == c) return;
    a ? (resetZIndex(), c.visibility = 'visible', c.display = 'block', c.zIndex = 99999) : (c.visibility = 'hidden', g_bFireFox && (c.display = 'none'), rw_setPopupText(b, ''))
  }
}

function $rwPrediction_dictionaryReply(a) {
  try {
    var b = {
      1: 'Noun',
      2: 'Verb',
      3: 'Adjective',
      4: 'Adverb',
      5: 'Pronoun',
      6: 'Preposition',
      7: 'Prefix',
      8: 'Article',
      9: 'Conjunction',
      10: 'Auxiliary verb',
      11: 'None',
      12: 'Interjection',
      13: 'Abbreviation',
      14: 'Determiner',
      15: 'Exclamation',
      16: 'Infinitive'
    },
      c = a.indexOf('result=');
    if (-1 < c) {
      var d = a.substring(7);
      d = rw_replaceSearchPlaceholder(d), rw_setPopupText(POPUP_DICTIONARY, d), rw_showPredictionDictionaryDiv(!0, POPUP_DICTIONARY)
    } else if (0 < a.length) {
      var e = JSON.parse(a);
      if (void 0 !== e.service && 'DictionaryHTML_1' == e.service) return void $rw_dictionaryReplyHTML(e);
      if (1 > e.inflections.length) {
        var f = '<div id="rwDictPanel" class="rwDictPanel">';
        return f += '<div class="rwDictWordHeader">!!!' + e.word + '</div>', f += '<div class="th-nomatch" data-trans-dictionaryDlg="dialog_definition_notfound">' + textHelp.webreader.LocaleSingleton.getInst().getLocaleString('dialog_definition_notfound'), +'</div></div>', rw_setPopupText(POPUP_DICTIONARY, f), void rw_showPredictionDictionaryDiv(!0, POPUP_DICTIONARY)
      }
      var f = '<div class="arrow-left"></div><div class="rwDictPanel">';
      f += '<div class="rwDictWordHeader">' + e.word + '</div>', f += '<table class="rwDictDefin"><tbody>';
      for (var g, h = 0, i = 0, j = e.inflections, k = 0; k < j.length; k++) {
        g = j[k].definitions;
        for (var l = 0; l < g.length; l++) {
          i++ , f += '<tr><td>';
          var m = '';
          0 < g[l].type.length && '11' !== g[l].type && (m = '<b>' + b[g[l].type] + ': </b>'), f += '<span id="def' + i + '" >' + m + '<span>' + g[l].definition + '</span></span>', f += '</td></tr>', h++ , h >= 5 && (l = g.length, k = j.length)
        }
      }
      f += '</tbody></table></div>';
      var n = document.getElementById('rwGooglePredictionDictionaryDetails');
      n.innerHTML = f, n.style.display = 'block'
    }
  } catch (a) {
    thLogE(a)
  }
}
rwPredictionGetDictionaryPage = function (a) {
  var b = textHelp.webreader.ConfigurationSingleton.getInst().getConfiguration(),
    c = textHelp.webreader.UserSettingsSingleton.getInst().getUserSettings(),
    d = b.serversettings.dictionaryserver,
    e = b.serversettings.user,
    f = c.language.services;
  ('fr' == f || 'pt' == f || 'nl' == f) && (d += 'HTML'), d += '?json=';
  var g = '{"u":"' + e + '", "e":"n4T7Y2AjS4", "l":"' + f.replace('-', '_') + '", "w":"' + encodeURIComponent(a) + '"}',
    h = new SpeechStream.AjaxRequest;
  h.doPost(d += g, '', this, 'PredCompleteDict', !1)
};

function PredCompleteDict(a) {
  null == a || 0 == a.length ? $rwPrediction_dictionaryReply('Error loading content.') : $rwPrediction_dictionaryReply(a)
}

function rwGoogleUIHandling() {
  this.endsWith = function (a, b) {
    return -1 !== a.indexOf(b, a.length - b.length)
  }, this.ignoreControlType = function (a) {
    switch (a.toLowerCase()) {
      case 'password':
        return !0;
      case 'email':
        return !0;
      case 'tel':
        return !0;
      case 'range':
        return !0;
      case 'url':
        return !0;
      case 'number':
        return !0;
      case 'date':
        return !0;
      case 'month':
        return !0;
      case 'week':
        return !0;
      case 'time':
        return !0;
      case 'datetime':
        return !0;
      case 'color':
        return !0;
      default:
        return !1;
    }
  }, this.LastCharSpace = function (a) {
    var b = a.trim();
    return b.length != a.length
  }, this.CallSpeech = function () {
    var a = 'en_US',
      b = textHelp.webreader.ConfigurationSingleton.getInst().getConfiguration(),
      c = textHelp.webreader.UserSettingsSingleton.getInst().getUserSettings(),
      d = c.language.services;
    a = d, window.postMessage({
      method: 'thPrediction',
      type: '1757FROM_PAGERW4G',
      payload: {
        addspace: '',
        context: [queryData, '10', a],
        seq: '8',
        parentId: 'TESTLOCATION',
        positionId: 'POSITION'
      }
    }, '*'), window.addEventListener('message', this.onMessage)
  }, this.CallPrediction = function (a, b, c) {
    var d = 'en_US',
      e = textHelp.webreader.ConfigurationSingleton.getInst().getConfiguration(),
      f = textHelp.webreader.UserSettingsSingleton.getInst().getUserSettings(),
      g = f.language.services,
      h = f.prediction.results;
    d = g, sel = void 0, currentPosition = this.getCaretCharacterOffsetWithin(c), parseTexter = new rwGoogleTextParse, parseTexter.CurrentPosition = currentPosition, parseTexter.rootText = a, parseTexter.parseText(currentPosition, b, c);
    var i = '';
    if (!(!1 == prediction_PredictAhead)) i = encodeURIComponent(parseTexter.Lefttext), window.postMessage({
      method: 'thPrediction',
      type: '1757FROM_PAGERW4G',
      payload: {
        addspace: '',
        context: [i, h, d],
        seq: '8',
        parentId: 'TESTLOCATION',
        positionId: 'POSITION'
      }
    }, '*'), window.addEventListener('message', this.onMessage);
    else if (' ' != parseTexter.CurrentWord) i = encodeURIComponent(parseTexter.Lefttext), window.postMessage({
      method: 'thPrediction',
      type: '1757FROM_PAGERW4G',
      payload: {
        addspace: '',
        context: [i, h, d],
        seq: '8',
        parentId: 'TESTLOCATION',
        positionId: 'POSITION'
      }
    }, '*'), window.addEventListener('message', this.onMessage);
    else {
      var j = document.getElementById('rwGooglePredictionResponseDetails');
      j.style.display = 'none', j.innerHTML = ''
    }
  }, this.onMessage = function () {
    if (void 0 != event.data && void 0 != event.data && event.source == window) {
      var a = '<div class=\'arrow-up\'></div><div id=\'predictions\' class=\'rwlist-group\'>';
      currentWordCollection = [];
      var b = document.getElementById('rwGooglePredictionResponseDetails');
      try {
        for (var c = event.data.payload.words.length, d = 0; d < c; d++) currentWordCollection.push(event.data.payload.words[d]), a = 9 == d ? a + '<div class=\'rwlist-group-items-outer rwclearfix\'><div class=\'rwlist-group-item\'>0. ' + event.data.payload.words[d] + '</div><div class=\'rwlist-group-item-dict rwclearfix\'>&nbsp;</div></div>' : a + '<div class=\'rwlist-group-items-outer rwclearfix\'><div class=\'rwlist-group-item\'>' + (d + 1) + '. ' + event.data.payload.words[d] + '</div><div class=\'rwlist-group-item-dict rwclearfix\' data=\'' + event.data.payload.words[d] + '\'>&nbsp;</div></div>';
        a = a + '</div><input type=\'hidden\' id=\'rwPredictionPosition\' value=\'' + currentPosition + '\'>', b.style.display = 'block', b.innerHTML = a
      } catch (a) { }
    }
  }, this.getCaretCharacterOffsetWithin = function (a) {
    var b = 0;
    if ('undefined' != typeof window.getSelection) {
      var c = window.getSelection().getRangeAt(0),
        d = c.cloneRange();
      d.selectNodeContents(a), d.setEnd(c.endContainer, c.endOffset), b = d.toString().length
    } else if ('undefined' != typeof document.selection && 'Control' != document.selection.type) {
      var e = document.selection.createRange(),
        f = document.body.createTextRange();
      f.moveToElementText(a), f.setEndPoint('EndToEnd', e), b = f.text.length
    }
    return b
  }, this.doGetCaretPositionInputField = function (a) {
    var b = 0;
    if (document.selection) {
      a.focus();
      var c = document.selection.createRange();
      c.moveStart('character', -a.value.length), b = c.text.length
    } else (a.selectionStart || '0' == a.selectionStart) && (b = a.selectionStart);
    return b
  }, this.setCaretPosition = function (a, b) {
    var c = a;
    if (null != c)
      if (c.createTextRange) {
        var d = c.createTextRange();
        d.move('character', b), d.select()
      } else c.selectionStart ? (c.focus(), c.setSelectionRange(b, b)) : c.focus()
  }
}
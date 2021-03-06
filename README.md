# ocean-browser-ext
Browser Extension for Ocean Search


### Ocean search is presently implemented as a web-component.

Instructions for install are here:  https://docs.google.com/document/d/e/2PACX-1vTULwC3ELmDFL0jcWd7_lLhJrv-Ub_MBt6KGM1Xnxfui3T4-lCPm91WHeW4voMGbnayKKWx_Quv7JT5/pub

### A browser-extension wrapper providing the following functionality:

* Ocean Search: CTRL-9, CMD-S (puts selected text into search)
* Default search language: (en / fa / ar)
* Download the Ocean App -> sacred-traditions/Ocean
* Share Ocean (email / facebook / twitter)
* Receive Ocean notifications (news / events / online courses)
* How can I help? (edit books / send people to DB courses / contribute)
* Integration of search into omnibox
* Editing tools  (should work with GDocs and GMail)
  * [ ]  Shortcut keys for special characters
  * [  ] Autocorrect common words
  * [  ] Spell check accented names & offer suggestions

### working referrals ###
- [x] "https://www.google.com/"
- [x] "https://www.bahai.org/"
- [x] "https://www.bic.org/"
- [X] "https://www.yahoo.com/"
- [x] "http://reference.bahai.org/en/"
- [x] "https://en.wikipedia.org/wiki/*"
- [x] "http://bahai-library.com/" (works but vue console error)
- [x] "https://news.bahai.org/" (it works only within main page not child pages)

### issues ###
- [ ] "https://www.youtube.com/" ( Class constructor p cannot be invoked without 'new')
- [ ] "https://media.bahai.org" (there is no spare space to insert icon)
- [ ] "https://www.reddit.com/" (there is no space to insert icon)

- [ ] "https://www.facebook.com/" (facebook prevents their content)
- [ ] "https://www.baidu.com/" (baidu prevents their content)

### image icon ###
<div class="" style="cursor: pointer; margin: 13px;">
  <img src="https://sacred-traditions.org/ocean_assets/images/ocean-logo.svg" style="width: 20px; vertical-align: middle; margin: 0px 5px;">
</div>
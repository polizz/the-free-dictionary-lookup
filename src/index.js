const menuItemTemplate = 'Search TFD.com for'
const tfdUrl = 'http://thefreedictionary.com/'
const menuId = 'tfdLookupMenuitem'

console.log(browser)

const getActiveTab = () => {
  return browser.tabs.query({
    active: true,
    currentWindow: true,
  })
    .then(tabs => {
      console.log('tabs', tabs)

      return tabs[0]
    })
    .catch(err => console.log('error', err))
}

browser.tabs.onActivated.addListener(({ tabId }) => {
  browser.tabs.sendMessage(tabId, {
    sync: true,
  })
    .then(res => console.log(res))
    .catch(err => console.log(err))
})

browser.runtime.onMessage.addListener(({ selection }, _, resp) => {
  browser.menus.update(menuId, {
    title: `${menuItemTemplate} ${selection}`,
  })
    .then(err => {
      if (err) console.log('Error updating context menu')
    })

  resp(true)
})

const onClickHandler = ({ selectionText: word }) => {
  console.log(`open new tab for ${word}`)

  getActiveTab()
    .then(activeTab => {
      console.log('idx', activeTab.index)

      browser.tabs.create({
        active: true,
        url: `${tfdUrl}${word}`,
        index: activeTab.index + 1,
      })
        .then(tab => console.log('new tab', tab))
        .catch(err => console.log(`could not create tab: ${err}`))
    })
}

browser.menus.create({
  id: menuId,
  contexts: [ 'selection' ],
  onclick: onClickHandler,
})

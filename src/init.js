import browser from './browser'

const setup = () => {
  const menuItemTemplate = 'Search TFD.com for'
  const tfdUrl = 'http://thefreedictionary.com/'
  const menuId = 'tfdLookupMenuitem'
  
  const getActiveTab = () => {
    return browser.tabs.query({
      active: true,
      currentWindow: true,
    })
      .then(tabs => {
        return tabs[0]
      })
      .catch(err => console.log('error', err))
  }

  browser.tabs.onActivated.addListener(({ tabId }) => {
    browser.tabs.sendMessage(tabId, { sync: true })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  })
  
  browser.runtime.onMessage.addListener(({ selection }, _, resp) => {
    browser.contextMenus.update(menuId, {
      title: `${menuItemTemplate} "${selection}"`,
    })
      .then(err => {
        if (err) console.log('Error updating context menu')
      })
  
    resp(true)
  })

  const onClickHandler = ({ selectionText: word }) => {
    getActiveTab()
      .then(activeTab => {
        browser.tabs.create({
          active: true,
          url: `${tfdUrl}${word}`,
          index: activeTab.index + 1,
        })
          .then(tab => console.log('new tab', tab))
          .catch(err => console.log(`could not create tab: ${err}`))
      })
  }
  
  browser.contextMenus.create({
    title: menuItemTemplate,
    id: menuId,
    contexts: [ 'selection' ],
    onclick: onClickHandler,
  })
}

export default setup

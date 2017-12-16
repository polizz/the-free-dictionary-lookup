const crSendMsgHandler = resp => {
  return new Promise((res, rej) => {
    console.log('crSendMsgHandler', resp)

    return resp ? res(resp) :
      rej(chrome.runtime.lastError)
  })
}

const getBrowser = () => {
  if (chrome) {
    return {
      ...chrome,
      tabs: {
        ...chrome.tabs,
        query: queryInfo => new Promise(res => {
          chrome.tabs.query(queryInfo, arr => res(arr))
        }),
        sendMessage: (tabId, msg) =>
          chrome.tabs.sendMessage(tabId, msg, null, crSendMsgHandler),
        create: createProps => new Promise(res =>
          chrome.tabs.create(createProps, resp => res(resp))),
      },
      contextMenus: {
        ...chrome.contextMenus,
        update: (menuId, updateProps) =>
          Promise.resolve(chrome.contextMenus.update(menuId, updateProps)),
      },
    }
  }

  if (msBrowser) {
    return msBrowser
  }

  return browser
}

export default getBrowser()

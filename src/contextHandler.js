const updateMenu = () => {
  const verbiage = window.getSelection().toString()
  browser.runtime.sendMessage({ selection: verbiage })
}

browser.runtime.onMessage.addListener(({ sync }, _, resp) => {
  if (sync) {
    updateMenu()
    resp(true)
  }
  resp(false)
})

window.addEventListener('mouseup', updateMenu)
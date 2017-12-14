const menuItemTemplate = 'Search TFD.com for'
const tfdUrl = 'http://thefreedictionary.com/'
const menuId = 'tfdLookupMenuitem'

const getActiveTab = () => {
  browser.tabs.query({
    active: true,
    currentWindow: true,
  })
    .then(tabs => tabs[0])
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

const onClickHandler = ({ selectedtext: word }) => {
  console.log(`open new tab for ${word}`)

  const idx = getActiveTab().index

  browser.tabs.create({
    active: true,
    url: `${tfdUrl}${word}`,
    index: idx,
  })
    .catch(err => console.log(`could not create tab: ${err}`))
}

browser.menus.create({
  id: menuId,
  contexts: ['selection'],
  onclick: onClickHandler,
})


// if (!com) var com = {};
// if (!com.polizz) com.polizz = {};
// if (!com.polizz.tfdlookup) com.polizz.tfdlookup = {};
    
//  com.polizz.tfdlookup = {

//         onLoad : function() {
//             com.polizz.tfdlookup.init();
//         },
        
//         init : function ()  {
//             var contextMenu = document.getElementById("contentAreaContextMenu"); 
            
//             if (contextMenu)  
//                 contextMenu.addEventListener("popupshowing", function() { com.polizz.tfdlookup.showHideMenu(); }, false);  
//         } ,
          
//         showHideMenu : function ()  {
//           var show = document.getElementById("tfdLookupMenuitem"); 
//           var selectedtext = content.getSelection();
          
//           show.label = 'Search TFD.com for "' + selectedtext + '"';
//           show.hidden = (selectedtext == ""); 
//         } ,
        
//         SearchTFD : function() {
//            var tab = gBrowser.addTab("http://thefreedictionary.com/" + content.getSelection(), {relatedToCurrent: true});
//            gBrowser.selectedTab = tab
//         }
//     };

// window.addEventListener("load", function() { com.polizz.tfdlookup.onLoad(); }, false);
const menuItemTemplate = `Search TFD.com for`
let menuId = "tfdLookupMenuitem"

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

const onClickHandler = args => {
  console.log(`open new tab for ${args.selectedtext}`)
}

browser.menus.create({
  id: menuId,
  contexts: ["selection"],
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
if (!com) var com = {};
if (!com.polizz) com.polizz = {};
if (!com.polizz.tfdlookup) com.polizz.tfdlookup = {};
    
 com.polizz.tfdlookup = {

        onLoad : function() {
            com.polizz.tfdlookup.init();
        },
        
        init : function ()  {
            var contextMenu = document.getElementById("contentAreaContextMenu"); 
            
            if (contextMenu)  
                contextMenu.addEventListener("popupshowing", function() { com.polizz.tfdlookup.showHideMenu(); }, false);  
        } ,
          
        showHideMenu : function ()  {
          var show = document.getElementById("tfdLookupMenuitem"); 
          var selectedtext = content.getSelection();
          
          show.label = 'Search TFD.com for "' + selectedtext + '"';
          show.hidden = (selectedtext == ""); 
        } ,
        
        SearchTFD : function() {
           var tab = gBrowser.addTab("http://thefreedictionary.com/" + content.getSelection(), {relatedToCurrent: true});
           gBrowser.selectedTab = tab
        }
    };

window.addEventListener("load", function() { com.polizz.tfdlookup.onLoad(); }, false);


let drf325_STORED_DATA = {
    netID : "",
	sites: {

}

}

function saveState(data) {
    chrome.storage.local.set({'drf325_data' : data}, function() {
        console.log('saved state to: ' + JSON.stringify(data,null, 2));
    });
}
chrome.storage.local.get('drf325_data', function(data) {
    
    if (typeof data["drf325_data"] !== 'undefined') {
        //alert(JSON.stringify(data))
        // if already set up, then just retrieve it
        drf325_STORED_DATA = data["drf325_data"]
        if(typeof drf325_STORED_DATA["netID"] === 'undefined') {
            drf325_STORED_DATA["netID"] = "";
            saveState(drf325_STORED_DATA);
        } else if (drf325_STORED_DATA["netID"] != "") {
            $("#loginHolder").hide();
            $("#loggedInHolder").show();
            $("#net-id-header").text(drf325_STORED_DATA.netID)
        } 
        console.log('already saved so retrieving: ' + JSON.stringify(drf325_STORED_DATA,null, 2));
      } else {
        // if not set then set it - basically first time user used the extension
        chrome.storage.local.set({'drf325_data' : drf325_STORED_DATA}, function() {
            console.log('initiated data storage: ' + JSON.stringify(drf325_STORED_DATA,null, 2));
        });
      }
    

 });


var netIDSubmitButton = document.getElementById('netIDSubmitButton');

netIDSubmitButton.addEventListener('click', function(e) {
    e.preventDefault(); // don't submit
    let val =  document.getElementById("net-id").value
    drf325_STORED_DATA["netID"] = val;
    saveState(drf325_STORED_DATA)
    $("#loginHolder").hide();
    $("#loggedInHolder").show();
    $("#net-id-header").text(drf325_STORED_DATA.netID)
})

/* <button class="drf325-button" id="interactiveElementButton">Interactive</button><br/>
  <button class="drf325-button" id="nonInteractiveElementButton">Not Interactive</button><br/>
  <button class="drf325-button" id="skipButton">Skip</button><br/>
  <button class="drf325-button" id="backButton">Back</button><br/> */

  
  let drf325_STORED_DATA = {
	sites: {

	}
	}

	let drf325_SELECT_MODE = false;

chrome.storage.local.get('drf325_data', function(data) {
  if (typeof data["drf325_data"] !== 'undefined') {
	  // if already set up, then just retrieve it
	  drf325_STORED_DATA = data["drf325_data"]
	  drf325_refreshSelectedElements()
	  console.log('already saved so retrieving: ' + JSON.stringify(drf325_STORED_DATA,null, 2));
	} else {
	  // if not set then set it - basically first time user used the extension
	  chrome.storage.local.set({'drf325_data' : drf325_STORED_DATA}, function() {
		  console.log('initiated data storage: ' + JSON.stringify(drf325_STORED_DATA,null, 2));
	  });
	}
	initializeCurrentSiteStorageIfNotSet();

});




let drf325_storedDataObj = []
let drf325_selectedElements = {}
var div = document.createElement('div');
div.id = 'mydiv';
div.innerHTML = `<div id="mydivheader">Click and drag here to move</div>
<label class="drf325_switch" id ="drf325_switch">
<input id="drf325_checkbox" type="checkbox">
<span class="drf325_slider drf325_round"></span>
</label>
<p id="currentXpathHolder"><b>Hover xpath:</b> <span id="currentHoverXpath"></span></p><br/>
<p id="currentXpathHolder"><b>Click xpath:</b> <span id="currentXpath"></span></p>`;
document.body.appendChild(div);
let div2 = document.createElement('div');
div2.className = 'inspector-element';
document.body.appendChild(div2);

window.theRoom.configure({
  inspector: ".inspector-element",
  //blockRedirection: true,
  click: function (element) {
	  
	  if(drf325_SELECT_MODE) {
		let xPath = createXPathFromElement(element)
		if(xPath in drf325_STORED_DATA.sites[window.location.href]) {
			element.style.border = drf325_STORED_DATA.sites[window.location.href][xPath].previousBorder;
			delete drf325_STORED_DATA.sites[window.location.href][xPath]; 
			drf325_refreshSelectedElements();
		} else {
			drf325_storedDataObj.push(xPath);
			drf325_STORED_DATA.sites[window.location.href][xPath] = {
				element: element,
				previousBorder: element.style.border
			}
			drf325_refreshSelectedElements();
			
			document.getElementById("currentXpath").innerText = xPath
		}
	  } else {
		document.getElementById("drf325_switch").classList.remove("blink");
		setTimeout(function(){
			document.getElementById("drf325_switch").classList.add("blink");
		 },1);
		
	  }
  },
  excludes: ["#mydiv", "#mydivheader","#currentXpathHolder","#currentXpath","#currentHoverXpath","#drf325_checkbox",".drf325_slider",".drf325_switch"]
})

// start inspection
window.theRoom.start()

// dynamically bind event
window.theRoom.on('mouseover', function (element) {
  document.getElementById("currentHoverXpath").innerText = createXPathFromElement(element)
  
  //console.log('the element is hovered', element)
})




dragElement(document.getElementById("mydiv"));

addcss(`
.inspector-element {
  position: absolute;
  pointer-events: none;
  border: 4px solid rgb(137, 0, 225);
  transition: all 400ms;
  background-color: rgba(180, 187, 105, 0.2);
  z-index: 999999999999;
}

#mydiv {
  position: fixed;
  top:0;
  left:0;
  z-index: 99999000;
  background-color: rgb(241, 241, 241, 1);
  text-align: center;
  border: 1px solid #d3d3d3;
  width: 250px;
}

#mydivheader {
  padding: 10px;
  cursor: move;
  z-index: 1111111000000;
  background-color: rgb(137, 0, 225, 0.9);
  color: #fff;
}

#nextElementButton {
	margin: 10px;
}

.drf325-button {
  background-color: #007c70; /* Green */
  border: none;
  color: white;
  padding: 15px 15px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

#currentXpathHolder {
	color: black;
	word-wrap: break-word;
}

/* The switch - the box around the slider */
.drf325_switch {
position: relative;
display: inline-block;
width: 60px;
height: 34px;
}

/* Hide default HTML checkbox */
.drf325_switch input {
opacity: 0;
width: 0;
height: 0;
}

/* The slider */
.drf325_slider {
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: #ccc;
-webkit-transition: .4s;
transition: .4s;
}

.drf325_slider:before {
position: absolute;
content: "";
height: 26px;
width: 26px;
left: 4px;
bottom: 4px;
background-color: white;
-webkit-transition: .4s;
transition: .4s;
}

input:checked + .drf325_slider {
background-color: #2196F3;
}

input:focus + .drf325_slider {
box-shadow: 0 0 1px #2196F3;
}

input:checked + .drf325_slider:before {
-webkit-transform: translateX(26px);
-ms-transform: translateX(26px);
transform: translateX(26px);
}

/* Rounded sliders */
.drf325_slider.drf325_round {
border-radius: 34px;
}

.drf325_slider.drf325_round:before {
border-radius: 50%;
}

@-webkit-keyframes blinker {
	0% {
	  opacity: 1.0;
	}
	50% {
	  opacity: 0.0;
	}
	100% {
	  opacity: 1.0;
	}
  }
  @-moz-keyframes blinker {
	0% {
	  opacity: 1.0;
	}
	50% {
	  opacity: 0.0;
	}
	100% {
	  opacity: 1.0;
	}
  }
  @keyframes glow {
	from {
	  box-shadow: 0 0 10px -10px #aef4af;
	}
	to {
	  box-shadow: 0 0 10px 10px #aef4af;
	}
  }
  .blink {
	-webkit-animation: glow 1s 2;
	-moz-animation: glow 1s 2;
	animation: glow 1s 2;
  }

`);

const drf325_checkbox = document.querySelector('#drf325_checkbox');
drf325_checkbox.onclick = () => {
	drf325_SELECT_MODE = drf325_checkbox.checked;
};

var intervalId = window.setInterval(function(){
	/// call your function here
	drf325_refreshSelectedElements();
}, 5000);

function drf325_onToggle() {
  // check if checkbox is checked
  if (document.querySelector('#drf325_checkbox').checked) {
	// if checked
	alert('checked');
  } else {
	// if unchecked
	alert('unchecked');
  }
}

function initializeCurrentSiteStorageIfNotSet() {
	if(!(window.location.href in drf325_STORED_DATA.sites)){
		drf325_STORED_DATA.sites[window.location.href] = {
			
		}
		drf325_saveData(drf325_STORED_DATA)
		console.log('new site - tried to add - ' + JSON.stringify(drf325_STORED_DATA, null, 2));
	} else {
		console.log("url already saved")
	}
}

function drf325_refreshSelectedElements() {
	if(drf325_STORED_DATA.sites[window.location.href] == null) {
		return;
	}
  for(const xPath of Object.keys(drf325_STORED_DATA.sites[window.location.href])) {
	  if(drf325_lookupElementByXPath(xPath) == null) {
		  continue;
	  }
	  drf325_lookupElementByXPath(xPath).style.border = drf325_STORED_DATA.sites[window.location.href][xPath].previousBorder;
  }
  for(const xPath of Object.keys(drf325_STORED_DATA.sites[window.location.href])) {
	if(drf325_lookupElementByXPath(xPath) == null) {
		continue;
	}
	  drf325_lookupElementByXPath(xPath).style.border = "thick solid green";
  }
  drf325_saveData(drf325_STORED_DATA)

}

function drf325_saveData(STORED_DATA) {
  chrome.storage.local.set({'drf325_data' : STORED_DATA}, function() {
	  console.log('saved ' + JSON.stringify(drf325_STORED_DATA,null, 2));
  });
}

function drf325_lookupElementByXPath(path) { 
  var evaluator = new XPathEvaluator(); 
  var result = evaluator.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
  return  result.singleNodeValue; 
} 
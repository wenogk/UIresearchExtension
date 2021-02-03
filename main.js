/* <button class="drf325-button" id="interactiveElementButton">Interactive</button><br/>
  <button class="drf325-button" id="nonInteractiveElementButton">Not Interactive</button><br/>
  <button class="drf325-button" id="skipButton">Skip</button><br/>
  <button class="drf325-button" id="backButton">Back</button><br/> */

  
  let drf325_STORED_DATA = {
	  sites: {

	  }
  }

  chrome.storage.sync.get('drf325_data', function(data) {
	if (typeof data["drf325_data"] !== 'undefined') {
		// if already set it then nothing to do 
		drf325_STORED_DATA = data["drf325_data"]
		drf325_refreshSelectedElements()
		console.log('not saved ' + JSON.stringify(drf325_STORED_DATA));
	  } else {
		// if not set then set it 
		chrome.storage.sync.set({'drf325_data' : drf325_STORED_DATA}, function() {
			console.log('saved ' + JSON.stringify(drf325_STORED_DATA));
		});
	  }
  });
  

  if(!(window.location.href in drf325_STORED_DATA.sites)){
	drf325_STORED_DATA.sites[window.location.href] = {}
	drf325_saveData(drf325_STORED_DATA)
  }
let drf325_storedDataObj = []
let drf325_selectedElements = {}
document.body.innerHTML += `
<div id="mydiv">
  <div id="mydivheader">Click and drag here to move</div>
  <p id="currentXpathHolder"><b>Hover xpath:</b> <span id="currentHoverXpath"></span></p><br/>
  <p id="currentXpathHolder"><b>Click xpath:</b> <span id="currentXpath"></span></p>
</div>
<div class="inspector-element"></div>
`;

window.theRoom.configure({
	inspector: ".inspector-element",
	blockRedirection: true,
    click: function (element) {
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
		
	},
	excludes: ["#mydiv"]
  })

  // start inspection
  window.theRoom.start()

  // dynamically bind event
  window.theRoom.on('mouseover', function (element) {
	document.getElementById("currentHoverXpath").innerText = createXPathFromElement(element)
	
    console.log('the element is hovered', element)
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
	background-color: rgb(241, 241, 241, 0.5);
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
  
  
`);

function drf325_refreshSelectedElements() {
	
	for(const xPath of Object.keys(drf325_STORED_DATA.sites[window.location.href])) {
		drf325_lookupElementByXPath(xPath).style.border = drf325_STORED_DATA.sites[window.location.href][xPath].previousBorder;
	}
	for(const xPath of Object.keys(drf325_STORED_DATA.sites[window.location.href])) {
		drf325_lookupElementByXPath(xPath).style.border = "thick solid green";
	}
	drf325_saveData(drf325_STORED_DATA)

}

function drf325_saveData(STORED_DATA) {
	chrome.storage.sync.set({'drf325_data' : STORED_DATA}, function() {
		console.log('saved ' + JSON.stringify(drf325_STORED_DATA));
	});
}

function drf325_lookupElementByXPath(path) { 
    var evaluator = new XPathEvaluator(); 
    var result = evaluator.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
    return  result.singleNodeValue; 
} 
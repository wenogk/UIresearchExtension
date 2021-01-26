
var Highlighter = new window.Highlighter({
	'scroll':true, //Automatically scroll to the underlined element
	'scrollDuration': 500 //milliseconds
});

function nextElement() {
	elemRect = Highlighter.element.getBoundingClientRect();
	Highlighter.erase();
	Highlighter.next();
	while(!((elemRect.width > 0) && (elemRect.height > 0))) {
		Highlighter.next();
		elemRect = Highlighter.element.getBoundingClientRect();
	}
	Highlighter.underline();
	document.getElementById("currentXpath").innerHTML = createXPathFromElement(Highlighter.element)
	window.console.log('Highlighter underlined this element:', Highlighter.element);
}

window.addEventListener('Highlighter:underlined', function (evt) {
	console.log('This element has been underlined', evt.eventData);
});

document.body.innerHTML += `
<div id="mydiv">
  <div id="mydivheader">Click and drag here to move</div>
  <button id="nextElementButton">Next</button>
  <p>xpath: <span id="currentXpath"></span></p>
</div>
`;

dragElement(document.getElementById("mydiv"));

addcss(`
#mydiv {
	position: fixed;
	top:0;
	left:0;
	z-index: 99999000;
	background-color: #f1f1f1;
	text-align: center;
	border: 1px solid #d3d3d3;
	width: 250px;
  }
  
  #mydivheader {
	padding: 10px;
	cursor: move;
	z-index: 1111111000000;
	background-color: #2196F3;
	color: #fff;
  }

  #nextElementButton {
	  margin: 10px;
  }
`);

(function() {
	
	// just place a div at top right
	
	
	document.getElementById("nextElementButton").addEventListener("click", nextElement);
	

})();
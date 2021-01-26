
var Highlighter = new window.Highlighter({
	'scroll':true, //Automatically scroll to the underlined element
	'scrollDuration': 500 //milliseconds
});

let drf325_previous_element = Highlighter.element

function nextElement() {
	let elemRect = Highlighter.element.getBoundingClientRect();
	Highlighter.erase();
	Highlighter.next();
	while(!((elemRect.width > 0) && (elemRect.height > 0))) {
		Highlighter.next();
		elemRect = Highlighter.element.getBoundingClientRect();
	}
	Highlighter.underline();
	drf325_previous_element = Highlighter.element
	document.getElementById("currentXpath").innerHTML = createXPathFromElement(Highlighter.element)
	window.console.log('Highlighter underlined this element:', Highlighter.element);
}

function previousElement() {
	Highlighter.erase();
	Highlighter.point(drf325_previous_element)
	Highlighter.underline();
	document.getElementById("currentXpath").innerHTML = createXPathFromElement(Highlighter.element)
}

window.addEventListener('Highlighter:underlined', function (evt) {
	console.log('This element has been underlined', evt.eventData);
});

document.body.innerHTML += `
<div id="mydiv">
  <div id="mydivheader">Click and drag here to move</div>
  <button class="drf325-button" id="interactiveElementButton">Interactive</button>
  <button class="drf325-button" id="nonInteractiveElementButton">Not Interactive</button>
  <button class="drf325-button" id="skipButton">Skip</button>
  <button class="drf325-button" id="backButton">Back</button>
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
	background-color: #8900e1;
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
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
  }

  #currentXpath {
	  color: black;
  }
`);

(function() {
	
	// just place a div at top right
	
	
	document.getElementById("interactiveElementButton").addEventListener("click", nextElement);
	document.getElementById("nonInteractiveElementButton").addEventListener("click", nextElement);
	document.getElementById("skipButton").addEventListener("click", nextElement);
	document.getElementById("backButton").addEventListener("click", previousElement);
	

})();
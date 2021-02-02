
var Highlighter = new window.Highlighter({
	'scroll':true, //Automatically scroll to the underlined element
	'scrollDuration': 500 //milliseconds
});

let drf325_previous_element = Highlighter.element

function nextElement() {

	let elemRect = Highlighter.element.getBoundingClientRect();
	Highlighter.erase();
	Highlighter.next();
	
	while(!((elemRect.width > 0) && (elemRect.height > 0)) ) {
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
	Highlighter.previous()
	let elemRect = Highlighter.element.getBoundingClientRect();
	let counterLoop = 0
	while(!((elemRect.width > 0) && (elemRect.height > 0)) && (counterLoop < 100)) {
		Highlighter.previous();
		elemRect = Highlighter.element.getBoundingClientRect();
		counterLoop += 1
	}
	Highlighter.underline();
	document.getElementById("currentXpath").innerHTML = createXPathFromElement(Highlighter.element)

}

window.addEventListener('Highlighter:underlined', function (evt) {

	console.log('This element has been underlined', evt.eventData);

});

document.body.innerHTML += `
<div id="mydiv">
  <div id="mydivheader">Click and drag here to move</div>
  <button class="drf325-button" id="interactiveElementButton">Interactive</button><br/>
  <button class="drf325-button" id="nonInteractiveElementButton">Not Interactive</button><br/>
  <button class="drf325-button" id="skipButton">Skip</button><br/>
  <button class="drf325-button" id="backButton">Back</button><br/>
  <small id="currentXpathHolder">xpath: <span id="currentXpath"></span></small>
</div>
`;

dragElement(document.getElementById("mydiv"));

addcss(`
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
  #xpathText {
	
  }
`);

(function() {
	
	// just place a div at top right
	
	
	document.getElementById("interactiveElementButton").addEventListener("click", nextElement);
	document.getElementById("nonInteractiveElementButton").addEventListener("click", nextElement);
	document.getElementById("skipButton").addEventListener("click", nextElement);
	document.getElementById("backButton").addEventListener("click", previousElement);
	

})();
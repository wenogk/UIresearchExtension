/* <button class="drf325-button" id="interactiveElementButton">Interactive</button><br/>
  <button class="drf325-button" id="nonInteractiveElementButton">Not Interactive</button><br/>
  <button class="drf325-button" id="skipButton">Skip</button><br/>
  <button class="drf325-button" id="backButton">Back</button><br/> */
document.body.innerHTML += `
<div id="mydiv">
  <div id="mydivheader">Click and drag here to move</div>
  <p id="currentXpathHolder">hover xpath: <span id="currentHoverXpath"></span></p><br/>
  <p id="currentXpathHolder">click xpath: <span id="currentXpath"></span></p>
</div>
<div class="inspector-element"></div>
`;

window.theRoom.configure({
	inspector: ".inspector-element",
	blockRedirection: true,
    click: function (element) {
      document.getElementById("currentXpath").innerText = createXPathFromElement(element)
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

(function() {
	
	// just place a div at top right
	

})();
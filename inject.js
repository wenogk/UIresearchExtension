
var Highlighter = new window.Highlighter({
	'viewable':true //this way Highlighter.js will exclude/avoid selecting or highlighting hidden/invisible elements
  });

function nextElement() {
	Highlighter.erase();
	Highlighter.next();
	Highlighter.underline();
	window.console.log('Highlighter underlined this element:', Highlighter.element);
}

window.addEventListener('Highlighter:underlined', function (evt) {

	console.log('This element has been underlined', evt.eventData);
});




(function() {
	
	// just place a div at top right
	var div = document.createElement('button');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.style.zIndex = "100000000000";
	div.id = "nextElementButton";
	div.textContent = 'Hello world!';
	document.body.appendChild(div);
	
	document.getElementById("nextElementButton").addEventListener("click", nextElement);
	

})();
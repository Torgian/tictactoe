/*screen transitions

	Screen opacity from 100 to 0. On 0, display = none.
	From 0 to 100, first, display = show, then transition from 0 to 100?

	changing Player texts (one to two) transitions? How? Timed somehow.

	*/
function setFadeIn(element){
	element.style.left = 0;
	element.style.opacity = 1;
	
}

function setFadeOut(element){
	element.style.opacity = 0;
	element.style.left = 100 + "em";

}

function displayOn(element){
	element.style.opacity = 1;
	
}

function displayOff(element){
	element.style.opacity = 0;
		
}

function pulseBox(element){
	console.log("animation");

}



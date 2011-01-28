function triggerNumpadDecimalSeperator(el) {
	var eventKeydown = $.Event("keydown");
	eventKeydown.keyCode = jQuery.browser.opera ? 78 : 110;
	var eventKeypress = $.Event("keypress");
	eventKeypress.charCode = ".".charCodeAt(0);
	el.trigger(eventKeydown).trigger(eventKeypress);
} 

function addInputToDOM(id){
	/*:DOC += <input type="input" /> */
	$('input:not([id])').attr('id', id);
	
}

function assertCommaPresent(el){
	assertEquals("numpad separator should be comma", ",", el.val());
}

function assertSpacePresent(el){
	assertEquals("numpad separator should be space", " ", el.val());
}
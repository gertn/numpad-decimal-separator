function triggerNumpadDecimalSeperator(el) {
	var eventKeydown = $.Event("keydown");
	eventKeydown.keyCode = jQuery.browser.opera ? 78 : 110;
	var eventKeypress = $.Event("keypress");
	eventKeypress.charCode = ".".charCodeAt(0);
	el.trigger(eventKeydown).trigger(eventKeypress);
}
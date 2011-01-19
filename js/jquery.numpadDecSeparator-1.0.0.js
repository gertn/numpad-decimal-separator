/*
*	Numpad decimal separator plugin for jQuery.
*
*	@author Gert Nuyens
*	@version 1.0.0
*
* 	Dependencies:
*	- jQuery (http://jquery.com)
*
* 	jQuery extension functions:
*	- numpadDecSeparator
*		this function has two options: 
*			1) separator: the separator to use when a user
*				presses the numpad decimal separator key.
*				Only use this when the option useRegionalSettings is false.
*				Defaults to ','.
*			2) useRegionalSettings: when a user presses the numpad decimal 
*				separator key it will use the regional options of the operating system.
*				This only works in firefox and ie!!!
*				Defaults to false.
*	- unNumpadDecSeparator
*		this function will unbind the numpadDecSeparator
*
*	Examples:
*	$(".amount").numpadDecSeparator();
*	$(".amount").numpadDecSeparator({separator: ' '});
*	$(".amount").numpadDecSeparator({useRegionalSettings: true});
*	$(".amount").unNumpadDecSeparator();
*/
(function($){
	$.fn.extend({
		unNumpadDecSeparator: function() { return this.trigger("undo"); },
		numpadDecSeparator: function(options) {
			options = $.extend({
				separator: ',',
				useRegionalSettings: false
			}, options||{});
			return this.each(function() {
				var keydownCode = '';
				var input = $(this);
				if (!input.attr("readonly")){
					input
					.one("undo", function() {
							input
								.unbind(".numpadDecSeparator");
					})
					.bind('keydown.numpadDecSeparator', function(event) {
						keydownCode = event.keyCode;
					})
					.bind('keypress.numpadDecSeparator', function(event) {
						if(_numericPadPeriodPressed(keydownCode) 
							&& !event.shiftKey 
							&& !event.ctrlKey 
							&& !event.altKey) {
							_replaceSelectedVal(this, _getSeparator(options));
							event.preventDefault();     
						}     
					});
				}

			});
		}
	});
	function _decimalSeparator() {
		var n = 1.1;
		n = n.toLocaleString().substring(1, 2);
		return n;
	};
	function _numericPadPeriodPressed(keydownCode){
		if(jQuery.browser.opera) {
			return 78 == keydownCode;
		}
		return 110 == keydownCode;
	};
	function _getSeparator(settings){
		return settings.useRegionalSettings ? _decimalSeparator() : settings.separator;
	};
	function _replaceSelectedVal(input, text){
		if('selectionStart' in input) {
			var start = input.selectionStart+1;
			input.value = input.value.substr(0, input.selectionStart) + text + input.value.substr(input.selectionEnd, input.value.length);
			input.selectionStart = start;
			input.selectionEnd = start;
			input.focus();
		} else if(document.selection) {
			//document.selection.createRange().text = text;
			var sel = document.selection.createRange();
			sel.text = text;
			// Move selection start and end to 0 position
			sel.moveStart ('character', -input.value.length);
			
			// Move selection start and end to desired position
			sel.moveStart ('character', sel.text.length);
			sel.moveEnd ('character', 0);
			sel.select();
		} else {
			input.value += text;
		}
	}
})(jQuery);
/**
 * Numpad decimal separator plugin for jQuery.
 * 
 * @author Gert Nuyens
 * @version 1.0.2 Dual licensed under the MIT (MIT-LICENSE.txt) or GPL Version 2
 *          licenses (GPL-LICENSE.txt).
 * 
 * Dependencies: - jQuery (http://jquery.com)
 * 
 * jQuery extension functions: 
 * - numpadDecSeparator this function has two options: 
 * 	1) separator: the separator to use when a user presses the numpad decimal separator key. 
 * 		Only use this when the option useRegionalSettings is false. 
 * 		Defaults to ','. 
 * 	2) useRegionalSettings: when a user presses the numpad decimal separator key it will use 
 * 		the regional options of the operating system. 
 * 		This only works in firefox and ie!!! 
 * 		Defaults to false.  
 * - numpadDecSeparator('unbind') this function will unbind the numpadDecSeparator
 * - numpadDecSeparator('version') static function which returns the current version
 * 
 * Examples: $(".amount").numpadDecSeparator();
 * $(".amount").numpadDecSeparator({separator: ' '});
 * $(".amount").numpadDecSeparator({useRegionalSettings: true});
 * $(".amount").numpadDecSeparator('unbind');
 * $.fn.numpadDecSeparator('version');
 **/
(function($) {
	var defaults = {
		separator : ',',
		useRegionalSettings : false
	};
	var methods = {
		init : function(options) {
			return this.each(function() {
				var keydownCode = '', $this = $(this), data = $this
						.data('numpadDecSeparator');
				if (!$this.attr("readonly") && !data) {
					$(this).data('numpadDecSeparator', {
						target : $this
					});
					$this.bind('keydown.numpadDecSeparator', function(event) {
						keydownCode = event.keyCode;
					}).bind(
							'keypress.numpadDecSeparator',
							function(event) {
								if (_numericPadPeriodPressed(keydownCode)
										&& !event.shiftKey && !event.ctrlKey
										&& !event.altKey) {
									_replaceSelectedVal(this,
											_getSeparator(options));
									event.preventDefault();
								}
							});
				}
			});
		},
		unbind : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data('numpadDecSeparator');
				$this.unbind('.numpadDecSeparator');
				$this.removeData('numpadDecSeparator');
			});
		},
		version : function() {
			return "1.0.2";
		}
	};
	$.fn.numpadDecSeparator = function(methodOrOptions) {
		var settings;
		// Method calling logic
		if (methods[methodOrOptions]) {
			return methods[methodOrOptions].apply(this, Array.prototype.slice
					.call(arguments, 1));
		} else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
			if (methodOrOptions) {
				settings = $.extend({}, defaults, methodOrOptions);
			}
			return methods.init.call(this, settings ? settings : defaults);
		} else {
			$.error('Method ' + methodOrOptions
					+ ' does not exist on jQuery.numpadDecSeparator');
		}
	};
	function _decimalSeparator() {
		var n = 1.1;
		n = n.toLocaleString().substring(1, 2);
		return n;
	}
	function _numericPadPeriodPressed(keydownCode) {
		return $.browser.opera ? 78 == keydownCode : 110 == keydownCode;
	}
	function _getSeparator(settings) {
		return settings.useRegionalSettings ? _decimalSeparator()
				: settings.separator;
	}
	function _replaceSelectedVal(input, text) {
		if ('selectionStart' in input) {
			var start = input.selectionStart + 1;
			input.value = input.value.substr(0, input.selectionStart)
					+ text
					+ input.value
							.substr(input.selectionEnd, input.value.length);
			input.selectionStart = start;
			input.selectionEnd = start;
			input.focus();
		} else if (document.selection) {
			input.focus();
			var sel = document.selection.createRange();
			sel.text = text;
			// Move selection start and end to 0 position
			sel.moveStart('character', -input.value.length);

			// Move selection start and end to desired position
			sel.moveStart('character', sel.text.length);
			sel.moveEnd('character', 0);
			sel.select();
		} else {
			input.value += text;
		}
	}
})(jQuery);
1.1.4

Intro
With this jQuery plugin you can configure what character to use for the numpad decimal separator. This plugin is tested with jsTestDriver and jasmine.

Dependencies
jQuery (http://jquery.com)
jQuery extension functions
numpadDecSeparator this function has three options:
separator: the separator to use when a user presses the numpad decimal separator key. Only used when the option useRegionalSettings is false. Defaults to ','. You can also use one of the predefined variables.
useRegionalSettings: when a user presses the numpad decimal separator key it will use the regional options of the operating system. This only works in firefox and ie 7+!!! Defaults to false.
predefinedVariables - the default predifined variables are:
SPACE => will output space
COMMA => will output comma
numpadDecSeparator('unbind') - this function will unbind the numpadDecSeparator
numpadDecSeparator('version') - static function which returns the current version of the plugin
numpadDecSeparator('mergeDefaults') - static function
with this function you can override some or all the default options, the provided options will be merged with the default options
Examples
$(".amount").numpadDecSeparator();
$(".amount").numpadDecSeparator({separator: ','}); 
//this is the same as 
//$(".amount").numpadDecSeparator({separator: 'COMMA'});

$(".amount").numpadDecSeparator({separator: ' '}); 
//this is the same as 
//$(".amount").numpadDecSeparator({separator: 'SPACE'});

$(".amount").numpadDecSeparator({useRegionalSettings: true});

$(".amount").numpadDecSeparator('unbind');

$.fn.numpadDecSeparator('version');

$.fn.numpadDecSeparator('mergeDefaults', {separator: "SPACE"});
$.fn.numpadDecSeparator('mergeDefaults', {useRegionalSettings: true});
$.fn.numpadDecSeparator('mergeDefaults', {predefinedVariables: {APOSTROPHE: "'"}});
var newDefaults = {
 separator : ' ',
 useRegionalSettings : true,
 predefinedVariables: {SPACE: " "}
};
$.fn.numpadDecSeparator('mergeDefaults', newDefaults);


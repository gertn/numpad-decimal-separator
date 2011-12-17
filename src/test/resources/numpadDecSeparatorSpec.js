jasmine.getFixtures().fixturesPath = '/test/test/resources/spec/fixtures';
var version = "1.1.3";
describe('numpadDecSeparator', function () {
	it('version should be correct', function(){
		expect($.fn.numpadDecSeparator('version')).toEqual(version);
	});
	describe('with default option', function (){
		beforeEach(function () {
			loadFixtures('test_fixture.html');
			$("#testInput").numpadDecSeparator();
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
		});
		
		it('separator should be comma', function() {
			expect($("#testInput").val()).toEqual(',');
		});
	});
	describe('with multiple elements', function (){
		beforeEach(function () {
			loadFixtures('test_fixture.html');
			$("#testInput").numpadDecSeparator();
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
			
			$("#testInput2").numpadDecSeparator({separator: ' '});
			$("#testInput2").focus();
			triggerNumpadDecimalSeperator($("#testInput2"));
		});
		
		it('each should have his own configured separator', function() {
			expect($("#testInput").val()).toEqual(',');
			expect($("#testInput2").val()).toEqual(' ');
		});
	});
	describe('initialize twice', function (){
		beforeEach(function () {
			loadFixtures('test_fixture.html');
			$("#testInput").numpadDecSeparator().numpadDecSeparator();
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
		});
		
		it('should only return one comma', function() {
			expect($("#testInput").val()).toEqual(',');
		});
	});
	describe('replace selection', function (){
		beforeEach(function () {
			loadFixtures('test_fixture.html');
			$("#testInput").numpadDecSeparator();
			$("#testInput").val("12345").setSelection(1,4);
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
		});
		
		it('selected text should be replaced with comma', function() {
			expect($("#testInput").val()).toEqual('1,5');
		});
	});
	describe('readonly element', function (){
		beforeEach(function () {
			loadFixtures('test_fixture.html');
			$("#testInput").attr("readonly", true);
			$("#testInput").numpadDecSeparator({separator: ' '});
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
		});
		
		it('a readonly element should not bind numpadDecSeparator', function() {
			var data = $("#testInput").data('numpadDecSeparator');
			expect(!data).toBeTruthy();
			expect($("#testInput").val()).toEqual('');
		});
	});
	describe('should be able to configure separator', function (){
		beforeEach(function () {
			loadFixtures('test_fixture.html');
		});
		
		it('with a space', function() {
			$("#testInput").numpadDecSeparator({separator: ' '});
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
			
			expect($("#testInput").val()).toEqual(' ');
		});
		
		it('with predifined SPACE variable', function() {
			$("#testInput").numpadDecSeparator({separator: 'SPACE'});
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
			
			expect($("#testInput").val()).toEqual(' ');
		});
		
		it('with predifined COMMA variable', function() {
			$("#testInput").numpadDecSeparator({separator: 'COMMA'});
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
			
			expect($("#testInput").val()).toEqual(',');
		});
		
		it('with an apostrophe', function() {
			$("#testInput").numpadDecSeparator({separator: '\''});
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
			
			expect($("#testInput").val()).toEqual("'");
		});
	});
	describe('unbind', function (){
		beforeEach(function () {
			loadFixtures('test_fixture.html');
			$("#testInput").numpadDecSeparator({separator: ' '});
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
		});
		
		it('should remove data (before unbind data should be present, after unbind data should not be present)', function() {
			expect($("#testInput").val()).toEqual(' ');
			var data = $("#testInput").data('numpadDecSeparator');
			//before unbind data should be present
			expect(!!data).toBeTruthy();
			
			$("#testInput").numpadDecSeparator('unbind');
			
			data = $("#testInput").data('numpadDecSeparator');
			//after unbind data should not be present
			expect(!data).toBeTruthy();
		});
		it('after unbind numpad separator is not space', function() {
			expect($("#testInput").val()).toEqual(' ');
			$("#testInput").numpadDecSeparator('unbind');
			$("#testInput").val("");
			triggerNumpadDecimalSeperator($("#testInput"));
			
			var valueAfterUnbind = $("#testInput").val();
			expect(valueAfterUnbind).not.toEqual(' ');
		});
	});
	describe('mergeDefaults', function (){
		it('should be able to merge separator', function() {
			var pdv = $.fn.numpadDecSeparator.defaults['predefinedVariables'];
			
			$.fn.numpadDecSeparator('mergeDefaults', {separator: "SPACE"});
			
			expect($.fn.numpadDecSeparator.defaults['separator']).toEqual("SPACE");
			expect($.fn.numpadDecSeparator.defaults['useRegionalSettings']).toBeFalsy();
			//merged default predefinedVariables should be the same as before merge
			expect($.fn.numpadDecSeparator.defaults['predefinedVariables']).toEqual(pdv);
		});
		it('should be able to merge useRegionalSettings', function() {
			expect($.fn.numpadDecSeparator.defaults['useRegionalSettings']).toBeFalsy();
			$.fn.numpadDecSeparator('mergeDefaults', {useRegionalSettings: true});
			expect($.fn.numpadDecSeparator.defaults['useRegionalSettings']).toBeTruthy();
		});
		it('should be able to merge predefinedVariables', function() {
			var pdvApos = {APOSTROPHE: "'"};
			expect($.fn.numpadDecSeparator.defaults['predefinedVariables']).not.toEqual(pdvApos);
			$.fn.numpadDecSeparator('mergeDefaults', {predefinedVariables: pdvApos});
			expect($.fn.numpadDecSeparator.defaults['predefinedVariables']).toEqual(pdvApos);
		});
		it('should be able to merge all', function() {
			var newDefaults = {
					separator : ' ',
					useRegionalSettings : true,
					predefinedVariables: {SPACE: " "}
			};
			$.fn.numpadDecSeparator('mergeDefaults', newDefaults);
			expect($.fn.numpadDecSeparator.defaults).toEqual(newDefaults);
		});
	});
	//this only works in msie and mozilla and regional settings of OS set to nl or equivalent (where decimal seperator is comma)
	if(jQuery.browser.msie || jQuery.browser.mozilla) {
		describe('regional settings', function (){
			it('should be able use regional settings', function() {
				loadFixtures('test_fixture.html');
				$("#testInput").numpadDecSeparator({useRegionalSettings: true});
				$("#testInput").focus();
				triggerNumpadDecimalSeperator($("#testInput"));
				
				//numpad separator should be comma, if test fails => check regional settings of OS => decimal seperator should be comma
				expect($("#testInput").val()).toEqual(',');
			});
			
		});
	}
});




if(typeof jstestdriver  !== "undefined"){
	jasmine.getFixtures().fixturesPath = '/test/test/resources/spec/fixtures';
} else {
	jasmine.getFixtures().fixturesPath = 'spec/fixtures';
}
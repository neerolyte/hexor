/**
 * Digrams
 *
 * Digrams are two letter frequencies
 */
describe('Digrams', function() {
	var Fixture = require("../fixture");
	var Digrams = require(Fixture.LIB_DIR+'/digrams');
	var expect = Fixture.expect;
	var _ = require('lodash')

	it("gives probability for pairs", function() {
		expect(
			_.round(Digrams.getRelFreq("th"), 3)
		).to.equal(0.011);
		expect(
			_.round(Digrams.getRelFreq("ur"), 3)
		).to.equal(0.003);
	})

	/*it("scoreString", function() {
		expect(Digrams.scoreString("The")).to.equal(1);
	})*/
})
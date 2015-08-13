/**
 * MTP
 *
 * Many Time Pad
 *
 * Any many time pad is vulnerable to certain attacks, here I'm just fiddling
 * with some.
 */
describe('MTP', function() {
	var Fixture = require("../fixture");
	var MTP = require(Fixture.LIB_DIR+'/mtp');
	var Hexor = require(Fixture.LIB_DIR+'/hexor')
	var expect = Fixture.expect;
	var _ = require('lodash');

	describe("crib", function() {
		it("can locate possible crib positions given m1^m2", function() {
			var mtp = new MTP();
			var mxor = Hexor.sxor("foo", "bar");
			var pos;

			pos = mtp.findPossibleCribs("foo", mxor);
			expect(pos).to.contain(0)
			pos = mtp.findPossibleCribs("bar", mxor);
			expect(pos).to.contain(0)

			mxor = Hexor.sxor("foo foo foo", "bar baz qux");
			pos = mtp.findPossibleCribs("foo", mxor);
			expect(pos).to.contain(0)
			expect(pos).to.contain(4)
			expect(pos).to.contain(8)
			pos = mtp.findPossibleCribs(" baz ", mxor);
			expect(pos).to.contain(3)
		})

		/*it("recovers crib location", function() {
			var mtp = new MTP([
				Hexor.sxor("foobarbaz", "one foo a"),
				Hexor.sxor("foobarbaz", " two foo "),
				Hexor.sxor("foobarbaz", "i three a"),
			]);

			expect(mtp.findCrib("one")).to.deep.equal({0:[0]})
			expect(mtp.findCrib("two")).to.deep.equal({1:[1]})
			expect(mtp.findCrib(" three ")).to.deep.equal({2:[1]})
			expect(mtp.findCrib(" foo ")).to.deep.equal({0:[3],1:[4]})
		})*/
	})

	// check if a string is likely ascii
	describe("isPlainText", function() {
		var mtp = new MTP();

		_.forEach(['foo', 'Foo bar baz'], function(str) {
			it("passes normal strings: " +str, function(){
				expect(mtp.isPlainText(str)).to.equal(true);
			})
		})
		_.forEach(['!', '.', ',', '$'], function(str) {
			it("passes punctuation: "+str, function() {
				expect(mtp.isPlainText(str)).to.equal(true);	
			})
		})
		it("passes numbers", function() {
			expect(mtp.isPlainText("1234567890")).to.equal(true);	
		})
		it("fails control characters", function() {
			// up to \t
			for (var i = 0; i <= 8; i++)
				expect(mtp.isPlainText(String.fromCharCode(i))).to.equal(false);
			expect(mtp.isPlainText(String.fromCharCode(11))).to.equal(false);
			expect(mtp.isPlainText(String.fromCharCode(12))).to.equal(false);
			for (var i = 14; i <= 31; i++)
				expect(mtp.isPlainText(String.fromCharCode(i))).to.equal(false);
		})
		it("fails non-ASCII", function() {
			for (var i = 128; i <= 255; i++)
				expect(mtp.isPlainText(String.fromCharCode(i))).to.equal(false);
		})
		it("passes tab, newline, carrige ret", function() {
			expect(mtp.isPlainText("\t\n\r")).to.equal(true)
		})
	})

	describe("spaces", function() {
		var mtp = new MTP([
			Hexor.sxor("foobarbaz", "one foo a"),
			Hexor.sxor("foobarbaz", " two foo "),
			Hexor.sxor("foobarbaz", "i three a"),
			Hexor.sxor("foobarbaz", "I don't k"),
			Hexor.sxor("foobarbaz", "now what i"),
			Hexor.sxor("foobarbaz", "'m doing a"),
			Hexor.sxor("foobarbaz", "Wtf......."),
		]);

		it("recovers the spaces", function() {
			expect(mtp.findSpaces()).to.deep.equal({
				0: [3, 7],
				1: [0, 4, 8],
				2: [1, 7],
			})
		})
	})
})
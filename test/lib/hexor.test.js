/**
 * Hexor
 *
 * Basic functions for managing strings and XORing them
 */
describe('hexor', function() {
	var Fixture = require("../fixture");
	var HXOR = require(Fixture.LIB_DIR+'/hexor');
	var expect = Fixture.expect;

	describe("str2hex", function() {
		it("encode 'A'", function() {
			expect(HXOR.str2hex("A")).to.equal("41");
		})
		it("encode 'foobar'", function() {
			expect(HXOR.str2hex("foobar")).to.equal("666f6f626172");
		})
	})

	describe("hex2str", function() {
		it("decode 'A'", function() {
			expect(HXOR.hex2str("41")).to.equal("A");
		})
		it("decode 'foobar'", function() {
			expect(HXOR.hex2str("666f6f626172")).to.equal("foobar");
		})	
	})

	describe("sxor - xoring two strings", function() {
		it("0xff ^ 0x00 = 0xff", function() {
			expect(HXOR.sxor("\xff", "\x00")).to.equal("\xff")
		})
		it("0xff ^ 0xff = 0x00", function() {
			expect(HXOR.sxor("\xff", "\xff")).to.equal("\x00")
		})
		it("0x00 ^ 0x00 = 0x00", function() {
			expect(HXOR.sxor("\x00", "\x00")).to.equal("\x00")
		})
		it("0xf0 ^ 0x0f = 0xff", function() {
			expect(HXOR.sxor("\xf0", "\x0f")).to.equal("\xff")
		})
		it("'foobar' ^ '      ' = 'FOOBAR'", function() {
			expect(HXOR.sxor("foobar", "      ")).to.equal("FOOBAR")
		})
		it("'FOOBAR' ^ '      ' = 'foobar'", function() {
			expect(HXOR.sxor("FOOBAR", "      ")).to.equal("foobar")
		})

		describe("shortest string", function() {
			it("LHS shorter", function() {
				expect(HXOR.sxor("\xff", "\x00\x00")).to.equal("\xff")
			})
			it("RHS shorter", function() {
				expect(HXOR.sxor("\xff\x00", "\x00")).to.equal("\xff")
			})
		})
	})
})
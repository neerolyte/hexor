/**
 * MTP
 *
 * Many Time Pad
 *
 * Any many time pad is vulnerable to certain attacks, here I'm just fiddling
 * with some.
 */

var HXR = require("./hexor")
var _ = require('lodash')

function MTP(cipherTexts) {

	/**
	 * Determine if a string looks like a reasonable plain text
	 */
	this.isPlainText = function(str) {
		return str.match(/^[a-zA-Z0-9 \.,\n\r\!]+$/) !== null;
	}

	/**
	 * Identify possible crib offsets provided the xor of two messages
	 */
	this.findPossibleCribs = function(crib, mxor) {
		var locs = [];
		for (var i = 0; i <= mxor.length - crib.length; i++) {
			var slice = mxor.slice(i, i+crib.length);
			var pt = HXR.sxor(slice, crib);
			if (this.isPlainText(pt)) {
				locs.push(i);
			}
		}

		return locs;
	}

	/**
	 * Search for a given crib across all ciphertexts, return a list of
	 * locations found as:
	 * {
	 *    ct-offset: [char offsets crib found at]
	 * }
	 */
	this.findCrib = function(crib) {
		var locs = {};
		var counts = {};

		// test every cipher text against every other one
		for (var i = 0; i < cipherTexts.length - 1; i++) {
			for (var j = i+1; j < cipherTexts.length; j++) {
				// xoring the cipher texts gives us the xor of the messages
				var mxor = HXR.sxor(cipherTexts[i], cipherTexts[j]);
				// xor the string with the crib at various positions and see if
				// we ever get plain text

				_.forEach(this.findPossibleCribs(crib, mxor), function(offset) {
					if (counts[i] === undefined) counts[i] = {};
					if (counts[j] === undefined) counts[j] = {};

					if (!counts[i][offset])
						counts[i][offset] = 1;
					else
						counts[i][offset]++
					if (!counts[j][offset])
						counts[j][offset] = 1;
					else
						counts[j][offset]++
				})
			}	
		}

		_.forEach(counts, function(mcounts, mi) {
			_.forEach(mcounts, function(count, offset) {
				if (count == cipherTexts.length - 1) {
					if (locs[mi] == undefined) locs[mi] = [];
					locs[mi].push(parseInt(offset));
				}
			})
		})

		return locs;
	}

	/**
	 * Attempt to find spaces in the various texts
	 */
	this.findSpaces = function() {
		return this.findCrib(" ");
	}
}

module.exports = MTP;
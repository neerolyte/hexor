/**
 * Take an ASCII string and return the hex string
 */
function str2hex(str) {
	var hex = '';
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i).toString(16, "ASCII");
		if (c.length == 1) c = "0" + c;
		hex += c;
	}
	return hex;
}

module.exports.str2hex = str2hex;

/**
 * Take a string of hex ASCII chars and convert to a regular string
 */
function hex2str(hex) {
	var str = '';
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex[i] + hex[i+1], 16));
	return str;
}
module.exports.hex2str = hex2str;

/**
 * Return the XOR of two strings
 */
function sxor(a, b) {
	var str = '';
	var i;
	for (i = 0; i < a.length && i < b.length; i++)
		str += String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i))

	return str;
}
module.exports.sxor = sxor;
var path = require('path');
var LIB_DIR = path.resolve(__dirname, "../lib");

var chai = require("chai");
chai.use(require("chai-as-promised"));

module.exports = {
	expect: chai.expect,
	LIB_DIR: LIB_DIR,
};
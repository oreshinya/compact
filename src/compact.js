var compact = {};

var utils = require("./utils.js"),
    core = require("./core.js"),
    finder = require("./finder.js"),
    writer = require("./writer.js");

utils.extend(compact, core);
utils.extend(compact, finder);
utils.extend(compact, writer);

module.exports = compact;

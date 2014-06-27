var Compact = {},
    utils = require("./utils.js"),
    core = require("./core.js"),
    finder = require("./finder.js"),
    writer = require("./writer.js"),
    store = require("./store.js");

utils.extend(Compact, core);
utils.extend(Compact, finder);
utils.extend(Compact, writer);
utils.extend(Compact, store);

module.exports = Compact;

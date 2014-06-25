var compact = {};

var utils = require("./utils.js"),
    core = require("./core.js"),
    finder = require("./finder.js"),
    writer = require("./writer.js"),
    store = require("./store.js");

utils.extend(compact, core);
utils.extend(compact, finder);
utils.extend(compact, writer);
utils.extend(compact, store);

if ( typeof module !== 'undefined' ) {
  module.exports = compact;
} else {
  window.compact = compact;
}

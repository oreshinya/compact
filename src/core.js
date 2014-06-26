var instance = require("./instance.js"),
    utils = require("./utils.js"),
    memory = require("./memory.js");

module.exports = {

  _storageKey: null,

  _instanceBase: instance,

  extend: function(options) {
    var opts = options || {};
    if ( !opts.key ) {
      throw("key should not be null, undefined");
    }

    memory.init(opts.key);

    var model = Object.create(this);
    model._storageKey = opts.key;
    model._instanceBase = Object.create(this._instanceBase);
    if ( opts.methods ) {
      utils.extend(model._instanceBase, opts.methods);
    }

    return model;
  },

  init: function(attributes) {
    var inst = Object.create(this._instanceBase);
    inst.klass = this;

    utils.extend(inst, attributes);
    return inst;
  }

};

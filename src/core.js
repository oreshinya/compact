var instance = require("./instance.js"),
    utils = require("./utils.js"),
    memory = require("./memory.js");

module.exports = {

  _storageKey: null,

  instanceBase: instance,

  extend: function(key) {
    if ( !key ) {
      throw("key should not be null, undefined");
    }

    memory.init(key);

    var model = Object.create(this);
    model._storageKey = key;
    model.instanceBase = Object.create(this.instanceBase);
    return model;
  },

  init: function(attributes) {
    var inst = Object.create(this.instanceBase);
    inst.klass = this;
    utils.extend(inst, attributes);
    return inst;
  }

};

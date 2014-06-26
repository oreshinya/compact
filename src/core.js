var instance = require("./instance.js"),
    utils = require("./utils.js"),
    memory = require("./memory.js");

module.exports = {

  _storageKey: null,

  _instanceBase: instance,

  extend: function(storageKey, instanceMethods) {
    if ( !storageKey ) {
      throw("storageKey should not be null, undefined");
    }

    memory.init(storageKey);

    var model = Object.create(this);
    model._storageKey = storageKey;
    model._instanceBase = Object.create(this._instanceBase);
    if ( instanceMethods ) {
      utils.extend(model._instanceBase, instanceMethods);
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

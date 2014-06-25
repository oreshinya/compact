var instance = require("./instance.js"),
    utils = require("./utils.js"),
    memory = require("./memory.js");

module.exports = {

  _storageKey: null,

  _createInit: function(instanceMethods) {
    var klass = this;
    var fn = function(attributes) {
      var inst = Object.create(instance);
      inst.klass = klass;

      utils.extend(inst, attributes);
      if ( instanceMethods ) {
        utils.extend(inst, instanceMethods);
      }

      return inst;
    };

    return fn;
  },

  extend: function(storageKey, instanceMethods) {
    if ( !storageKey ) {
      throw("storageKey should not be null, undefined");
    }

    memory.init(storageKey);
    var model = Object.create(this);
    model._storageKey = storageKey;
    model.init = model._createInit(instanceMethods);
    return model;
  }

};

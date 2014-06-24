var instance = require("./instance.js"),
    utils = require("./utils.js");

module.exports = {

  _records: {},

  _storageKey: null,

  _createInit: function(instanceMethods) {
    var _records = this._records;

    var fn = function(attributes) {
      var inst = Object.create(instance);
      inst._records = _records;

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

    var model = Object.create(this);
    model._storageKey = storageKey;
    model.init = this._createInit(instanceMethods);
    return model;
  }

};

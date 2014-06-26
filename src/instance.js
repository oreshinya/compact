var  utils = require("./utils.js"),
     memory = require("./memory.js");

module.exports = {

  klass: null,

  save: function() {
    if ( !this.id ) {
      this.id = UUIDjs.create().toString();
    }

    var attrs = this.attributes(),
        records = memory.get(this.klass._storageKey);

    records[attrs.id] = attrs;

    return this;
  },

  destroy: function() {
    var records = memory.get(this.klass._storageKey);
    delete records[this.id];
  },

  attributes: function() {
    var attrs = {},
        key;

    for ( key in this ) {

      if ( this.isAttribute(key) ) {
        attrs[key] = this[key];
      }

    }

    return attrs;
  },

  isAttribute: function(key) {
    return !utils.is("Function", this[key]) && key !== "klass";
  }

};

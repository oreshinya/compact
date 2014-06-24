var  utils = require("./utils.js");

module.exports = {

  _records: null,

  save: function() {
    if ( this.id )
    var attrs = this.attributes();
    this._records[this.id] = attrs;
  },

  destroy: function() {
    delete this._records[this.id];
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
    var isRecords = ( key === "_records" ),
        isFunction = utils.is("Function", this[key]);

    return !isId && !isRecords && !isFunction;
  }

};

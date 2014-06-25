var memory = require("./memory.js");

module.exports = {

  save: function(values) {
    var i = 0, val;

    for ( ; i < values.length; i++ ) {
      val = values[i];

      if ( !val.id ) {
        return false;
      }

      var records = memory.get(this._storageKey);
      records[val.id] = val;
    }

    return true;
  },

  destroy: function() {
    memory.init(this._storageKey);
  }

};

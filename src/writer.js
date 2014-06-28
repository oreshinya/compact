var memory = require("./memory.js");

module.exports = {

  save: function(values) {
    var records = memory.get(this._storageKey),
        i = 0,
        val;

    for ( ; i < values.length; i++ ) {
      val = values[i];

      if ( !val.id ) {
        return false;
      }

      records[val.id] = val;
    }

    return true;
  },

  destroy: function() {
    memory.drop(this._storageKey);
  }

};

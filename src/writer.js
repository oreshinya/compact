module.exports = {

  save: function(values) {
    var i = 0, val;

    for ( ; i < values.length; i++ ) {
      val = values[i];

      if ( !val.id ) {
        return false;
      }

      this._records[val.id] = val;
    }

    return true;
  },

  destroy: function() {
    this._records = {};
  }

};

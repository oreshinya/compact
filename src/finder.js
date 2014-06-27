var memory = require("./memory.js");

module.exports = {

  all: function() {
    var records = memory.get(this._storageKey),
        instances = [],
        id,
        inst;

    for ( id in records ) {
      inst = this.init(records[id]);
      instances.push(inst);
    }

    return instances;
  },

  find: function(id) {
    var records = memory.get(this._storageKey),
        attrs = records[id];

    if ( !attrs ) {
      return null;
    }

    return this.init(attrs);
  }

};

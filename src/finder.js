var memory = require("./memory.js");

module.exports = {

  all: function() {
    var instances = [],
        id,
        inst;

    var records = memory.get(this._storageKey);

    for ( id in records ) {
      inst = this.init(records[id]);
      instances.push(inst);
    }

    return instances;
  },

  find: function(id) {
    var records = memory.get(this._storageKey);

    var attrs = records[id];

    if ( !attrs ) {
      return null;
    }

    return this.init(attrs);
  }

};

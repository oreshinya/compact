module.exports = {

  all: function() {
    var instances = [],
        id,
        inst;

    for ( id in this._records ) {
      inst = this.init(this._records[id]);
      instances.push(inst);
    }

    return instances;
  },

  find: function(id) {
    var attrs = this._records[id];
    if ( !attrs ) {
      return null;
    }

    return this.init(attrs);
  }

};

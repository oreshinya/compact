var _storage = {};

module.exports = {

  get: function(key) {
    return _storage[key];
  },

  set: function(key, obj) {
    _storage[key] = obj;
  },

  drop: function(key) {
    this.set(key, {});
  },

  init: function(key) {
    if ( this.get(key) ) {
      throw("key should be globally unique");
    }

    this.drop(key);
  }

};

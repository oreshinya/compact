var _storage = {};

module.exports = {

  get: function(key) {
    return _storage[key];
  },

  set: function(key, obj) {
    _storage[key] = obj;
  },

  init: function(key) {
    this.set(key, {});
  }

};

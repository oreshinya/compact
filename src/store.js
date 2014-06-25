var memory = require("./memory.js");

module.exports = {

  saveDb: function(callback) {
    var key = this._storageKey,
        records = memory.get(this._storageKey),
        item = JSON.stringify(records);
    localforage.setItem(key, item, callback);
  },

  loadDb: function(callback) {
    var key = this._storageKey;
    localforage.getItem(key, function(json){
      memory.set(key, JSON.parse(json));
      if (callback) {
        callback();
      }
    });
  }

};

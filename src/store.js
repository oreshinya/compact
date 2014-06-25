module.exports = {

  saveDb: function(callback) {
    var key = this._storageKey,
        item = JSON.stringify(this._records);
    localforage.setItem(key, item, callback);
  },

  loadDb: function(callback) {
    var key = this._storageKey;
    localforage.getItem(key, callback);
  }

};

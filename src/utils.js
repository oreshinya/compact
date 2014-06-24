module.exports = {

  extend: function(to, from) {
    var key;
    for ( key in from ) {
      to[key] = from[key];
    }
  },

  is: function(type, obj) {
    var klass = Object.prototype
                      .toString
                      .call(obj)
                      .slice(8, -1);

    return obj && (klass === type);
  }

};

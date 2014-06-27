var assert = require("power-assert"),
    Compact = require("../../src/compact.js"),
    utils = require("../../src/utils.js");

var initUser = function(context) {
  context.user = context.User.init();
  context.user.id = 1;
  context.user.name = "Mike";
  context.user.save();
};

describe('finder', function(){

  before(function(){
    this.User = Compact.extend({
      key: 'user'
    });
    this.User.destroy();
  });

  describe('Compact.all', function(){

    it("return Array", function(){
      assert(utils.is("Array", this.User.all()));
    });

    context("record is empty", function(){

      it("returned empty Array", function(){
        assert(this.User.all().length === 0);
      });

    });

    context("record is not empty", function(){

      before(function(){
        initUser(this);
      });

      it("returned Array has object", function(){
        assert(this.User.all().length > 0);
      });

    });

  });

  describe('Compact.find', function(){

    context("record is not found", function(){
      before(function(){
        this.User.destroy();
      });

      it("return null", function(){
        assert(this.User.find(1) === null);
      });
    });

    context("record is found", function(){
      before(function(){
        initUser(this);
      });

      it("return object", function(){
        assert(utils.is("Object", this.User.find(1)));
      });
    });

  });

});



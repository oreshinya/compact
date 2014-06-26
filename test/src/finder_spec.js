var assert = require("power-assert"),
    compact = require("../../src/compact.js"),
    utils = require("../../src/utils.js");

describe('finder', function(){

  before(function(){
    this.User = compact.extend({
      key: 'user'
    });
    this.User.destroy();
  });

  describe('compact.all', function(){

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
        this.user = this.User.init();
        this.user.id = 1;
        this.user.name = "Mike";
        this.user.save();
      });

      it("returned Array has object", function(){
        assert(this.User.all().length > 0);
      });

    });

  });

  describe('compact.find', function(){

    context("record is not found", function(){
    });

    context("record is found", function(){
    });

  });

});



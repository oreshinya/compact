var assert = require("power-assert"),
    compact = require("../../src/compact.js");

describe('writer', function(){

  before(function(){
    this.User = compact.extend('user');
  });

  describe('compact.save', function(){

    context("data has id", function(){

      before(function(){
        this.testUserId = 100;
        this.userData = [{id: this.testUserId, name: "Ken"}];
      });

      it("return true", function(){
        assert(this.User.save(this.userData));
      });

      it("records has data", function(){
        assert(this.User.find(this.testUserId));
      });

    });

    context('data does not have id', function(){

      before(function(){
        this.userData = [{name: "Go"}];
      });

      it("return false", function(){
        assert(!this.User.save(this.userData));
      });

    });

  });

  describe('compact.destroy', function(){
    before(function(){
      this.User.destroy();
    });

    it("records is empty object", function(){
      assert(this.User.all().length === 0);
    });
  });

})

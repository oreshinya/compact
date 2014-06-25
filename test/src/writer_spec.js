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

      it("link to instance object's _records property", function(){
        var user = this.User.find(this.testUserId);
        assert(this.User._records[this.testUserId] && user._records[this.testUserId]);
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

    it("_records is empty object", function(){
      assert(Object.keys(this.User._records).length === 0);
    });
  });

})

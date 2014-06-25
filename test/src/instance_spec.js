var assert = require("power-assert"),
    compact = require("../../src/compact.js");

describe('instance', function(){

  before(function(){
    this.User = compact.extend('user');
    this.testUserId = 200;
    this.user = this.User.init();
    this.user.id = this.testUserId;
    this.user.name = "Mike";
    this.user.save();
  });

  describe("compact#save", function(){

    it("_records has instance's attributes", function(){
      assert(this.user._records[this.user.id].name === this.user.name);
    });

    it("link to parent object's _records property", function(){
      assert(this.user._records[this.user.id] && this.User._records[this.user.id]);
    });

    context('instance does not have id', function(){

      before(function(){
        this.user = this.User.init();
      });

      it("returned object has id", function(){
        assert(this.user.save().id);
      });

    });

    context('instance has id', function(){

      before(function(){
        this.user = this.User.init();
        this.userId = 1;
        this.user.id = this.userId;
      });

      it("returned object, it's id is not changed before save", function(){
        assert(this.user.save().id === this.userId);
      });

    });

  });

  describe("compact#destroy", function(){

    before(function(){
      var user = this.User.find(this.testUserId);
      user.destroy();
    });

    it("delete _records property", function(){
      assert(!this.User._records[this.testUserId]);
    });

  });

  describe("compact#attributes", function(){

    before(function(){
      this.user = this.User.init();
      this.user.id = this.testUserId;
      this.user.name = "Mike";
      this.user.save();
    });

    it("returned object has only 'name' property", function(){
      var attrs = this.user.attributes();
      assert(Object.keys(attrs).length === 2 && attrs.hasOwnProperty('id') && attrs.hasOwnProperty('name'));
    });

  });

});

var assert = require("power-assert"),
    compact = require("../../src/compact.js");

describe('instance', function(){

  before(function(){
    this.User = compact.extend({
      key: 'user' 
    });
    this.testUserId = 200;
    this.user = this.User.init();
    this.user.id = this.testUserId;
    this.user.name = "Mike";
    this.user.save();
  });

  describe("compact#save", function(){

    it("records has instance's attributes", function(){
      assert(this.User.find(this.testUserId).name === this.user.name);
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

    it("delete records property", function(){
      assert(!this.User.find(this.testUserId));
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

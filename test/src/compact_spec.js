var assert = require("power-assert"),
    compact = require("../../src/compact.js");

describe('compact', function(){

  describe('core', function(){

    describe('compact.extend', function(){

      context('does not receive storageKey', function(){
        it("occur Error", function(){
          assert.throws(compact.extend);
        });
      });

      context('receive storageKey', function(){

        before(function(){
          this.User = compact.extend('user');
          this.ownedCount = 0;
          this.defaultPropertyCount = 0;

          var key;
          for ( key in compact ) {
            this.defaultPropertyCount++;
            if ( this.User[key] ) {
              this.ownedCount++;
            }
          }
        });

        it("returned object has compact's properties", function(){
          assert(this.ownedCount === this.defaultPropertyCount);
        });

        it("returned object has init method", function(){
          assert(this.User.hasOwnProperty("init"));
        });

        it("returned object has _storageKey: 'user'", function(){
          assert(this.User._storageKey === 'user');
        });

        context('when add methods to extended model', function(){

          before(function(){
            this.User.sample = function(){};
          });

          it("compact does not have added method at extended model", function(){
            assert(!compact.sample);
          });

        });

      });

    });

    describe('compact.init', function(){

      before(function(){
        var User = compact.extend('user'),
            key;

        this.ownedCount = 0;
        this.defaultPropertyCount = 0;
        this.user = User.init();
        this.instance = require("../../src/instance.js");

        for ( key in this.instance ) {
          this.defaultPropertyCount++;
          if ( this.user[key] ) {
            this.ownedCount++;
          }
        }

      });

      it('returned object has instance properties', function(){
        assert(this.defaultPropertyCount === this.ownedCount);
      });

      context('if receive instanceMethods when extended', function(){

        before(function(){
          var User = compact.extend('user', {
            sample: function() {}
          });
          this.user = User.init();
        });

        it("returned instance has 'instanceMethods'", function(){
          assert(this.user.hasOwnProperty('sample'));
        });

        it("compact default instance does not have added instanceMethods", function(){
          assert(!this.instance.hasOwnProperty('sample'));
        });

      });

    });

  });

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

  });

  describe('finder', function(){

    describe('compact.all', function(){

      context("record is empty", function(){
      });

      context("record is not empty", function(){
      });

    });

    describe('compact.find', function(){

      context("record is not found", function(){
      });

      context("record is found", function(){
      });

    });

  });

  describe('store', function(){
  });

});

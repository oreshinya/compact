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
    });

    describe("compact#save", function(){

      before(function(){
        this.user = this.User.init();
        this.user.id = 200;
        this.user.name = "Mike";
        this.user.save();
      });

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
    });

    describe("compact#attributes", function(){
    });

    describe("compact#isAttribute", function(){
    });

  });

  describe('writer', function(){

    describe('compact.save', function(){

      //_recordsはinstanceとclassのでリンクしていることを確認
      it("link to instance object's _records property", function(){
      });

    });

    describe('compact.destroy', function(){
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

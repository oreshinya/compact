var assert = require("power-assert"),
    Compact = require("../../src/compact.js");

describe('core', function(){

  describe('Compact.extend', function(){
    context("does not receive 'options' or 'options.key'", function(){
      it("occur Error", function(){
        assert.throws(Compact.extend);
      });
    });

    context("receive 'options.key'", function(){

      before(function(){
        var that = this;
        that.key = 'user';
        that.User = Compact.extend({
          key: that.key,
          methods: {
            additionalMethod: function(){}
          }
        });
        that.User.fat = function(){};
      });

      it("return object that has '_storageKey' set 'options.key'", function(){
        assert(this.User._storageKey === this.key);
      });

      it("return object that has '_instanceBase'", function(){
        assert(this.User._instanceBase);
      });

      it("return object that has 'extend'", function(){
        assert(this.User.extend);
      });

      it("return object that has 'init'", function(){
        assert(this.User.init);
      });

      it("return object that has 'all'", function(){
        assert(this.User.all);
      });

      it("return object that has 'find'", function(){
        assert(this.User.find);
      });

      it("return object that has 'save'", function(){
        assert(this.User.save);
      });

      it("return object that has 'destroy'", function(){
        assert(this.User.destroy);
      });

      it("return object that has 'saveDb'", function(){
        assert(this.User.saveDb);
      });

      it("return object that has 'loadDb'", function(){
        assert(this.User.loadDb);
      });

      it("return object that's _instanceBase has 'options.methods.additionalMethod'", function(){
        assert(this.User._instanceBase.additionalMethod);
      });

      it("does not add 'options.methods.additionalMethod' to Compacts's _instanceBase", function(){
        assert(!Compact._instanceBase.additionalMethod);
      });

      it("does not add custom method extending object", function() {
        assert(!Compact.fat);
      });

      context("multiple inheritance", function(){

        before(function(){
          this.Police = this.User.extend({
            key: 'police'
          });
        });

        it("return object that's _instanceBase has 'options.methods.additionalMethod'", function(){
          assert(this.Police._instanceBase.additionalMethod);
        });

        it("return object has extending object's method", function() {
          assert(this.Police.fat);
        });

      });

    });

  });

  describe('Compact.init', function(){

    before(function(){
      this.Animal = Compact.extend({
        key: 'animal',
        methods: {
          additionalMethod: function(){}
        }
      });
      this.animal = this.Animal.init();
    });

    it("return object that has 'klass'", function(){
      assert(this.animal.klass.key === this.Animal.key);
    })

    it("return object that has 'save'", function(){
      assert(this.animal.save);
    });

    it("return object that has 'destroy'", function(){
      assert(this.animal.destroy);
    });

    it("return object that has 'attributes'", function(){
      assert(this.animal.attributes);
    });

    it("return object that has 'isAttribute'", function(){
      assert(this.animal.isAttribute);
    });

    it("return object that has _instanceBases's additionalMethod'", function(){
      assert(this.animal.additionalMethod === this.Animal._instanceBase.additionalMethod);
    });

  });

});

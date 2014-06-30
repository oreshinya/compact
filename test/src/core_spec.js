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
        this.key = 'user';
        this.User = Compact.extend(this.key);
        this.User.fat = function() {};
        this.User.instanceBase.additionalMethod = function() {};
      });

      it("return object that has '_storageKey' set 'options.key'", function(){
        assert(this.User._storageKey === this.key);
      });

      it("return object that has 'instanceBase'", function(){
        assert(this.User.instanceBase);
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

      it("does not add 'options.methods.additionalMethod' to Compacts's instanceBase", function(){
        assert(!Compact.instanceBase.additionalMethod);
      });

      it("does not add custom method extending object", function() {
        assert(!Compact.fat);
      });

      context("multiple inheritance", function(){

        before(function(){
          this.Police = this.User.extend('police');
        });

        it("return object that's instanceBase has 'options.methods.additionalMethod'", function(){
          assert(this.Police.instanceBase.additionalMethod);
        });

        it("return object has extending object's method", function() {
          assert(this.Police.fat);
        });

      });

    });

  });

  describe('Compact.init', function(){

    before(function(){
      this.Animal = Compact.extend('animal');
      this.Animal.instanceBase.additionalMethod = function(){};
      this.animal = this.Animal.init();
    });

    it("return object that has 'klass'", function(){
      assert(this.animal.klass === this.Animal);
    });

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

    it("return object that has instanceBases's additionalMethod'", function(){
      assert(this.animal.additionalMethod === this.Animal.instanceBase.additionalMethod);
    });

  });

});

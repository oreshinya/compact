var assert = require("power-assert"),
    Compact = require("../../src/compact.js");

describe('writer', function(){

  before(function(){
    this.Human = Compact.extend({
      key: 'human'
    });
  });

  describe('Compact.save', function(){

    context("data has id", function(){

      before(function(){
        this.testHumanId = 100;
        this.humanData = [{id: this.testHumanId, name: "Ken"}];
      });

      it("return true", function(){
        assert(this.Human.save(this.humanData));
      });

      it("records has data", function(){
        assert(this.Human.find(this.testHumanId));
      });

    });

    context('data does not have id', function(){

      before(function(){
        this.humanData = [{name: "Go"}];
      });

      it("return false", function(){
        assert(!this.Human.save(this.humanData));
      });

    });

  });

  describe('Compact.destroy', function(){
    before(function(){
      this.Human.destroy();
    });

    it("records is empty object", function(){
      assert(this.Human.all().length === 0);
    });
  });

})

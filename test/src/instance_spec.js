var assert = require("power-assert"),
    Compact = require("../../src/compact.js");

describe('instance', function(){

  before(function(){
    this.Pet = Compact.extend('pet');
    this.testPetId = 200;
    this.pet = this.Pet.init();
    this.pet.id = this.testPetId;
    this.pet.name = "Mike";
    this.pet.save();
  });

  describe("Compact#save", function(){

    it("records has instance's attributes", function(){
      assert(this.Pet.find(this.testPetId).name === this.pet.name);
    });

    context('instance does not have id', function(){

      before(function(){
        this.pet = this.Pet.init();
      });

      it("returned object has id", function(){
        assert(this.pet.save().id);
      });

    });

    context('instance has id', function(){

      before(function(){
        this.pet = this.Pet.init();
        this.petId = 1;
        this.pet.id = this.petId;
      });

      it("returned object, it's id is not changed before save", function(){
        assert(this.pet.save().id === this.petId);
      });

    });

  });

  describe("Compact#destroy", function(){

    before(function(){
      var pet = this.Pet.find(this.testPetId);
      pet.destroy();
    });

    it("delete records property", function(){
      assert(!this.Pet.find(this.testPetId));
    });

  });

  describe("Compact#attributes", function(){

    before(function(){
      this.pet = this.Pet.init();
      this.pet.id = this.testPetId;
      this.pet.name = "Mike";
      this.pet.save();
    });

    it("returned object has only 'name' property", function(){
      var attrs = this.pet.attributes();
      assert(Object.keys(attrs).length === 2 && attrs.hasOwnProperty('id') && attrs.hasOwnProperty('name'));
    });

  });

});

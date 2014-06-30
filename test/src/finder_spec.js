var assert = require("power-assert"),
    Compact = require("../../src/compact.js"),
    utils = require("../../src/utils.js");

var initRobot = function(context) {
  context.robot = context.Robot.init();
  context.robot.id = 1;
  context.robot.name = "Mike";
  context.robot.save();
};

describe('finder', function(){

  before(function(){
    this.Robot = Compact.extend('robot');
    this.Robot.destroy();
  });

  describe('Compact.all', function(){

    it("return Array", function(){
      assert(utils.is("Array", this.Robot.all()));
    });

    context("record is empty", function(){

      it("returned empty Array", function(){
        assert(this.Robot.all().length === 0);
      });

    });

    context("record is not empty", function(){

      before(function(){
        initRobot(this);
      });

      it("returned Array has object", function(){
        assert(this.Robot.all().length > 0);
      });

    });

  });

  describe('Compact.find', function(){

    context("record is not found", function(){
      before(function(){
        this.Robot.destroy();
      });

      it("return null", function(){
        assert(this.Robot.find(1) === null);
      });
    });

    context("record is found", function(){
      before(function(){
        initRobot(this);
      });

      it("return object", function(){
        assert(utils.is("Object", this.Robot.find(1)));
      });
    });

  });

});



#Compact.js
compact.js is storage API wrapper with localforage.

#Usage
```
var Cat = compact.extend({
  key: 'cat',
  methods: {
    talk: function() {
      console.log('nyah!');
    }
  }
});

Cat.sampleMethod = function() {
  console.log('sample!');
};

var cat = Cat.init();
cat.talk(); //=> nyah!
cat.name = "Mike";
// save to memory.
cat.save(); // if it does not have id, it create id.

var cat_2 = Cat.init({
  id: 1,
  name: "Jack"
});
cat_2.save();
// delete from memory.
cat_2.destroy();

// save all cat's data to localforage.
var callback = function() {
  console.log("saved!");
};
Cat.saveDb(callback);

// load all cat's data from localforage.
var callback = function() {
  console.log("loaded!");
};
Cat.loadDb(callback);

// inherit
var Tygar = Cat.extend({
  key: 'tygar'
});
Tygar.sampleMethod(); //=> sample!
var tygar = Tygar.init();
tygar.talk(); //=> nyah!
```

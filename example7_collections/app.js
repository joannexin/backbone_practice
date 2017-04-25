var Book = Backbone.Model.extend({
  urlRoot: "http://localhost:8080/books",
  initialize: function() {
    this.on("invalid", function(model, error) {
      console.log(error);
    });
  },
  defaults: {
    name: "Book title",
    author: "No one",
    year: ""
  }
});

var Library = Backbone.Collection.extend({
  model: Book,
  initialize: function() {
    // Here you can add your event listeners
    this.on("remove", function(removedModel, models, options) {
      console.log("We removed model at index " + options.index);
    })
  }
});

// var myLibrary = new Library([
//   {id: 1, name: "The Hunger Games", author: "Suzanne Collins", year: 2008},
//   {id: 1, name: "Harry Potter", author: "J. K. Rowling", year: 2003}
// ])

var myLibrary = new Library();
// myLibrary.add({name: "The Hunger Games", author: "Suzanne Collins", year: 2008});

var sampleBook = new Book({
  name: "Sample Book",
  author: "Sample Author",
  year: "2003"
});
myLibrary.add(sampleBook);

myLibrary.push({name: "The Hunger Games", author: "Suzanne Collins", year: 2008});
myLibrary.unshift({name: "Lord of Flies", author: "William Goodwing", year: 1995});
myLibrary.add({name: "Lord of Flies", author: "William Goodwing", year: 1953, cid: "c2"}, {merge: true});
console.log(myLibrary.size());
console.log(myLibrary.models);

myLibrary.remove(sampleBook);
// myLibrary.remove([sampleBook1, sampleBook2]);
console.log(myLibrary.models);

// reset
otherModelsArray = [
  {
    name: "Book1",
    author: "Author1",
    year: "2001"
  },
  {
    name: "Book2",
    author: "Author2",
    year: "2002"
  },
  {
    name: "Book3",
    author: "Author3",
    year: "2003"
  }
];

myLibrary.reset(otherModelsArray);
console.log(myLibrary.models);
myLibrary.reset() // will return empty array [];

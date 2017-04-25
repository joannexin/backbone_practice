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
  url: "http://localhost:8080/books",
  initialize: function() {
    // Here you can add your event listeners
    this.on("remove", function(removedModel, models, options) {
      console.log("We removed model at index " + options.index);
    })
  }
});

var myLibrary = new Library();

var sampleBook = new Book({
  name: "Sample Book",
  author: "Sample Author",
  year: "2003"
});

myLibrary.add(sampleBook);
myLibrary.push({name: "The Alchemist", author: "Paulo Coehlo", year: 1993});
myLibrary.push({name: "Lord of Flies", author: "William Goodwing", year: 1995});
myLibrary.push({name: "Lord of Flies 2", author: "William Goodwing", year: 1953});

// save model to back end
myLibrary.forEach(function(model) {
  model.save();
})

// create new model
var myModel = new Book({
  name: "New book",
  author: "jaonne",
  year: 2017
})
myLibrary.create(myModel);

// destory model from back end
var myDeletedModel = new Book();
myDeletedModel.set("id", 1);
myDeletedModel.destory();

// retieve collection from server
myLibrary.fetch({
  success: function() {
    console.log("Collection retrieved from the server");
  },
  error: function() {
    console.log("failed to retrieved");
  }
});

console.log(myLibrary.models);

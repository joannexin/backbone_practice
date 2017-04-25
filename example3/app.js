var Book = Backbone.Model.extend({
  initialize: function() {
    this.on("invalid", function(model, error) {
      console.log(error);
    })
  },
  validate: function(attrs) {
    if (attrs.name === "") {
      return "Please enter a title for the book";
    }
    if (attrs.author === "") {
      return "Please enter an author for the book";
    }
    if (attrs.year > 2015) {
      return "Please enter a valid year";
    }
  },
  // The defaults are the initial values of your attributes until they are changed by the new model
  defaults: {
    name: "Book title",
    author: "No one",
    year: ""
  }
});

var newBook = new Book();
newBook.set({"name": ""}, {validate: true});
newBook.set({"year": 2020});

console.log("Is this model valid? " + newBook.isValid());

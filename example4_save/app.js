var Book = Backbone.Model.extend({
  urlRoot: "http://localhost:8080/books",
  initialize: function() {

  },
  defaults: {
    name: "Book title",
    author: "No one",
    year: ""
  },
  validate: function(attrs) {
    if (attrs.author === "No one") {
      return "Please enter author";
    }
  }
});
var myBook = new Book();
myBook.set("name", "King of flies");
myBook.set("author", "Glodwing");

myBook.save();

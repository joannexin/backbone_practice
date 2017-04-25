var Book = Backbone.Model.extend({
  urlRoot: "http://localhost:8080/books",
  defaults: {
    name: "Book title",
    author: "No one",
    year: ""
  }
});

var myBook = new Book();
myBook.set("id", 3);
myBook.destory({
  success: function() {
    console.log("deleted successfully");
  },
  error: function(err) {
    console.log(err);
  }
}, {wait: true})

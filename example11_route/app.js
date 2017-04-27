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
  url: "http://localhost:8080/books"
});

var myLibrary = new Library();
var LibraryView = Backbone.View.extend({
  collection: myLibrary,
  // if not specify el, will default to div
  el: "ul",
  id: "book-list",
  initialize: function() {
    this.render();
  },
  event: {
    "click li": function() {
      alert("You clicked me!");
    }
  },
  // template: handlebars.compile("books-template").html()),
  render: function() {
    var self = this;
    var output = self.template({"library": this.collection.toJSON()});
    this.$el.append(output);
    return self;
  }
});

var LibraryRouter = Backbone.Router.extend({
  routes: {
    "book/:author(/:year)": "displaybook",
    // "books/book:id": "displaySingleBook",
    "books/*path": "displayArbitrary",
    "": "homepage",
    "*default": "defaultRoute"
  },
  homepage: function() {
    console.log("Yo reached the homepage");
  },
  defaultRoute: function() {
    console.log("Not found");
  },
  displaybook: function(author, year) {
    if (year != null) {
      console.log("Displaybook a book for author " + author);
    }
    console.log("Display a book for author " + author + " in the year " + year);
  },
  displaySingleBook: function(id) {
    console.log("Displaybook book with id " + id);
  },
  displayArbitrary: function(path) {
    path = path.split("/");
    console.log("First segment is " + path[0] + " and second is " + path[1]);
  }
});

var router = new LibraryRouter();

router.on("route:displaySingleBook", function(page) {
  alert("You have reached the books route");
})

Backbone.history.start();

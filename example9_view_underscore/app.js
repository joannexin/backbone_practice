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
  template: _.template($("books-template").html()),
  render: function() {
    var self = this;
    var output = self.template({"library": this.collection.toJSON()});
    this.$el.append(output);
    return self;
  }
})

myLibrary.fetch({
  success: function() {
    var myView = new LibraryView();
  }
})

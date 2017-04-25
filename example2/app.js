var myBook = Backbone.Model.extend({
  initialize: function() {
    this.on("change:Year", function(model, error) {
      console.log("The book model has changed");
    })
  },
  Title: "No Title",
  Author: "No one",
  Year: "No year"
});

var newBook = new myBook({
  Title: "Harry Potter",
  Author: "J. K. Rowling",
  Year: 2000
});

newBook.set("Year", 2005);
// newBook.set({"Year": 2005}, {silent: true});
newBook.set("Name", "The animal farm");

// check the last change that happended
if (newBook.hasChanged("Name")) {
  console.log("The name of the book has changed");
}

console.log(JSON.stringify(newBook.changed));

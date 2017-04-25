var myBook = Backbone.Model.extend({
  initialize: function() {
    console.log("The book model is initialized");
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

console.log("The title of the new book is " + newBook.get("Title"));

newBook.set("Year", 1999);
console.log("The publishing year of the new book is " + newBook.get("Year"));

newBook.unset("Year");
console.log("The publishing year of the new book is " + newBook.get("Year"));

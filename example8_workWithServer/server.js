var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

// sample collection, should be retreived from db commonly
var books = [
  {id: 1, name: "The Hunger Games", author: "Suzanne Collins", year: 2008},
  {id: 1, name: "Harry Potter", author: "J. K. Rowling", year: 2003},
  {id: 1, name: "Twilight", author: "Stephenie Meyer", year: 2005},
  {id: 1, name: "Jane Austen", author: "Pride and Prejudice", year: 1813}
];

// Get a book by it's ID
function findBook(id) {
  for (var i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      return {"book": books[i], "index": i};
    }
  }
  return null;
}

// Remove a book by it's ID
function removeBook(id) {
  for (var i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      books.splice(i, 1);
      break;
    }
  }
}

// Parse the request body(for Node to understand the request made by browser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load static files
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/node_modules`));

// Routes
app.get("/", function(req, res) {
  res.sendFile("index.html");
});

// Get a list of all the books
app.get("/books", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Getting all books");
  res.send(books);
});

// Get request to fetch book data with the ID
app.get("/books/:id", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Getting a book with the id " + req.params.id);
  var book = findBook(parseInt(req.params.id, 10));
  if (book === null) {
    res.sendStatus(404);
  } else {
    res.json(book.book);
  }
});

// POST request containing the book you are creating. Returns 200 on success
app.post("/books", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  var book = req.body;
  lastId = books[books.length - 1].id;
  book.id = lastId + 1;
  books.push(book);
  console.log("Saving book with the following structue " + JSON.stringify(bookk));
  res.send(book);
});

// PUT request to update the details for a book by specifying it's ID. Returns 404 if the book to be updated does not exit.
app.post("/books/:id", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  var book = req.body;
  console.log("Updating Book " + JSON.stringify(bookk));
  var currentBook = findBook(parseInt(req.params.id, 10));
  if (currentBook === null) {
    console.log("Could not find the book "+ currentBook);
  } else {
    books[currentBook.index] = book;
    res.send(book);
  }
});

// Delete a book specifying it's ID. Returns 404 if the book to be deleted is not found.
app.delete("/books/:id", function(req, res) {
  console.log("calling delete");
  res.header("Access-Control-Allow-Origin", "*");
  var book = findBook(parseInt(req.params.id, 10));
  if (book === null) {
    console.log("Could not find book with ID " + req.params.id);
    res.sendStatus(404);
  } else {
    console.log("Deleting " + req.params.id);
    removeBook(parseInt(req.params.id, 10));
    res.send(book);
  }
});

// Additional setup to allow CORS requests
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});

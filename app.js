let express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Init App
const app = express();

// Init database connection
mongoose.connect("mongodb://admin:admin@ds145750.mlab.com:45750/articles")
let db = mongoose.connection;

// Load View Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", function(request, response) {
  response.render("index");
});

app.get("/articles", function(request, response) {
  let articles = [
    {
      id: "1",
      title: "Article One",
      author: "John Doe",
      body: "This is the first article"
    }
  ]
  response.render("index", { title: "Articles", articles: articles });
});

// Add Route
app.get("/articles/add", function(request, response) {
  response.render("articles/add", {title: "Add Articles"});
});

app.listen(3000, function() {
  console.log("Server started on port: 3000");
})

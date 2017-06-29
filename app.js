let express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Todo
// Install Intellise
// Format Beautify Plugin
// Other require Plugins
// Comments in Italic
// What is bodyparser
// What is UrlEncoded

// Init App
const app = express();


// Init database connection
mongoose.connect("mongodb://admin:admin@ds163060.mlab.com:63060/articlesapp")
let db = mongoose.connection;

// Check for DB connection
db.once("open", function(error) {
  console.log("Connected to Mongo DB");
});

// Check for DB errors
db.on("error", function(error) {
  console.log(error);
});

// Bring in Models
let Article = require("./models/article");


// Load View Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// BodyParser Middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse application/json
app.use(bodyParser.json())

// Home Route
app.get("/", function(request, response) {
  response.render("index");
});

// Get Articles
app.get("/articles", function(request, response) {
  Article.find({}, function(error, articles) {
      if(error) {
      } else {
        response.render("articles/index", { title: "Articles", articles: articles });
      }
  });
});

// Add Article
app.get("/articles/add", function(request, response) {
  response.render("articles/add", {title: "Add Articles"});
});

// Save Article
app.post("/articles/add", function(request, response) {
  let article = new Article();
  article.title = request.body.title;
  article.author =request.body.author;
  article.body =request.body.body;
  article.save(function(error) {
    if(error) {
      // How to do error handling in NodeJS
      console.log(error);
      return;
    } else {
      response.redirect("/articles");
    }
  });
});

// Start the server
app.listen(3000, function() {
  console.log("Server started on port: 3000");
})

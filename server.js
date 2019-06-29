//Dependencies

var express = require("express");
var logger = require("morgan");
var mangoose = require ("mongoose");
var exphbs = require ("express-handlebars");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();
var port = process.env.PORT || 3000;

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev")); // ASK DENIS about "dev"
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));




// conntact to Mongoose DB
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
}
else {
	mongoose.connect(databaseUrl);
};

// sets-ups

// Routes

// A GET route for scraping nytime.com/soccer website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/topic/subject/soccer").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cherrio.load(response.data);
    // Now, we grab every h2 within an article tag, and do the following:

    $("h2").each(function(i, element) {
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
      .children("a")
      .text();
    result.link = $(this)
      .children("a")
      .attr("href");
    
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
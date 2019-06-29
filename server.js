//Dependencies

var express = require("express");
var logger = require("morgan");
var mangoose = require ("mongoose");
var exphbs = require ("express-handlebars");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");


// Mongoose
// if (process.env.MONGODB_URI) {
// 	mongoose.connect(process.env.MONGODB_URI);
// }
// else {
// 	mongoose.connect(databaseUrl);
// };


// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();
var port = process.env.PORT || 3000;

// sets-ups

// Routes

// A GET route for scraping nytime.com/soccer website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/topic/subject/soccer").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cherrio.load(response.data);
    // Now, we grab every h2 within an article tag, and do the following:

    $().each(function(i, element) {
        var result = {};
        // save an empty result object

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
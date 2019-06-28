//Dependencies

var express = require("express");
var logger = require("morgan");
var mangoose = require ("mongoose");
var exphbs = require ("express-handlebars");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");


// Mongoose
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
}
else {
	mongoose.connect(databaseUrl);
};


// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();
var port = process.env.PORT || 3000;

// sets-ups




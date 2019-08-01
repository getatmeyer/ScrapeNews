//Dependencies

var express = require("express");
var logger = require("morgan");

var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path")


// Require all models
var db = require("./models");
console.log(db, "<--...database loading");


var port = 3000;

// Initialize Express
var app = express();
var port = process.env.PORT || 8000;

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// conntact to Mongoose DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// sets-up array
var articlesFromScrape = [];
// Routes

// A GET route for scraping nytime.com/soccer website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.nytimes.com/topic/subject/soccer").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every story-body within an article tag, and do the following:
    $(".story-body").each(function (i, element) {
      var result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).find(".headline").text().trim()
      result.summary = $(this).find(".summary").text().trim()
      result.link = $(this).find(".story-link").attr("href")

      console.log(result)
      // var card = $("<div class='card'>");
      // var cardHeader = $("<div class='card-header'>")
      //   .find(".headline")
      //   // .children(".h2")
      //   .text().trim()


      // var mySum = result.summary = $(this)
      // var cardBody = $("div class='card-body'>")
      //   .find("p")
      //   .text().trim()
      // var myLink = result.link = $(this)
      //   .children("a")
      //   .attr("href");
      // result.date = $(this)
      // .find(".time")
      // .children("dateline")
      // .text().trim()
      // console.log(result);

      // var infoToAdd = {
      //   title: myTitle,
      //   summary: mySum,
      //   link: myLink
      // }
      if (result.title && result.link && result.summary) {
        //if all three properties of results are there, then push it to the DB
        // articlesFromScrape.push(infoToAdd)
        db.Article.create(result)
          .then(function (dbArticle) {
            console.log(dbArticle)
            //   //     // View the added result in the console
            //  console.log(dbArticle.length = ' created');
          })

          .catch(function (err) {
            //       // If an error occurred, log it
            // res.send()
            console.log(err);
          })

      }

      // Create a new Article using the `result` object built from scraping
      // res.json("articlesFromScrape");
      // res.send("Scrape Complete");

    })
    // console.log ("all about article")
    //  (function(articlesFromScrape) {

  });
  res.send("Scrape Complete");

})


// Send a message to the client

//return articlesFromScrape;
// });


//Route for getting all Articles
app.get("/articles", function (req, res) {
  //   // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      //           // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      //           // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
  //   //   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    //  // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      //    //If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      //     // If an error occurred, send it to the client
      res.json(err);
    });
});
// ROUTE FOR deleting article by id
app.get("/articles/clear", function (req, res) {
  db.Headline.drop({})
  .then(response=> res.json(response))
.catch(err=> console.log(err));
})

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  //   // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      //       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });

    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//routing
require("./routing/htmlRoutes")(app);

// Start the server
app.listen(port, function () {
  console.log("App running on port " + port + "!");
});


$(document).ready(function() {

  $(document).on("click", ".scrape-new", handleNewScrape);
  $(document).on("click", ".scape-saved", handleSave);
});


module.exports = {
    Article: require("./Article"),
    Note: require("./Note")
  };
  
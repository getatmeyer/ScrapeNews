// Grab the articles as a json
$.getJSON("/articles", function(data) {

for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary +  "<br />" + data[i].link + "</p>");

}
});

$(document.on("click", "p", function() {
      // Empty the notes from the note section
    $("#notes").empty();
      // Save the id from the p tag
    var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
    $.ajax({
        method:"GET",
        url:"/articles/" + thisId
    })

        .then(function(data) {
            // console.log(data);

            $("#notes").append("<h3>" + data.title + "</h2>");

            $("#notes").append("<input id='titleinput' name='title' >");

          

           
        });
    }))
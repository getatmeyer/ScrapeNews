// Grab the articles as a json
$.getJSON("/articles", function(data) {

for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles" // change it when you find the link
    ).append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
}
});

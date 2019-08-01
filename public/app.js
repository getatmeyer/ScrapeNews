// Grab the articles as a json

$.getJSON("/articles", function(data) {

for (var i = 0; i < data.length; i++) {
  // var newArticle= `<div data-id=${data[i]._id}  class="card-header">
  var newArticle= `<div class="article_body">
  <a class="articleHeader" target="_blank"
  href=${data[i].link}>${data[i].title}</a>
  <div data-id=${data[i]._id}
  class="article_summary">
  <p class="article-summary">
  ${data[i].summary}
  </p>
  <button data-id="${data[i]._id}" class="btn btn-success save">Save Article</a>  
  </div>`
$("#articles").append(newArticle)


// var newSummary= `<div data-id=${data[i]._id}  class="card-summary">
//   <p class="article-summary" href=${data[i].summary}</p>


//   </div>`
//   $("#summaries").append(newSummary)

}}

);
// console.log(newArticle)
    // Display the apropos information on the page
    // $(√"#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary +  "<br />" + data[i].link + "</p>");


// for (var j = 0; j < data.length; j++) {
//   var newSummary= `<div data-id=${data[i]._id}  class="card-body">
//   <a class="cardBody" href=${data[i].summary}</a>
//   </div>`

  // $("#summaries").append(newSummary)


$(document).on("click", "p", function() {
      // Empty the notes from the note section
        $("#notes").empty();
      // Save the id from the p tag
         var thisId = $(this).attr("data-id");

    $.ajax({
        method:"GET",
        url:"/articles/" + thisId
    })

        .then(function(data) {
            console.log(data);
                 // The title of the article
             $("#notes").append("<h5>" + data.title + "</h5>");
                // An input to enter a new title
            
            $("#notes").append("<input id='titleinput' name='title' >");
                  // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
                  // A button to submit a new note, with the id of the article saved to it
                  // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
                  $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Article</button>");


                        // If there's a note in the article
                        if (data.note) {
                        // Place the title of the note in the title input
                        $("#titleinput").val(data.note.title);
                        // Place the body of the note in the body textarea
                        $("#bodyinput").val(data.note.body);
                        }

        });
    });

    // When you click the savenote button
          $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
          var thisId = $(this).attr("data-id");

            // Run a POST request to change the note, using what's entered in the inputs

          $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
              // Value taken from title input
              title: $("#titleinput").val(),
              // Value taken from note textarea
              body: $("#bodyinput").val()
            }
          })
          // With that done
            .then(function(data) {
        // Log the response
             console.log(data);
        // Empty the notes section
             $("#notes").empty();
      });

      // Also, remove the values entered in the input and textarea for note entry
            $("#titleinput").val("");
            $("#bodyinput").val("");
});

//CLEAR ARTICLES CLICK EVENT

//Make a delete request to /articles/clear  
 $(document).on("click", "#clearDB", function() {
    $.get("/articles/clear")
    .then(response => console.log(response))
    .catch(err => console.log(err));
    
 })
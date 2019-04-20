// variable to avoid having several times the same articles
// when "scrape" button is clicked a couple of times
// var hasBeenScrapedAlready = "false";

// event listener on the "scrape" button
$("#scrape").on("click", function(event) {
    // prevent the page to refresh
    event.preventDefault();

    // GET request to scrape the NYT website
    $.ajax("/scrape", {
        method: "GET"
    }).then(function() {
        // reload the page
        location.reload();
    });
});

// event listener on the "delete" button to delete the unsaved articles
$("#delete").on("click", function(event) {
    // prevent the page to refresh
    event.preventDefault();

    // post request to delete the articles that haven't been saved
    $.ajax("/delete-articles", {
        method: "POST"
    }).then(function() {
        // reload the page
        location.reload();
    });
})

// event listener on the "save" buttons
$(document).on("click", ".save-button", function(event) {
    // prevent the page to refresh
    event.preventDefault();

    // grab the id of the article whose button has been clicked
    var articleID = $(this).data("id");
    // console.log(articleID);

    // post request to update the value of "save" in the Article collection
    $.ajax("/save-article/" + articleID, {
        method: "POST"
    }).then(function() {
        // reload the page
        location.reload();
    });
});

// event listener on the "delete-saved-article" button to delete the saved articles
$(document).on("click", ".delete-saved-article", function(event) {
    // grab the id of the article whose button has been clicked
    var articleID = $(this).data("id");
    // console.log(articleID);

    // post request to delete the saved article whose "delete" button has been clicked
    $.ajax("/delete-article/" + articleID, {
        method: "POST"
    }).then(function() {
        // reload the page
        location.reload();
    });
});

// event listener on the "note" button to add note to saved articles
$(document).on("click", ".note-button", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // grab the id of the article whose button has been clicked
    var articleID = $(this).data("id");
    // console.log(articleID);
  
    // GET request 
    $.ajax("/note-article/" + articleID, {
        method: "GET"
    }).then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });





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

// event listener on the "note" button to add note to a saved article
$(document).on("click", ".note-button", function() {
    // Empty the notes from the note section so we don't get a new text area
    // each time we click on the "note" button
    $("#new-note").empty();
    // grab the id of the article whose button has been clicked
    var articleID = $(this).data("id");
    // console.log(articleID);
  
    // GET request 
    $.ajax("/note-article/" + articleID, {
        method: "GET"
    }).then(function(data) {
        console.log(data);

        // add a header to the modal
        $("#header-note").text("Note for: '" + data.title +"'");
        // add a textarea to be able to write the note
        $("#new-note").append("<textarea class='w-100' id='body-input' name='body'></textarea>");
        // add a button to save the note
        $("#new-note").append("<br/><button class='btn btn-sm btn-success save-note' data-id='" + data._id + "'>Save Note</button>");

        // display the modal
        $("#modal-notes").modal("toggle");
  
        // If there are notes in the article
        if (data.notes) {
            // loop through the notes and display them
            for (var i = 0; i < data.notes.length; i++) {
                // Place the body of the note in the body textarea
                $("#new-note").prepend("<p>" + data.notes[i].body + "</p><hr/>");
            }   
        }
    });
});

// event listener on the "save-note" button to save the note
$(document).on("click", ".save-note", function() {
    // grab the id of the article whose button has been clicked
    var articleID = $(this).data("id");

    // grab the text entered
    var data = {
        body: $("#body-input").val().trim()
    }

    // post request
    $.ajax("/note-article/" + articleID, {
        method: "POST",
        data: data
    }).then(function(data) {
        // Log the response
        console.log(data);
        // close the modal
        $("#modal-notes").modal("toggle");
    });
});





// JavaScript to run after DOM has loaded
$(document).ready(function() {

  // Handle Form Submit
  $("Form").submit(function(event) {

    // Reveal the Suggestions
    $("#suggestions").removeClass("hidden");

    // Prevent page from refreshing
    event.preventDefault();
  }); // End Form submit


  // Show or hide Questionnaire
  $(".panel-heading").click(function() {
    $(this).siblings(".panel-body").toggle();
  });


}); // End JavaScript

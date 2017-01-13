// JavaScript to run after DOM has loaded
$(document).ready(function() {
  alert("document ready");

  // Handle Form Submit
  $("Form").submit(function(event) {
    alert("form submit");

    // Reveal the Suggestions
    $("#suggestions").removeClass("hidden");
    
    // Prevent page from refreshing
    event.preventDefault();
  }); // End Form submit

}); // End JavaScript

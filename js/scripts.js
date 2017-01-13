// JavaScript to run after DOM has loaded
$(document).ready(function() {
  // Get array of scores from questionnaire
  // Column 0 is the radio button's name
  // Column 1 is the numeric value from the checked button
  var getScores = function(scoreArray) {
    var name, score;
    $(".radio.questionnaireScore label input:checked").each(function() {
      name = $(this).attr("name");
      score = parseInt( $(this).val() );
      scoreArray.push([name, score]);
    });
  };

  // Handle Form Submit
  $("form").submit(function(event) {
    var scoreArray = [];

    getScores(scoreArray);
    console.log(scoreArray);

    // Reveal the Suggestions
    $("#suggestions").removeClass("hidden");

    // Prevent page from refreshing
    event.preventDefault();
  }); // End Form submit


  // Show or hide Questionnaire
  $(".panel-heading").click(function() {
    $(this).siblings(".panel-body").slideToggle();
  });


}); // End JavaScript

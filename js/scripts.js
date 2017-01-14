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

    ////////////////////////////////////////////////////////////////
   // Begin Handle Form Submit
  ////////////////////////////////////////////////////////////////
  $("form").submit(function(event) {
    // Hold list of questionnaire name and score pairs
    var scoreArray = [];
    var personName = $("#inputName").val();
    var suggestions = "";
    var suggestionsStopped = false;
    var programmingTracks = ["java", "dotNet", "ruby", "php"];
    var programmingTrackNames = ["Java", "C#/.Net", "Ruby", "PHP"];
    var preferredProgramming = [];

    // Prevent page from refreshing
    event.preventDefault();

    // Begin Function Section
    // Given name return score
    var scoreOf = function(name) {
      for (var i = 0; i < scoreArray.length; i++) {
        if (name === scoreArray[i][0]) {
          return scoreArray[i][1];
        }
      }
    };

    // Number of questions
    var numberOfQuestions = function() {
      return scoreArray.length
    };

    // Number of preferences
    var numberOfPreferences = function() {
      var count = 0;
      for (var i = 0; i < scoreArray.length; i++) {
        if (scoreArray[i][1] !== 0) {
          count++;
        }
      }
      return count;
    }

    // Stop evaluating suggestions
    var stopSuggestions = function() {
      suggestionsStopped = true;
    }

    // Get Programming Track choices
    var getProgrammingChoices = function(programmingTracks, programmingTrackNames) {
      // Top choices
      var prefered = [];

      for (var i = 0; i < programmingTracks.length; i++) {
        if (scoreOf(programmingTracks[i]) === 2) {
          prefered.push(programmingTrackNames[i]);
        }
      }
      // Secondary choices
      for (var i = 0; i < programmingTracks.length; i++) {
        if (scoreOf(programmingTracks[i]) === 1) {
          prefered.push(programmingTrackNames[i]);
        }
      }
      return prefered;
    }
    // End Function Section

      ////////////////////////
     // Main Body of Submit
    ///////////////////////
    getScores(scoreArray);
    preferedProgramming = getProgrammingChoices(programmingTracks, programmingTrackNames);

    // Start building message to user with personal greeting
    if (!suggestionsStopped && personName) {
      suggestions += "Hello " + personName + "! ";
    }

    // Did the user give us enough preferences to form a suggestion?
    // (More than 1/2).
    if (!suggestionsStopped && numberOfPreferences() <= numberOfQuestions() / 2) {
      suggestions += "Please provide a preference for most questions so I can provide a suggestion. "
      stopSuggestions();
    }

    // Design only?
    if (!suggestionsStopped && scoreOf("design") > 0 && scoreOf("programming") <= 0) {
      suggestions += "The CSS and Design track looks best for you! ";
      stopSuggestions();
    }

    // Programming?
    if (!suggestionsStopped && scoreOf("programming") > 0) {
      if (scoreOf("design") > 0) {
        suggestions += "Choosing a programming track and studying Design or CSS on your own looks best for you! ";
      } else {
        suggestions += "Choosing a programming track looks best for you! ";
      }
    } else {
      stopSuggestions();
    }

    // What programming are they interested in?
    // All?
    if (!suggestionsStopped && preferedProgramming.length === programmingTracks.length) {
      suggestions += "Any programming track might be a good starting point for you, then you can fill in what else you are interested own your own. ";
      stopSuggestions();
    }

    // Insert suggestions
    $("#suggestions p").text(suggestions);

    // Reveal the Suggestions
    $("#suggestions").fadeIn();

  });
    ////////////////////////////////////////////////////////////////
   // End Handle Form Submit
  ////////////////////////////////////////////////////////////////


  // Show or hide Questionnaire
  $(".panel-heading").click(function() {
    $(this).siblings(".panel-body").slideToggle();
  });

  // Fade suggestions box away
  $(".fadeOutParent").click(function() {
    $(this).parent().fadeOut();
  });


}); // End JavaScript

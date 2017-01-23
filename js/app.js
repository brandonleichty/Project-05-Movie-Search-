'use strict';

//Global variables---->>>>
var userSearchText;

var OMDb_URL = 'http://www.omdbapi.com/?';



//Start of movie search/submit button
$('#submit').on('click', function(event){
  //Look more into specifics of how this works
  event.preventDefault();

  //Get user entered movie title and trims it
  userSearchText = $('#search').val().trim();

  console.log('The submit button event handler is working. User input = ' + userSearchText);

//Data to be be sent/requested from the OMDb
  var movieDataRequest = {
      s: userSearchText,
      plot: 'full',
      type: 'movie',
      r: 'json',
    };

    $.getJSON(OMDb_URL, movieDataRequest, displayMoviesCallback);

}); //End of #submit click event handler function




 function displayMoviesCallback(movie) {

  $.each(movie.Search, function( i, moviePropertie){
    console.log(moviePropertie.Title + ' ' +moviePropertie.Year);
  });

};

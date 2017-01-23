'use strict';

//Global variables---->>>>
var userMovieSearchInput;
var userMovieYearInput;

var OMDb_URL = 'http://www.omdbapi.com/?';

// $('#year').on('keyup', function(){
//   userMovieYearInput = $('#year').val();
// });


//Start of movie search/submit button
$('#submit').on('click', function(event){
  //Look more into specifics of how this works
  event.preventDefault();

  //Set year variable
  userMovieYearInput = $('#year').val();

  //Clears the search results
  $('#movies').empty();

  //Get user entered movie title and trims it
  userMovieSearchInput = $('#search').val().trim();

  console.log('The submit button event handler is working. User input = ' + userMovieSearchInput);

//Data to be be sent/requested from the OMDb
  var movieDataRequest = {
      s: userMovieSearchInput,
      plot: 'full',
      type: 'movie',
      r: 'json',
      y: userMovieYearInput
    };

    $.getJSON(OMDb_URL, movieDataRequest, displayMoviesCallback);

}); //End of #submit click event handler function



 function displayMoviesCallback(movie) {

  if (movie.Response === 'True'){
  //****Read more about the $.each function
    $.each(movie.Search, function( i, moviePropertie){


        $('#movies').append(function() {

          //START of List Item
          var searchResults =     '<li><div class="poster-wrap">';

          //Checks to see if there is a movie poster image available
          if(moviePropertie.Poster === "N/A"){
            searchResults += '<i class="material-icons poster-placeholder">crop_original</i></div>';
          } else {
            searchResults += '<img class="movie-poster" src=' + moviePropertie.Poster + '></div>';
          }

          searchResults +=          '<span class="movie-title">' + moviePropertie.Title + '</span>' +
                                    '<span class="movie-year">' + moviePropertie.Year + '</span></li>';
          //END of List Item

          return searchResults;
      })
    });

  //If no movie is found from the user query search, show an image that says "No movies found that match: 'search'"
  } else if (movie.Response === 'False'){

   $('#movies').append(function(){

     var noMovieFound = '<li class="no-movies">' +
       '<i class="material-icons icon-help">help_outline</i>No movies found that match: ' + userMovieSearchInput + '</li>';

       return noMovieFound;
   });
  }
}

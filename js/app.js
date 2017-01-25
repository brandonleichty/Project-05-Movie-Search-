'use strict';

//Global variables---->>>>
var userMovieSearchInput;
var userMovieYearInput;

var OMDb_URL = 'http://www.omdbapi.com/?';




//Start of movie search/submit button
$('#submit').on('click', function(event){
  //Look more into specifics of how this works
  event.preventDefault();

  //Set year variable
  userMovieYearInput = $('#year').val();

  $('#descriptionBackground').remove();

  //Clears the search results
  $('#movies').empty();


  //Get user entered movie title and trims it
  userMovieSearchInput = $('#search').val().trim();

  console.log('The submit button event handler is working. User input = ' + userMovieSearchInput);

//Data to be be sent/requested from the OMDb
  var movieDataRequest = {
      s: userMovieSearchInput,
      i: '',
      plot: 'full',
      type: 'movie',
      r: 'json',
      y: userMovieYearInput
    };

    $.getJSON(OMDb_URL, movieDataRequest, displayMoviesCallback);

}); //End of #submit click event handler function





$('ul').on('click', 'li', function(){
  $('#movies').find('li').hide();

  // var html = '<div class="description-background" id="descriptionBackground">' +
  //               '<div class="back-search" id="backSearchLnk">' +
  //                 '<span class="back-search-link"><i class="material-icons">chevron_left</i>Search</span>' +
  //               '</div>' +
  //            '</div>';

    var html =   '<div class="description-background" id="descriptionBackground">' +
                  '<div class="back-search-link back-search" id="backSearchLnk">' +
                    '<i class="material-icons chevron-left">chevron_left</i>Search Results' +
                  '</div>' +
                '<div class="moviePropertieWrap">' +
                    '<div>' + $('#movieTitle').text() + ' (' + $('#movieYear').text() + ')' + '</div>' +

                  '<div>' +
                      '<img src="' + $(this).find('img').attr('src') + '">' +
                  '</div>' +
                '</div>';


               console.log("The movie poster is clicked is: " + $(this).find('img').attr('src'));

  $('#main-header').after(html);

  console.log("THIS WORKED!");
});





$('body').on('click', '#backSearchLnk', function(){
    $('#descriptionBackground').remove();
    console.log("Go back to original search");
    $('#movies').find('li').fadeIn();
});





 function displayMoviesCallback(movie) {

  if (movie.Response === 'True'){
  //****Read more about the $.each function
    $.each(movie.Search, function( i, moviePropertie){

      var imdbHTML = 'http://imdb.com/title/' + moviePropertie.imdbID;

        $('#movies').append(function() {

          //START of List Item
          var searchResults =     '<li><div class="poster-wrap">';

          //Checks to see if there is a movie poster image available
          if(moviePropertie.Poster === "N/A"){
            searchResults += '<i class="material-icons poster-placeholder">crop_original</i></div>';
          } else {
                            //'<a href="' + imdbHTML + '" target="_blank"><img class="movie-poster" src=' + moviePropertie.Poster + '></div></a>';
            searchResults += '<img class="movie-poster" id="#moviePoster" src=' + moviePropertie.Poster + '></div>';
          }

          searchResults +=          '<span class="movie-title" id="movieTitle">' + moviePropertie.Title + '</span>' +
                                    '<span class="movie-year" id="movieYear">' + moviePropertie.Year + '</span></li></a>';
          //END of List Item

          return searchResults;
      });
    });

  //If no movie is found from the user query search, show an image that says "No movies found that match: 'search'"
  } else if (movie.Response === 'False'){

   $('#movies').prepend(function(){

     var noMovieFound = '<li class="no-movies desc">' +
       '<i class="material-icons icon-help">help_outline</i>No movies found that match: ' + userMovieSearchInput + '</li>';

       return noMovieFound;
   });
  }
} //END of displayMoviesCallback

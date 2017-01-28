'use strict';

//***********************//
//Global variables---->>>//
//***********************//

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
          plot: 'full',
          i: '',
          type: 'movie',
          r: 'json',
          y: userMovieYearInput
        };

    $.getJSON(OMDb_URL, movieDataRequest, displayMoviesCallback);

}); //End of #submit click event handler function




$('ul').on('click', 'li', function(){
  $('#movies').find('li').hide();

    var selectedMovie = $(this).attr('imdbTag');

    $.getJSON(OMDb_URL,{i: selectedMovie, plot: 'full' }, function(data) {

      var html =   '<div class="description-background" id="descriptionBackground">' +

                      '<div class="back-search-container back-search">' +
                        '<div class="back-search-link" id="backSearchLnk">' +
                       '<i class="material-icons chevron-left">chevron_left</i>Search Results' +
                       '</div>' +
                      '</div>' +

                       '<div class="descriptionContainer">' +

                        '<div class="posterInfoWrap">' +
                            '<img class="movieDescriptionPoster" src="' + data.Poster + '">' +
                        '</div>' +
                        '<div class="desciptionInfo">' +
                          '<div class="movieDescriptionTitle">' + data.Title + ' (' + data.Year + ')' + '</div>' +

                            '<h3>IMDB Rating ' + data.imdbRating + '</h3>' +
                            '<h4>Plot synopsis:</h4>' +
                            '<div class="movieDescriptionPlot">' + data.Plot + '</div>' +
                            '<h3 class="awards"><i class="material-icons star">star</i>Awards: ' + data.Awards + '</h3>' +
                          '<a class="imdb-link" href="http://www.imdb.com/title/' + data.imdbID + '" target="_blank">View on IMDB</a>' +
                      '</div>' +
                  '</div>';

            //Appends movie description html below the main-header
            $('#main-header').after(html);
        });
});





//When the user clicks "Search Results," the movie description is removed--and the previous seach results are un-hidden
$('body').on('click', '#backSearchLnk', function(){
    $('#descriptionBackground').remove();
    $('#movies').find('li').fadeIn();
});




//Call back for $.getJSON function that gets the required JSON data. This function goes through each movie and appends the proper HTML.
 function displayMoviesCallback(movie) {

  if (movie.Response === 'True'){
  //****Read more about the $.each function
    $.each(movie.Search, function( i, moviePropertie){

      var imdbHTML = 'http://imdb.com/title/' + moviePropertie.imdbID;

        $('#movies').append(function() {

          //START of List Item
          var searchResults =     '<li imdbTag="' + moviePropertie.imdbID + '"><div class="poster-wrap">';

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

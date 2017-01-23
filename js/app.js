//Global variables---->>>>


//Target movie search/submit button
$('#submit').on('click', function(){

  //Get value of user entered search query
  var userSearchText = $('#search').val();

  console.log('The submit button event handler is working. User input =' + userSearchText);

}); //End of #submit click event handler function

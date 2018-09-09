var clearBox = document.querySelector('#movie-input');
clearBox.value = ''

// Build out function to execute when the button is clicked
d3.select('#find-movie-btn').on('click', function(event) {

    //Prevent default activity
    d3.event.preventDefault();

    //Store contents of the search bar in a variable.
    var $movieInput = d3.select('#movie-input').node().value;

    //Print contents of variable to console to verify that the connection works.
    console.log($movieInput);

    //Build query string to giphy api

    //apiKey was obtained from the giphy site after registration.
    //var apiKey = '***INSERT API KEY FROM GIPHY BEFORE RUNNING SCRIPT***';

    var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + $movieInput + '&api_key=' + apiKey;

    //Print query url to console to verify that the url is correct
    console.log(queryUrl);

    //Make API call to the query url and return the json in the response object.
    d3.json(queryUrl, function(error, response) {
        if (error) return console.warn(error);

        //console.log(response);
        //document.write(JSON.stringify(response));

        //Store url of the fixed_height gif in a variable.
        var gifUrl = response['data'][0]['images']['fixed_height']['url'];

        //Print url to the console to verify that the right url is being stored.
        console.log(gifUrl);

        //Append the url the the 'insertImagehere' class.
        d3.select('.insertImagehere').append('img').attr('src', gifUrl);
    });
});

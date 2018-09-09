var movie = "Muppets";
var queryURL = "http://api.giphy.com/v1/gifs/search?q=movies+" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

d3.json(queryURL, function(error, response) {
    if (error) return console.warn(error);

    var responseData = response.data[0].images.fixed_height.url;

    console.log('url', response);

    d3.select('img').attr('src', responseData)

    // document.write(JSON.stringify(response))

});

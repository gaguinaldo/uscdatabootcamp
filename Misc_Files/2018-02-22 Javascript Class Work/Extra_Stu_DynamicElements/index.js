// Adding click event listen listener to all buttons
d3.selectAll("button").on("click", function() {
  // Grabbing and storing the data-animal property value from the button
  var animal = d3.select(this).attr("data-animal");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  d3.json(queryURL, function(error, response) {
  // Handle errors
    if (error) return console.warn(error);

    var results = response.data;
    console.log(results);

    for (var i = 0; i < results.length; i++) {
      var rating = results[i].rating;
      var image = results[i].images.fixed_height.url;

      var animalDiv = d3.select("#gifs-appear-here")
                          .insert("div");

      animalDiv.append("p").text("Rating: " + rating);
      animalDiv.append("img").attr("src", image);

    }
  });
});

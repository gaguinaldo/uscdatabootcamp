// Link HTMl to external app.js file. (Complete)

// Import data.js to app.js file.

// Create a script that dynamically creates a table for each UFO sighting.
// The table should have a column for date/time, city, state, country, shape, and the comments.

// Create an input field in the HTML that, when populated, will dynamically display the with the data on the screen.

// Need to figure out how to dynamically generate a table.
// Need to figure out how to style a table using Bootstrap and CSS.

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

// var tbody = document.querySelector("tbody");
// var dateInput = document.querySelector("#date");
// var searchBtn = document.querySelector("#search");

// searchBtn.addEventListener("click", handleSearchButtonClick);

// // Set filteredUfoData to data initially
// var filteredUfoData = dataSet;

// var dateSelect = '1/1/2010'
var shapeSelect = 'triangle'
// var citySelect = 'los angeles'
// var countrySelect = 'usa'
// var stateSelect = 'ca'

for (var i = 0; i < dataSet.length; i++){
    if (dataSet[i].shape === shapeSelect) {
        var entry = dataSet[i].comments
        console.log(entry)
    }
}


// Next step, print to HTML page instead of console using inner HTML or another method.


/*
    datetime: "1/1/2010",
    city: "el cajon",
    state: "ca",
    country: "us",
    shape: "triangle",
    durationMinutes: "12 minutes",
    comments: "3 Red objects hovering over El Cajon CA"

*/

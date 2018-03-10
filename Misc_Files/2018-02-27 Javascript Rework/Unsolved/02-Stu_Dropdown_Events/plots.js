//This function and data loads when the page is loaded.
function init() {
  var data = [{
    values: [19, 26, 55, 88],
    labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
    type: "pie"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  //Inserts the pie chart into the "pie" id within the HTML.
  Plotly.plot("pie", data, layout);
}

function updatePlotly(newData) {

  /*Plotly.restyle() only updates the trace objects.
  https://community.plot.ly/t/restyle-vs-newplot/2023

  Referencing the DOM does not appear to be needed when doing restyle*/

  //This block of code will also work.

  //var PIE = document.getElementById("pie");

  //The square brackets are important to make the plot work.

  //Plotly.restyle(PIE, 'values', [newData]);


  Plotly.restyle('pie', 'values', [newData])
}

/*
This function stores the data that is loaded when the drop down is selected from the front end.  The function also calls the updatePlotly function that creates the new plot.
*/
function getData(dataset) {

  var data = [];
  switch (dataset) {
    case "usa":
      data = [1, 2, 3, 39];
      break;
    case "france":
      data = [10, 20, 30, 37];
      break;
    case "Italy":
      data = [100, 200, 300, 23];
      break;
  }
  updatePlotly(data);
}

//Load the default graph.
init();

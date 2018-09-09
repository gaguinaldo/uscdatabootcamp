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

  Plotly.plot("pie", data, layout);
}

function updatePlotly(newdata) {
  // YOUR CODE HERE
  // Use `Plotly.restyle` to update the pie chart with the newdata array

    Plotly.restyle('pie', "values", [newdata]);
}


function getData(dataset) {
  // YOUR CODE HERE
  // create a select statement to select different data arrays (YOUR CHOICE)
  // whenever the dataset parameter changes. This function will get called
  // from the dropdown event handler.

  var $data = [];

  switch(dataset) {
    case 'dataset1':
      $data = [20, 25, 76, 10];
      break;
      case 'dataset2':
      $data = [200, 250, 76, 1330];
      break;
    }

    updatePlotly($data);
  }

init();

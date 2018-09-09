
//Define API endpoint.
var apiKey = 'Ft5D_CDzdVNjyfHMzwSg';
var url =
  `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

/*
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} data
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Volume
 */

function unpack(data, index) {
  return data.map(function(row) {
    return row[index];
  });
}

//Makes API call and builds the plot.

function buildPlot() {

    //Make API call and handle the response.  This code does not handle the error.
    Plotly.d3.json(url, function(error, response) {

    // Handle the error, if it is returned by sending a warning to the user.
    if (error) return console.warn(error);

    // Grab values from the response json object to build the trace.
    //These are unique values that don't change.
    var name = response.dataset.name;
    var stock = response.dataset.dataset_code;
    var startDate = response.dataset.start_date;
    var endDate = response.dataset.end_date;

    //Use the unpack function to create an array of the dates and closing prices.
    var dates = unpack(response.dataset.data, 0);
    var closingPrices = unpack(response.dataset.data, 1);

    //Print the closingPrices to the console to verify that the script is working.
    console.log(closingPrices)

    //Define the trace based on the variables that was created. We are making a line graph.
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    //Add in the stock label.
    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

buildPlot();


/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


// Submit Button handler
function handleSubmit() {

    //Prevent default activity
    Plotly.d3.event.preventDefault();

    //Store contents of the search bar in a variable.
    var stockInput = Plotly.d3.select('#stockInput').node().value;

    //Print contents of variable to console to verify that the connection works.
    console.log(stockInput);

  }







// function buildPlot(stock) {
//   var apiKey = "Ft5D_CDzdVNjyfHMzwSg";

//   var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

//   Plotly.d3.json(url, function(error, response) {

//     if (error) return console.warn(error);

//     // Grab values from the response json object to build the plots
//     var name = response.dataset.name;
//     var stock = response.dataset.dataset_code;
//     var startDate = response.dataset.start_date;
//     var endDate = response.dataset.end_date;
//     var dates = unpack(response.dataset.data, 0);
//     var closingPrices = unpack(response.dataset.data, 1);

//     var trace1 = {
//       type: "scatter",
//       mode: "lines",
//       name: name,
//       x: dates,
//       y: closingPrices,
//       line: {
//         color: "#17BECF"
//       }
//     };

//     var data = [trace1];

//     var layout = {
//       title: `${stock} closing prices`,
//       xaxis: {
//         range: [startDate, endDate],
//         type: "date"
//       },
//       yaxis: {
//         autorange: true,
//         type: "linear"
//       }
//     };

//     Plotly.newPlot("plot", data, layout);

//   });
// }

// // Add event listener for submit button
// // @TODO: YOUR CODE HERE

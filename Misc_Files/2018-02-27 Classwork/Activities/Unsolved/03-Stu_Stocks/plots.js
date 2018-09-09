var apiKey = "Ft5D_CDzdVNjyfHMzwSg";

/* global Plotly */
var url =
  `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

/**
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

d3.json(url, function(error, response) {
        if (error) return console.warn(error);

        // console.log(response);
        // document.write(JSON.stringify(response));

        var data = response['dataset']['data'];
    });

function unpack(data, index) {
  return data.map(function(row) {
    return row[index];
  });
}


/**
 * Fetch data and build the timeseries plot
 */
function buildPlot() {
  // @TODO: YOUR CODE HERE

  unpack(data, index)
}

buildPlot();

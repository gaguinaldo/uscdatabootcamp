function unpack(data, index) {
  return data.map(function(row) {
    return row[index];
  });
}

//Clear the search bar when the page is loaded
  Plotly.d3.select("#stockInput").node().value = "";

function plotNewStock() {

  //Prevent default function of the button.
  Plotly.d3.event.preventDefault();

  //Store the string in the search bar in a variable
  var $stockInput = Plotly.d3.select('#stockInput').node().value;

  //Print the contents of the search bar to the console.
  console.log($stockInput);

  var baseUrlFront = 'https://www.quandl.com/api/v3/datasets/WIKI/'
  var baseUrlBack = '.json?start_date=2016-10-01&end_date=2017-10-01&api_key='
  var apiKey = 'Ft5D_CDzdVNjyfHMzwSg';

  var url = (baseUrlFront + $stockInput + baseUrlBack + apiKey)

  console.log(url);

  Plotly.d3.json(url, function(error, response){
  if (error) return console.warn(error)

    //Need to unpack json and create trace and layout.
    var stockName = response['dataset']['name'];
    var stockCode = response['dataset']['dataset_code'];
    var startDate = response['dataset']['start_date'];
    var endDate = response['dataset']['end_date'];

    //Use the unpack function to create an array of the dates and closing prices.
    var dates = unpack(response['dataset']['data'], 0);
    var closingPrices = unpack(response['dataset']['data'], 1);

    // console.log(closingPrices)

  //Create trace.
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: stockName,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

  //Create data list
  var data = [trace1]

  //Create layout
  var layout = {
      title: `${stockName} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    //Create new plot.
    Plotly.newPlot("plot", data, layout);

  })

}


//Use an event listener to call the function upon clicking on the button.
Plotly.d3.select("#submit").on("click", plotNewStock);



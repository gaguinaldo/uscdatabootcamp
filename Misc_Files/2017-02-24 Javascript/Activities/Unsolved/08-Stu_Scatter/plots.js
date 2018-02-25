// YOUR CODE HERE

//Longjump
var trace1 = {

  x: data.year,
  y: data.long_jump,
  mode: 'markers',
  type: 'scatter'
};

var myData = [trace1];

var layout = {

    title: 'Long Jump',
    xaxis: 'Year',
    yaxis: 'Olympic Event'
};

Plotly.newPlot('plot', myData, layout);








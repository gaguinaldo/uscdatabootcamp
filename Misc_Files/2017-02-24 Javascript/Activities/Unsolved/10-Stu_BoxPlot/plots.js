// YOUR CODE HERE
var trace1 = {

    y: data.survival.map(val => Math.sqrt(val)),
    x: data.organ,
    type: 'box'
};

var myData = [trace1];

var layout = {
    title: 'Box Plots With Points'
}

Plotly.newPlot('plot', myData, layout)

// @Theme
const xAxis = [];
const yAxis = [];
const radii = [];
const colors = [];
const UPPER_BOUND = 100;
// Create an x-axis
// Create corresponding y-data w/sizes correlated to x coordinate
// @Objective
for (var x = 0; x < UPPER_BOUND; x++) {
  xAxis.push(x);
  yAxis.push(x);

  // TODO: Change the value below to experiment
  radii.push(Math.random() * x);
  colors.push(`rgb(${x / 100},${x / 10},${x / 1000}`);
}

// @Objective
const data = [{
  x: xAxis,
  y: yAxis,
  mode: "markers",
  marker: {
    size: radii
  }
}];

// @Objective
const layout = {
  title: "Randomly Generated Data",
  showlegend: false,
  height: 1000,
  width: 1000
};

Plotly.newPlot("bubble-target", data, layout);

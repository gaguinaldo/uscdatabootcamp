// @Objective
Plotly.d3.json("https://data.nasa.gov/resource/y77d-th95.json", function(err, rows) {
  // @Helper
  function lat(data) {
    const LAT = 15;

    return parseFloat(data[LAT]);
  }

  // @Helper
  function lon(data) {
    const LON = 16;

    return parseFloat(data[LON]);
  }

  // @TODO @Link
  var latitudes = rows.map(lat);
  var longitudes = rows.map(lon);

  // @Objective
  var data = [{
    type: "scattergeo",
    lon: longitudes,
    lat: latitudes,
    marker: {
      size: 1,
      line: {
        width: 1
      }
    },
    name: "Meteorite Impacts"
  }];

  // @Objective
  var layout = {
    title: "Meteorite Impacts",
    geo: {
      scope: "usa",
      showland: true,
      landcolor: "rgb(242, 240, 247)",
      showlakes: true,
      lakecolor: "white",
      resolution: 50
    }
  };

  // @Objective
  Plotly.newPlot("meteorite-map-target", data, layout);
});

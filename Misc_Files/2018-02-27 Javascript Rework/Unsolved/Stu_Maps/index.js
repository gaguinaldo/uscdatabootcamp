Plotly.d3.json("https://data.nasa.gov/api/views/gh4g-9sfh/rows.json?accessType=DOWNLOAD", function(err, rows) {
  var data = rows.data;

  // Extract latitude information from a "row"
  function lat(data) {
    const LAT = 15;

    return parseFloat(data[LAT]);
  }

  // Extract longitude information from a "row"
  function lon(data) {
    const LON = 16;

    return parseFloat(data[LON]);
  }

  // @TODO: Extract the latitude and longitude from the rows

  // @TODO: Create a `data` object

  // @TODO: Create a `layout` object

  // @TODO: Create a plot in the browser
});

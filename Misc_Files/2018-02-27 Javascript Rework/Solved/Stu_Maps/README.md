# Meteorite Map

This activity requires students to plot the locations of meteorite impacts over a map of Africa. 

## Instructions

To begin, open the [Plotly documentation for scattergeo plots](https://plot.ly/javascript/scatter-plots-on-maps/). You'll be using it a lot!

* To begin, create a JavaScript file adjacent to your `index.html`, called `app.js`.

* Use Plotly to retrieve the JSON data provided at the endpoint: `https://data.nasa.gov/api/views/gh4g-9sfh/rows.json?accessType=DOWNLOAD`

  * You can simply enter this URL in your browser to inspect the data your Plotly application will receive.

* Use the provided `lat` and `lon` helper functions to extract latitude and longitude data from the response data.

* Use the Plotly documentation and your latitude and longitude data to create a `data` object.

* Use the Plotly documentation to create an appropriately formatted `layout` object.

  * Your plot should be centered above Africa.

* Finally, use Plotly and your `data` and `layout` objects to draw a plot on the DOM.

## Hints

* Refer to the [Plotly documentation for scattergeo plots](https://plot.ly/javascript/scatter-plots-on-maps/).

* Refer to the [MDN documentation for map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) when you extract latitude and longitude data.

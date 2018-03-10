

* Demo plot

  * Demo interactivity

* COVER index.html

  * Point out buttons on bottom + call attention to toggling of plot

* COVER plots.js

  * Briefly touch `layout` and `data`

  * Focus on click listener

* COVER click listener details

  * First grab div containing all plots

  * When button clicked, grab ID of button's parent (e.g., which plot trace the button corresponds to)

  * Determine which trace the id corresponds to

  * Determine if the trace is visible (note on toggling booleans with bang operator)

  * Restyle plot after collecting pertinent update data

```js
// Add a click listener to all buttons with class 'hideshow-button'
d3.selectAll(".hideshow").on("click", function() {
  // Grab target div containing plots of all traces
  var myDiv = document.getElementById("myDiv");

  // Grab id indicating which trace the button corresponds to
  var btn_id = this.parentNode.id;

  // Map the button's id/location to the correct data-index
  if (btn_id === "top") {
    var data_index = 0;
  } else (btn_id === "bottom") {
    var data_index = 1;
  }

  // Determine if the selected trace is currently visible
  var visible = myDiv.data[data_index].visible;
  if (visible === undefined) {
    visible = true;
  }

  // Restyle the plot, and toggle visibility (note the use of !)
  Plotly.restyle("myDiv", "visible", !visible, data_index);
});
```

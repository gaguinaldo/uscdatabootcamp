// Data which we will be using to build our chart
var booksReadThisYear = [7, 12, 4, 20];
var colorsList = ['red', 'green', 'yellow', 'black'];

// Append the SVG wrapper to the page, set its height and width, and create a variable which references it
var svg = d3
  .select("#svg-area")
  .append("svg")
  .attr("height", 600)
  .attr("width", 400);


for (var i = 0; i < booksReadThisYear.length; i++) {
    svg
        .append('rect')
        .attr('width', 25)
        .attr('height', booksReadThisYear[i] * 10)
        .attr('x', i * 50)
        .attr('fill', colorsList[i])
};





/*Add code to app.js in order to complete this activity.

Write a for-loop to iterate through each element inside of booksReadThisYear.
Inside of the for loop, append one rectangle inside of the SVG container for each element in booksReadThisYear. Set the rectangle's width to 25 and its height to the value of the element at the current index of booksReadThisYear multiplied by 10. If done correctly so far, you should see what appears to be a single bar on the chart in the browser. This is because each bar is directly on top of the previous bar.
While still inside the for-loop, modify the x attribute of each rectangle so that it is moved to the right a certain amount based on its index in the for-loop.
*/

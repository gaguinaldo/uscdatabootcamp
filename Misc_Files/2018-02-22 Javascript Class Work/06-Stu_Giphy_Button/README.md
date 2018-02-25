## Giphy Button

In this activity, you will use d3 to add a click handler that fetches the latest trending gif from giphy.com.

### Instructions

* Use d3 events to attach a click handler to the button.

* Inside the click handler, complete the following:

    * Use `d3.json` to fetch the latest trending gif.

    * Save the `fixed_height` image url from the response object as a variable.

    * Use `d3.select` to grab a reference to the div with the class `imgGoesHere`.

    * Use d3 to append an image tag to the `imgGoesHere` div tag. Set the image `src` to the url for the `fixed_height` image url obtained from the reponse object.

* Test the page and enjoy your gif!

- - -

### Copyright

Trilogy Education Services © 2017. All Rights Reserved.

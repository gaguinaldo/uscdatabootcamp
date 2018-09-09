renderHTML();

function renderHTML() {
    /* To change the HTML using js, we're going to need to query the DOM and select the 'app' class from the page.

    The 'document' object returns all of the elements of the DOM.

    The 'querySelector' method then searches within all of the elements and finds the 'app' class.

    Therefore, when you write 'document.querySelector('#app')' you are using the document object, and then the querySelector method to find the 'app' class from within the DOM.

    Once you run 'document.querySelector('#app')' you will get all of the HTML associated with that id.

    The document query selector is like `find_all` from beautiful soup in that you return all of the elements assoicated with a given class or id.  Once you have the desired content, you can work with it by modifying the inner HTML.*/

    var app = document.querySelector('#app');

    //Create text string and store in a variable.
    var headingMessage = "The \'document.querySelector\' method";

    //Create text string and store in a variable.
    var paragraphMessage = "The 'document.querySelector' method allows us to get a reference to an element in the DOM and store it into a variable. ";

    //Create text string and store in a variable.
    paragraphMessage += "There are a variety of properties we can set on DOM elements, one of which is called 'innerHTML'. ";

    //Create text string and store in a variable.
    paragraphMessage += "The innerHTML property allows us to update the HTML content of an element.";

    // return paragraphMessage (can be used to return a value from the function.)

    //Once the function returns a value, you can call the function to display the output from the function.
    //console.log(renderHTML())

    //Using the createElement method to create an 'h1' and 'p' tag.
    //https://www.w3schools.com/jsref/met_document_createelement.asp
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    var heading = document.createElement('h1');
    var paragraph = document.createElement('p')

    //Add the noted tags and use innerHTML to create the HTML syntax associated with variable.
    heading.innerHTML = headingMessage;
    paragraph.innerHTML = paragraphMessage;

    //Appends new HTML and associated tags (innerHTML) to the id called 'app'
    //https://www.w3schools.com/jsref/met_node_appendchild.asp
    app.appendChild(heading);
    app.appendChild(paragraph);
}

/******************************
Link and notes:
https://www.youtube.com/watch?v=t90K6HExEJo&list=PL4cUxeGkcC9gfoKa5la9dsdCNpuey2s-V&index=2

https://youtu.be/H63dVFDuJDM
https://youtu.be/SowaJlX1uKA

The DOM is an application programming interface and is used when we want to interact with the webpage.  The DOM is comprised of two components, the document and the objects.

When referring to the document, you are generally referring to the HTML document, but it can refer to either the displayed page or the HTML.

All of the tags used within the HTML is called an object (<head>, <body>, etc.).

The model describes the tree method that relates all of the objects within the documnet.  This is where it becomes important to understand that tag can be nested (i.e., be a child of other tags).  For example, the title tag is a child of the head tag.  In another example, the p tag can be a child of the div tag and a child of the body tag.

HTML
    |__ HEAD
    |   |
    |   |__TITLE
    |
    |
    |__BODY
        |__UL
        |  |__LI
        |  |__LI
        |  |__LI
        |
        |__DIV
            |__P
******************************/

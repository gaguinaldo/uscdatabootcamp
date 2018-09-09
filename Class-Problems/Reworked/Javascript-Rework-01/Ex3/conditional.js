var grantAge = 80;
var loraAge = 90;

var grantHeight = 100;
var loraHeight = 120;

// See more at: https://www.w3schools.com/js/js_comparisons.asp
// '&&' is 'and'
// '||' is 'or'
// '!' is 'not'
// '==' is 'equal to'
// '===' is 'equal to type and value'
// '!=' is 'not equal'
// '!==' is 'not equal to value or not equal type'

//Prints 'Bad' from else-branch.'
if ((loraHeight > 100) && (loraAge < 80)) {
    console.log('Good');
}
else {
    console.log('Bad');
}

//Prints 'Good' from if-branch.'
if ((loraHeight > 100) && (loraAge > 80)) {
    console.log('Good');
}
else {
    console.log('Bad');
}

//Prints 'Good' from if-branch.'
//Take note of the parentheses. There is one around each comparison.
if (((loraHeight > 100) && (loraAge > 80)) || ((grantHeight < 90) && (grantAge > 10))) {
    console.log('Good');
}
else {
    console.log('Bad');
}

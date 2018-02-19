// Difference between prompts and alerts: https://www.w3schools.com/js/js_popup.asp

//This only shows a Window when the script is loaded.
window.alert('This is an alert');

//This only shows a prompt when the script is loaded that asks the user for input.
//The data entered in this prompt is not stored anywhere.
window.prompt('This is a prompt; ');

//If you want to store the data collect from the prompt, you need to assign it to a variable.
var userInput = prompt('What is your age? ');

//Prints out the data collected from the user input to the console.
console.log('The user\'s age is: ' + userInput);

if ((userInput == null) || (userInput == '')) {
    console.log('The user did not enter any information');
}
else {
    console.log('The user\s age is ' + userInput)
}

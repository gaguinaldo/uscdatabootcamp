// 1. Example of Scoping difference. Using "var", the variable is declared at the top of the scope, but initialized with a value at the line it was typed. It is given a value of "undefined" until it is initialized with it's actual value. By comparison, Let/Const are defined and initialized on the same line.

//using var
function logger(){
  console.log(x); // returns "undefined", but code still runs.
  var x = "hi";
}
logger();

// using let
function logger2(){
  console.log(y); // ReferenceError: y is not defined. Code will stop execution.
  let y = "hello"
}
logger2();

// to demo stop of execution
function logger3(){
  var z = "this will never print"
  console.log(z); // Doesn't print since logger2 function stops execution. 
}
logger3();



// 2. Example of const for constant value

//this value is constant, and will refuse attempts at re-assignment.
const myPets = ["dog", "cat", "rabbit", "some endangered species of sea turtle"];

myPets = "ferret"; //This will not work - stops execution

myPets = ["wolf", "giraffe", "parrot"]; //This will not work either


//HOWEVER, we can still manipulate Objects and Arrays! See below example.
console.log("before: ", myPets);
myPets.pop();//FREE THE TURTLES!!!
console.log("after: ", myPets);



// 3. for Each
var arr = [1, 2, 3, 4, 5];




// 4. map - functional programming
var theStagesOfJS = ["denial", "anger", "bargaining", "depression", "acceptance"];


// 5. map vs. forEach



var bestActors = [
  {name: "Nic Cage", age: 54, knownFor: "Con Air"},
  {name: "Keanu Reeves", age: 53, knownFor: "The Matrix"},
  {name: "Betty White", age: 96, knownFor: "Lake Placid"},
  {name: "Patrick Warburton", age: 53, knownFor: "The Tick"}
];


// 6. Arrow Functions

// a.
var multiply1 = function (a, b) {
  return a * b;
}

// Arrow Function Expression
var multiply2 = (a, b) => {
  return a * b;
}

multiply2(2, 3); // 6 - called the same way as usual

// Arrow Function Expression - concise
var multiply3 = (a, b) => a * b;
// without curly brackets, the return statement is implied

// can omit the parenthesis if there's only a single parameter
var square = x => x * x;

//
var princesses = [
  { name: "Rapunzel", age: 18 },
  { name: "Mulan", age: 16 },
  { name: "Anna", age: 18 },
  { name: "Moana", age: 16 }
];


// @TODO: Complete the following:

// log the name of each princess, follow by a colon, followed by their age

// create an array of just the names from the princesses array

// using the `names` array, get only those names that start with an 'M'


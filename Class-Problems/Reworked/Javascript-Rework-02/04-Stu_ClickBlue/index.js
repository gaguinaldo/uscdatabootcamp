//Define variables
var $counter = document.querySelector('.panel h1');
var $increment = document.querySelector('.panel .btn.btn-primary');
var $decrement = document.querySelector('.panel .btn.btn-danger');

//Define event listeners.
$increment.addEventListener('click', functionIncrement)
$decrement.addEventListener('click', functionDecrement)

//Define functions that will run when event listener executes.
var count = 0;
var fontSize = 36;
var colorRedScaleG = 83;
var colorRedScaleB = 79;
var colorBlueScaleG = 122;
var colorBlueScaleB = 183;

renderCount();

//Function to increse by one, and function to decrease by one.

function functionIncrement(){
    count++;
    fontSize +=3;
    colorRedScaleG += 5;
    colorRedScaleB += 5;

    renderCount();
}

function functionDecrement(){
    count--;
    fontSize -=3;
    colorBlueScaleG +=5;
    colorBlueScaleB +=5;

    renderCount();
}

//Function to render the count back to the screen.
function renderCount(){
    $counter.innerText = count;
    $counter.style.fontSize = "" + fontSize + "px";
    $counter.style.color = "rgb(155, 102, 102)";
}

// Red rgb(217, 83, 79);
// Blue rgb(51, 122, 183);

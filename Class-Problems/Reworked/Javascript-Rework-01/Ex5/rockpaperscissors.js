window.alert('Let\'s play rock paper scissors!')

var userChoice = prompt('Choose (r)ock, (p)aper or (s)cissors.')

var computerOption = ['r', 'p', 's']

// Generate random whole number:  https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

var computerChoice = computerOption[Math.round(Math.random() * 2)];

window.alert('The computer choose ' + computerChoice)

//There are nine combinations that exist when determining the winner.

if ((userChoice == 'r') && (computerChoice == 'r')) {
    window.alert('Draw, both players selected Rock');
}

else if ((userChoice == 'r') && (computerChoice == 's')) {
    window.alert('You win!');
}

else if ((userChoice == 'r') && (computerChoice == 'p')) {
    window.alert('You lose!');
}

else if ((userChoice == 's') && (computerChoice == 'r')) {
    window.alert('You lose!');
}

else if ((userChoice == 's') && (computerChoice == 's')) {
    window.alert('Draw, both players selected scissors');
}

else if ((userChoice == 's') && (computerChoice == 'p')) {
    window.alert('You win!');
}

else if ((userChoice == 'p') && (computerChoice == 'r')) {
    window.alert('You win!');
}

else if ((userChoice == 'p') && (computerChoice == 's')) {
    window.alert('You lose');
}

else if ((userChoice == 'p') && (computerChoice == 'p')) {
    window.alert('Draw, both players selected paper');
}

//This is a catch all in case the user does not input the correct choice (either rock, paper or scissors.)
else {
    window.alert('Invalid input');
}

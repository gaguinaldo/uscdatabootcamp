// Array of movie scores
var movieScore = [4.4, 3.3, 5.9, 8.8, 1.2, 5.2, 7.4, 7.5, 7.2, 9.7, 4.2, 6.9];

// Step 1.  Write a for loop to classify each movie.
// Good movies are > 7
// Bad Movies are < 4
// Okay movies are ones that are neither good or bad.
//https://stackoverflow.com/questions/351409/how-to-append-something-to-an-array

//Step 2.  Determine the average score of each movie class.
//Step 3.  Determine the average of all of the movies.

var goodMovies = [];
var okMovies = [];
var badMovies = [];
var total = 0;

for (var i = 0; i < movieScore.length; i++){

    total += movieScore[i]

    if (i > 7) {
        goodMovies.push(movieScore[i]);
    }

    else if (i < 4) {
        badMovies.push(movieScore[i]);
    }

    else {
        okMovies.push(movieScore[i]);
    }
}

// Determines the sum of each list.
//Cannot use a variable twice like in Jupyter notebook.

var goodTotal = 0;
for (var num = 0; num < goodMovies.length; num++) {
    goodTotal += goodMovies[num];
}

var badTotal = 0;
for (var badNum = 0; badNum < badMovies.length; badNum++) {
    badTotal += badMovies[badNum];
}

var okayTotal = 0;
for (var okayNum = 0; okayNum < okMovies.length; okayNum++) {
    okayTotal += okMovies[okayNum];
}

var average = total / movieScore.length;
var goodAverage = goodTotal / goodMovies.length;
var okayAverage = okayTotal / okMovies.length;
var badAverage = badTotal / badMovies.length;

console.log('Average for all movies is: ' + average);
console.log('Average for the good movies is: ' + goodAverage);
console.log('Average for the okay movies is: ' + okayAverage);
console.log('Average for the bad movies is: ' + badAverage);

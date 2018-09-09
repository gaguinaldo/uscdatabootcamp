var name = 'Grant Aguinaldo';
var wage = 8;
var hours = 40;

var name2 = 'Lora Chang';
var wage2 = 100;
var hours2 = 10;

var totalEarningsGrant = (wage * hours);
var totalEarningsLora = (wage2 * hours2);

console.log('---');

// In javascript, you do not need to cast the int to str when concatenating the value in a string.
console.log('My name is ' + name + ' and my total earnings for last week was $' + totalEarningsGrant);

console.log('---');

if (totalEarningsLora > totalEarningsGrant) {
    console.log('Lora Earns More Than Grant -- \'if return\'');
}
else {
    console.log('Grant Earns More Than Lora -- \'else return\'');
}

console.log('---');

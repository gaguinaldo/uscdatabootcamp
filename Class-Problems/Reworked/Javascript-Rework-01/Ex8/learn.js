var languages = {
  name: "Python",
  learn: true,
  weeks: [3, 4, 5, 6]
};

// Allow us to traverse into the array.
// console.log(languages.name);
// console.log(languages.learn);
// console.log('We learn this language in week ' + languages.weeks[2]);


var languagesArray = [
  {
    name: "Python",
    learn: true
  },
  {
    name: "SQL",
    learn: true
  },
  {
    name: "C++",
    learn: false
  }
];

//Traverse the json and store all of the languages in a list.
var languageList = []
for (var i = 0; i < languagesArray.length; i++){
    // var currentLanguage = languagesArray[i]
    languageList.push(languagesArray[i].name);
}

console.log(languageList);

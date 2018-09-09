//Method 1
function renderHTML() {

    // var app = document.querySelector('#todo-list'); searches by 'id'
    // var app = document.querySelector('.todo-list'); searches by 'class'
    var app = document.querySelector('.todo-list');

    var todoText = 'Go to the bank.'
    var listElement = document.createElement('li');
    listElement.innerHTML = todoText;
    app.appendChild(listElement);
}

//Method 2
var todos = [
  {
    complete: false,
    text: "Learn JavaScript"
  },
  {
    complete: false,
    text: "Learn JavaScript Charting"
  },
  {
    complete: false,
    text: "Make Awesome Front-End Projects"
  }
];


function todoList() {
    var app = document.querySelector('.todo-list');

    for (var i = 0; i < todos.length; i++){
        var todoText = todos[i].text;
        var todoListItem = document.createElement('li');
        todoListItem.innerHTML = todoText;
        app.appendChild(todoListItem)
    }
}

//Call methods
todoList()
//renderHTML()

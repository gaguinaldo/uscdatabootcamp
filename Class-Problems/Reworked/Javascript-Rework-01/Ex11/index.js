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

// var removeTodoBtn = document.querySelector('#remove-todo');
// var inputField = document.querySelector('#input-field');

// removeTodoBtn.addEventListener('click', );

// function removeLast(){
//     todos.pop();
//     renderTodos();
// }

// inputField.addEventListener('pointerenter', function() {
//     console.log('Mouse entered');
// });

// inputField.addEventListener('pointerleave', function() {
//     console.log('Mouse left')
// });

function renderTodos() {
    var app = document.querySelector('#todo-list');

    for (var i = 0; i < todos.length; i++){
        var todoText = todos[i].text;
        var todoListItem = document.createElement('li');
        todoListItem.innerHTML = todoText;
        app.appendChild(todoListItem)
    }
}
renderTodos()

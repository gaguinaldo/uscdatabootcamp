
$submitBtn = document.querySelector('#submit');
$name = document.querySelector('#name');
$item = document.querySelector('#item');
$priority = document.querySelector('#priority');
$nonPriority = document.querySelector('#nonPriority');
$perishable = document.querySelector('#perishable');

$submitBtn.addEventListener('click', moveFunction);

clearAll()

function moveFunction(event){

    event.preventDefault();

    var item = $item.value.toLowerCase();

    var listElement = document.createElement('li');
    listElement.innerHTML = item;

    if (item === 'yes') {                               // Regardless of what is entered here, the item will always be listed under Regular.

    $priority.appendChild(listElement);

    }   else {

    $nonPriority.appendChild(listElement);
    };
};

function clearAll(){

    $name.value = '';
    $item.value = '';
    $perishable.value = '';
}

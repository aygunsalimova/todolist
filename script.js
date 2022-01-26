const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const toDoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');

//Event Listeners
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo),
        filter.addEventListener("keyup", filterTodos),
        clearButton.addEventListener("click", clearAllTodos)
}
//clear all todos
function clearAllTodos(e) {
    if (confirm("Are You Want To Delete To Do List?")) {
        while (toDoList.firstElementChild != null) {
            toDoList.removeChild(toDoList.firstElementChild);
        }

        localStorage.removeItem("todos")
    }

    console.log(clearAllTodos)
}


//filter
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display: none !important")
        } else {
            listItem.setAttribute("style", "display: block")
        }
    })
}

//delete todos from screen
function deleteTodo(e) {

    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        showAlert("success", "Todo was deleted succesfully...");
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }

}

//delete todos from storage
function deleteTodoFromStorage(deletetodo) {
    let todos = getTodoFromStorage();

    todos.forEach(function(todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1)
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos))
}


//Get from storage & write to screen
function loadAllTodosToUI() {
    let todos = getTodoFromStorage();

    todos.forEach(function(todo) {
        addTodoUI(todo);
    })
}


//Add a new todo
function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo == "") {
        showAlert("danger", "Please enter a todo!");
    } else {
        addTodoUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "To do added successfully!")
    }
    e.preventDefault();
}

//Get todos from storage
function getTodoFromStorage() {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

//Add todos to storage
function addTodoToStorage(newTodo) {
    let todos = getTodoFromStorage();
    console.log(typeof todos) //STRING????
    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

//Alert
function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} d-flex align-items-center`;
    if (alert.className == 'alert alert-danger d-flex align-items-center') {
        alert.innerHTML = `<i class="fas fa-exclamation-triangle mx-2" style="color: #dc3545;"></i>`;
    } else {
        alert.innerHTML = `<i class="fas fa-exclamation-triangle mx-2" style="color: #198754;"></i>`;
    }
    firstCardBody.appendChild(alert);

    const innerDiv = document.createElement('div');
    innerDiv.textContent = message;
    alert.appendChild(innerDiv);
    console.log(alert);

    setTimeout(() => {
        alert.remove();
    }, 1000);

}

// Creat new Todo section 
function addTodoUI(newTodo) {

    const listItem = document.createElement("li");
    listItem.className = 'list-group-item d-flex justify-content-between';
    listItem.appendChild(document.createTextNode(newTodo));
    toDoList.appendChild(listItem);

    const link = document.createElement('a');
    link.href = '#';
    link.className = 'delete-item';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    listItem.appendChild(link);

    todoInput.value = "";

}
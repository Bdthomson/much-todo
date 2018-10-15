import "./index.css";

var todos = [
    { id: 1, text: "item 1", completed: false },
    { id: 2, text: "item 2", completed: false },
    { id: 3, text: "item 3", completed: true }
];

document.getElementById('todoForm').onsubmit = function (e) {
    e.preventDefault();

    var text = document.getElementById('todoText').value;
    todos.push({ id: guid(), text: text, completed: false });

    console.log("Todos: ", todos)
    var text = document.getElementById('todoText').value = "";
    updateTodos()
}

function getTodoItem(todo, checked) {
    console.log("Todo Text: ", todoText)
    return `
        <input type="checkbox" id="${todo.id}" onClick="toggleDone()" ${checked ? 'checked' : ''}>
        &nbsp; <span>${todo.text}</span>
    `
}

function getTodoItems(todos) {
    return todos
        .filter(t => !t.completed)
        .map(t => {
            return `
                <div style="margin-top:10px">
                    ${getTodoItem(t, false)}
                </div>
            `
        }).join('')
}

//TODO: Make this use ids instead of text
function toggleDone(todoText) {
    todos = todos.filter(t => t == todoText);
    updateTodos()
}

function getCompletedTodoItems(todos) {
    console.log("TODOS: ", todos)
    return todos
        .filter(t => t.completed)
        .map(t => {
            return `
                <div style="margin-top:10px">
                    ${getTodoItem(t, true)}
                </div>
            `
        })
}

function updateTodos() {
    var todoHtml = getTodoItems(todos);
    console.log("TODO HTML: ", todoHtml)
    document.getElementById('todoItems').innerHTML = todoHtml
    document.getElementById('completedItems').innerHTML = getCompletedTodoItems(todos)
}

updateTodos()

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


// function onSubmit() {
//     var todoText = document.getElementById("todoText").value;
//     console.log("Submitted with: ", todoText)
// }

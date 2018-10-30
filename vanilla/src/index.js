import "./index.css";

var todos = [
    { id: 1, text: "item 1", completed: false },
    { id: 2, text: "item 2", completed: false },
    { id: 3, text: "item 3", completed: true }
];


document.getElementById('todoText').addEventListener("keyup", function(e){
    e.preventDefault()
    if (event.keyCode === 13) {
        document.getElementById("addButton").click();
      }
})
document.getElementById('addButton').onclick = addTodo
document.getElementById('completeButton').onclick = completeAllTodos
document.getElementById('uncompleteButton').onclick = uncompleteAllTodos

function getNumTodosLeft() {
    return todos.filter(t => !t.completed).length
}

function completeAllTodos() {
    console.log("Completed")
    todos.forEach(todo => todo.completed = true)
    updateTodos()
}

function uncompleteAllTodos() {
    console.log("Uncompleted")
    todos.forEach(todo => todo.completed = false)
    updateTodos()
}

function deleteTodo(e) {
    var id = e.target.id
    console.log("Called delete todo with id: ", id)
    todos = todos.filter(t => t.id.toString() !== id)
    console.log(todos)
    updateTodos()
}

function updateTodo(e) {
    var id = e.target.id
    console.log("Called update todo with id: ", id)
    todos = todos.filter(t => t.id.toString() !== id)
    console.log(todos)
    updateTodos()
}

function addTodo(e) {
    e.preventDefault()
    var text = document.getElementById('todoText').value;
    if (text !== "") {
        todos.push({ id: guid(), text: text, completed: false });
        var text = document.getElementById('todoText').value = "";
        updateTodos()
    }
}

function toggleTodo(e) {
    var id = e.target.id
    var todo = todos.find(t => t.id.toString() === id)
    todo.completed = !todo.completed
    document.getElementById(id).checked = todo.completed
    updateTodos()
}

function getTodoItem(todo) {
    var todoDisplay = document.createElement('div')
    var text = document.createElement('span')
    text.innerHTML = " " + todo.text
    var inputBox = h('input', {
        id: todo.id,
        type: 'checkbox',
        style: "margin: 10px;"
    }, [])

    inputBox.onclick = toggleTodo
    inputBox.checked = todo.completed

    var deleteButton = h('button', {
        id: todo.id,
        style: "margin: 10px"
    }, [])

    deleteButton.onclick = deleteTodo
    deleteButton.className = 'btn btn-danger'
    deleteButton.innerHTML = " Delete"

    todoDisplay.appendChild(inputBox)
    todoDisplay.appendChild(text)
    todoDisplay.appendChild(deleteButton)

    return todoDisplay
}

const h = (tag, props, children) => {
    var el = document.createElement(tag)
    Object.keys(props).forEach(key => {
        el.setAttribute(key, props[key])
    })

    if (!Array.isArray(children)) {
        children = [children]
    }
    children.forEach(child => el.appendChild(child))

    return el
}

function getTodoItems(todos) {
    return todos
        .filter(t => !t.completed)
        .map(t => h('div', { style: "marginTop:10px" }, getTodoItem(t)))
}
function getCompletedTodoItems(todos) {
    return todos
        .filter(t => t.completed)
        .map(t => h('div', { style: "marginTop:10px" }, getTodoItem(t)))
}

function updateTodos() {
    var todoSelector = document.getElementById('todoItems')
    var todoItems = getTodoItems(todos);
    todoSelector.innerHTML = ""
    todoSelector.appendChild(h('div', {}, todoItems))

    var completedTodoSelector = document.getElementById('completedItems')
    var completedTodoItems = getCompletedTodoItems(todos);
    completedTodoSelector.innerHTML = ""
    completedTodoSelector.appendChild(h('div', {}, completedTodoItems))

    document.getElementById('numTodosLeft').innerHTML = "(" + getNumTodosLeft() + ")"
    document.getElementById('numTodosComplete').innerHTML = "(" + (todos.length - getNumTodosLeft()) + ")"
    console.log(todos)
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
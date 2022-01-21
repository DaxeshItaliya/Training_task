//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");


//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Function
function addTodo(event) {

    // privent from submitting event
    event.preventDefault();

    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create Element
    // ----LI

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    todoInput.value = "";
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // -----Check Button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fa fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // -----Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-delete-left"></i>';
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);

    // Append to Listeners
    todoList.appendChild(todoDiv);

}



function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        //Animation 
        var test =
            todo.classList.add("fall");
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }


    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
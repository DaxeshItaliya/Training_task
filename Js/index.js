// Selector
const todoList = document.getElementById("todoList");
const addTodoBtn = document.getElementById("addTodo");
const infoMessage = document.getElementById("Message");
const todoInput = document.getElementById("todoInput");

var taskList = new Map();


// Event Listner
addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", todoClick);

// Debouncing 
const debouncingInput = function(delay) {
    let timer;
    return function() {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            search(context, args);
        }, delay);
    }
}

todoInput.addEventListener("input", debouncingInput(300));

// Get locat data Data at loading time 
(async function getList() {
    try {
        const List = new Map(await JSON.parse(localStorage.getItem("taskList")));
        taskList = List;
        setItem(taskList);

    } catch (e) {
        console.log(e.message);
    }

})();

// Function
function showMessage() {
    const childCount = document.getElementsByClassName("taskItem").length;

    if (childCount == 0) {
        infoMessage.style.display = "block";
        infoMessage.innerText = "Wlcome on Daxesh Todo application\nPlease add your todo"
    } else {
        infoMessage.style.display = "none";
    }
};

function addTodo() {
    if (todoInput.value == "") {
        alert("Please enter Todo Task");
    } else if (taskList.get(todoInput.value) == 0 || taskList.get(todoInput.value) == 1) {
        alert("Already Exist");
    } else {
        updateStatus(todoInput.value, 0);
        storeData();
        todoInput.value = "";
    }

    // CallBack
    showMessage();
    setItem(taskList);
}

function setItem(List) {
    // Remove all chiled
    todoList.innerHTML = "";
    // Add button disable
    addTodoBtn.disabled = true;

    // set new Child
    List.forEach(function(key, value) {

        // Create Division for todo Item
        const todoItem = document.createElement("div");
        todoItem.classList.add("taskItem");

        // create Check box
        const todoCheck = document.createElement("input");
        todoCheck.type = "checkbox";
        todoCheck.classList.add("completeBtn");

        // create image status
        const todoStatus = document.createElement("img");
        todoStatus.classList.add("taskStatus");
        if (key == 0) {
            todoStatus.src = '/image/icon/pending_icon.svg'
        } else {
            todoCheck.checked = true;
            todoItem.classList.toggle("completed");
            todoStatus.src = '/image/icon/complete_icon.svg'
        }

        // create Todo Task message
        const todoMessage = document.createElement("p");
        todoMessage.innerText = value;
        todoMessage.classList.add("taskMessage");

        // create delete button
        const todoDelete = document.createElement("img");
        todoDelete.classList.add("deleteBtn");
        todoDelete.src = '/image/icon/trash_icon.svg'

        // Append into Division
        todoItem.appendChild(todoCheck);
        todoItem.appendChild(todoStatus);
        todoItem.appendChild(todoMessage);
        todoItem.appendChild(todoDelete);
        todoList.appendChild(todoItem);

    })

    showMessage();

}

function updateStatus(index, status) {
    // status is 1 for completed
    // status is 0 for pendding
    taskList.set(index, status);
    setItem(taskList);

}

function todoClick(event) {
    const target = event.target;
    const item = target.parentElement;
    const task_message = item.getElementsByClassName("taskMessage");

    if (target.classList[0] == "completeBtn") {
        const checkbox = item.getElementsByClassName("completeBtn");
        if (checkbox[0].checked) {
            updateStatus(task_message[0].innerText, 1);
        } else {
            updateStatus(task_message[0].innerText, 0);
        }

    } else if (target.classList[0] == "deleteBtn") {
        taskList.delete(task_message[0].innerText);
        item.classList.remove("taskItem");
        item.style.display = "none";
    }
    storeData();
    showMessage();
}

// Store Data into localstorage
function storeData() {
    localStorage.setItem("taskList", JSON.stringify(Array.from(taskList)));
}



function search() {

    if (todoInput.value != "") {
        var filterList = new Map();
        taskList.forEach(function(value, key) {
            if (key.toLowerCase().startsWith(todoInput.value.toLowerCase())) {
                filterList.set(key, value);
            }
        });
        setItem(filterList);
        if (filterList.size == 0) {
            addTodoBtn.disabled = false;
            infoMessage.innerText = "No Todo Found\nPlease add todo"
        }
    } else {
        setItem(taskList);

    }


}

// Selector
const todoList = document.getElementById("todoList");
const addTodoBtn = document.getElementById("addTodo");
const infoMessage = document.getElementById("Message");
const todoInput = document.getElementById("todoInput");
var animationFlag = 0;
var taskList = [];

// Event Listner
addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", todoClick);

// Debouncing
const debouncingInput = function (delay) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      search(context, args);
    }, delay);
  };
};

todoInput.addEventListener("input", debouncingInput(300));

// Get locat data Data at loading time
(async function getList() {
  try {
    const List = await JSON.parse(localStorage.getItem("taskList"));
    if (List != null) {
      taskList = List;
    }
    setItem(taskList, true);
  } catch (e) {
    console.log(e.message);
  }
})();

// Function
function showMessage() {
  const childCount = document.getElementsByClassName("taskItem").length;

  if (childCount == 0 && todoInput.value.trim().length > 0) {
    infoMessage.style.display = "block";
    infoMessage.innerText = "No Todo Found\nPlease add todo";
  } else if (childCount == 0) {
    infoMessage.style.display = "block";
    infoMessage.innerText =
      "Wlcome on Daxesh Todo application\nPlease add your todo";
  } else {
    infoMessage.style.display = "none";
  }
}

function addTodo() {
  if (todoInput.value.trim() == "") {
    alert("Please enter Todo Task");
  } else {
    animationFlag = 1;
    addTask(todoInput.value.trim(), 0);
    storeData();
    todoInput.value = "";
  }

  // CallBack
  showMessage();
  setItem(taskList, true);
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
    item.classList.add("deleteAnimation");
    item.addEventListener("transitionend", function () {
      deleteTask(task_message[0].innerText);
    });
  }
  storeData();
  showMessage();
}

// Store Data into localstorage
function storeData() {
  localStorage.setItem("taskList", JSON.stringify(Array.from(taskList)));
}

// TAsk Model
function TASK(task_value, task_status) {
  this.task_value = task_value;
  this.task_status = task_status;
}

// Task action
function deleteTask(key) {
  for (let i = 0; i < taskList.length; i++) {
    if (key === taskList[i].task_value) {
      taskList.splice(i, 1);
      break;
    }
  }
  storeData(taskList);
  setItem(taskList, true);
  search();
}

function search() {
  if (todoInput.value.trim() != "") {
    let filterList = [];
    let btnFlag = false;
    addTodoBtn.disabled = false;
    for (let i of taskList) {
      let key = i.task_value;
      if (key.toLowerCase().startsWith(todoInput.value.trim().toLowerCase())) {
        filterList.push(new TASK(i.task_value, i.task_status));
        if (key === todoInput.value.trim()) {
          btnFlag = true;
        }
      }
    }

    setItem(filterList, btnFlag);

    if (filterList.length == 0) {
      addTodoBtn.disabled = false;
      infoMessage.innerText = "No Todo Found\nPlease add todo";
    }
  } else {
    setItem(taskList, true);
  }
}

function updateStatus(task_value, task_status) {
  // status is 1 for completed
  // status is 0 for pendding

  for (let i of taskList) {
    if (i.task_value === task_value) {
      i.task_status = task_status;
    }
  }
  setItem(taskList, true);
}

function addTask(task_value, task_status) {
  taskList.push(new TASK(task_value, task_status));
  storeData(taskList);
  setItem(taskList, true);
}

function setItem(List, btnFlag) {
  // Remove all chiled

  todoList.innerHTML = "";

  // // Add button disable
  if (btnFlag) addTodoBtn.disabled = true;
  else addTodoBtn.disabled = false;
  // set new Child

  for (let i of List) {
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
    if (i.task_status == 0) {
      todoStatus.src = "/image/icon/pending_icon.svg";
    } else {
      todoCheck.checked = true;
      todoItem.classList.toggle("completed");
      todoStatus.src = "/image/icon/complete_icon.svg";
    }

    // create Todo Task message
    const todoMessage = document.createElement("pre");
    todoMessage.innerHTML = i.task_value;
    todoMessage.classList.add("taskMessage");

    // create delete button
    const todoDelete = document.createElement("img");
    todoDelete.classList.add("deleteBtn");
    todoDelete.src = "/image/icon/trash_icon.svg";

    // Append into Division
    todoItem.appendChild(todoCheck);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoMessage);
    todoItem.appendChild(todoDelete);

    if (animationFlag == 1) {
      animationFlag = 0;
      todoItem.style.animation = "fadeIn 0.2s 1 linear";
    }
    todoList.appendChild(todoItem);
  }

  showMessage();
}

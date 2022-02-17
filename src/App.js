import "./App.css";
import AddNewToDo from "./Components/AddNewToDo/AddNewToDo";
import TodoList from "./Components/ToDOList/TodoList";
import { useState } from "react";

function App() {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList"))
  );

  const [btnState, setBtnState] = useState(true);

  const FilterList = (toDoInput) => {
    if (toDoInput.trim() !== "")
      setTaskList((previousList) => {
        let taskList = [];
        let btnFlag = false;
        for (let item of previousList) {
          if (item.task_value === toDoInput) {
            btnFlag = true;
          }
          if (
            item.task_value.toLowerCase().startsWith(toDoInput.toLowerCase())
          ) {
            taskList.push(item);
          }
        }
        setBtnState(btnFlag);
        return taskList;
      });
    else {
      setBtnState(true);
      setTaskList(JSON.parse(localStorage.getItem("taskList")));
    }
  };

  const addTodoHandler = (newToDo) => {
    setTaskList(JSON.parse(localStorage.getItem("taskList")));
    setTaskList((previousTodo) => {
      console.log(previousTodo);
      let newList = [...previousTodo, newToDo];
      localStorage.setItem("taskList", JSON.stringify(Array.from(newList)));
      return newList;
    });
  };

  const completeTodoHandler = (index) => {
    if (taskList[index - 1].task_status === 1)
      taskList[index - 1].task_status = 0;
    else taskList[index - 1].task_status = 1;
    console.log("After", taskList[index - 1].task_status);
    console.log("After", taskList);
    localStorage.setItem("taskList", JSON.stringify(Array.from(taskList)));

    setTaskList([...taskList]);
  };

  const deleteTodoHandler = (index) => {
    taskList.splice(index - 1, 1);
    localStorage.setItem("taskList", JSON.stringify(Array.from(taskList)));
    setTaskList([...[...taskList]]);
  };

  const toDoChangeHandler = () => {};

  console.log(taskList);

  return (
    <>
      <AddNewToDo
        onAddNewToDo={addTodoHandler}
        onFilter={FilterList}
        TaskList={taskList}
        BtnState={btnState}
      />
      <TodoList
        TaskList={taskList}
        todoChange={toDoChangeHandler}
        onDeleteTask={deleteTodoHandler}
        onCompleteTask={completeTodoHandler}
      />
    </>
  );
}

export default App;

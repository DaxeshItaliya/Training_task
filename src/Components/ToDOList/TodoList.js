import React from "react";
import "./ToDoList.css";
import pending_icon from "../../icons/pending_icon.svg";
import completed_icon from "../../icons/complete_icon.svg";
import trash_icon from "../../icons/trash_icon.svg";

export default function TodoList(props) {
  const toDoCompleteHandler = (event) => {
    props.onCompleteTask(event.target.parentElement.parentElement.id);
    // console.log();
  };

  const OnTrashClick = (event) => {
    props.onDeleteTask(event.target.parentElement.parentElement.id);
  };
  let index = 0;
  return (
    <section id="taskList">
      <div className="container">
        <h1>Todo List</h1>
        <div id="todoList">
          {props.TaskList.map((todo) => {
            ++index;
            return (
              <div id={index} key={index}>
                <div
                  className={`taskItem ${
                    todo.task_status === 1 ? "completed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="completeBtn"
                    onChange={toDoCompleteHandler}
                    checked={todo.task_status === 1 ? "checked" : ""}
                  />
                  <img
                    className="taskStatus"
                    src={todo.task_status === 1 ? completed_icon : pending_icon}
                    alt="status"
                  />
                  <pre className="taskMessage">{todo.task_value}</pre>
                  <img
                    onClick={OnTrashClick}
                    className="deleteBtn"
                    src={trash_icon}
                    alt="status"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {props.TaskList.length === 0 ? <p id="Message">No Todo Found</p> : null}
      </div>
    </section>
  );
}

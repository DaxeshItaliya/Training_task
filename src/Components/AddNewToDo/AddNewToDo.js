import React, { useState } from "react";
import tag from "../../icons/tag.svg";
import white_add_icon from "../../icons/white_add_icon.svg";
import "./AddNewTodo.css";

export default function AddNewToDo(props) {
  const [toDo, setToDo] = useState("");

  const toDoInputHandler = (event) => {
    let toDoInput = event.target.value;
    setToDo(toDoInput);
    props.onFilter(toDoInput);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    props.onAddNewToDo({ task_status: 0, task_value: toDo });
    setToDo("");
  };

  return (
    <section id="addTask">
      <form className="container" onSubmit={formSubmitHandler}>
        <div id="task_input">
          <img className="icon" src={tag} alt="logo" />
          <input
            id="todoInput"
            type="text"
            value={toDo}
            onInput={toDoInputHandler}
            placeholder="What needs to be done?"
          />
        </div>

        <button disabled={props.BtnState} id="addTodo">
          <img className="icon" src={white_add_icon} alt="Add" /> Add
        </button>
      </form>
    </section>
  );
}

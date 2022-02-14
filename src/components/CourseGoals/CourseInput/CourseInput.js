import React, { useState } from "react";
import style from "styled-components";

import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const FormController = style.div`
  margin: 0.5rem 0;

& label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color:${(props) => (props.isEntered ? "black" : "#ff0000")};
}

& input {
  display: block;
  width: 100%;
  border: 1px solid ${(props) => (props.isEntered ? "#ccc" : "#ff0000")};
  font: inherit;
  background:${(props) =>
    props.isEntered ? "transparent" : "hsl(0, 100%, 92%)"};
  line-height: 1.5rem;
  padding: 0 0.25rem;
}

& input:focus {
  outline: none;
  background: #fad0ec;
  border-color: #8b005d;
}

`;

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isEntered, setEntered] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setEntered(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setEntered(false);
      return;
    }
    props.onAddGoal(enteredValue);
    setEnteredValue("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <FormController isEntered={isEntered}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </FormController>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;

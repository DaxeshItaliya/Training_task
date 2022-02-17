import React from "react";
import Classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={Classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;

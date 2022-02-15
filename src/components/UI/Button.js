import React from "react";
import "./Button.css";

export default function Button(props) {
  const classes = "button " + props.className;

  const onClickHandler = () => {
    props.onClick();
  };

  return (
    <button onClick={onClickHandler} className={classes}>
      {props.children}
    </button>
  );
}

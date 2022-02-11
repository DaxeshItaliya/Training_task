import React, { useState } from "react";
import "./ExpenseItem.css";
import Card from "./Card";
import ExpenseDate from "./ExpenseDate";

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);
  let i = 1;
  const Update = () => {
    setTitle("Update" + ++i);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
        <button onClick={Update}>Click me</button>
      </div>
    </Card>
  );
}

export default ExpenseItem;

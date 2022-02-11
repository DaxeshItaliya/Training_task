import "./ExpenseForm.css";
import React, { useState } from "react";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const onChangeTitle = (event) => {
    setEnteredTitle(event.target.value);
  };

  const onChangeAmount = (event) => {
    setEnteredAmount(event.target.value);
  };

  const onChangeDate = (event) => {
    setEnteredDate(event.target.value);
  };

  const NewEntry = {
    title: enteredTitle,
    amount: enteredAmount,
    date: new Date(enteredDate),
  };
  const print = (event) => {
    event.preventDefault();
    props.onSaveExpenseData(NewEntry);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={print}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input onChange={onChangeTitle} type="text" value={enteredTitle} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            onChange={onChangeAmount}
            type="number"
            min="0.1"
            setup="0.01"
            value={enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            onChange={onChangeDate}
            type="date"
            min="2020-01-01"
            max="2022-12-31"
            value={enteredDate}
          />
        </div>
      </div>
      <div className="new-expense__actions ">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseForm;

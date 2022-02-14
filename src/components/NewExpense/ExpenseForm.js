import "./ExpenseForm.css";
import React, { useState } from "react";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const onChangeTitle = (event) => {
    setEnteredTitle(event.target.value.trim());
  };

  const onChangeAmount = (event) => {
    setEnteredAmount(event.target.value.trim());
  };

  const onChangeDate = (event) => {
    setEnteredDate(event.target.value.trim());
  };

  const NewEntry = {
    title: enteredTitle,
    amount: +enteredAmount,
    date: new Date(enteredDate),
  };

  const print = (event) => {
    console.log(event.target);
    event.preventDefault();
    if (
      enteredTitle.trim() !== "" &&
      enteredAmount.trim() !== "" &&
      enteredDate.trim() !== ""
    ) {
      props.onSaveExpenseData(NewEntry);
      props.onFormCancel();
      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
    }
  };

  const cancel = (event) => {
    event.preventDefault();
    props.onFormCancel();
  };

  return (
    <form onSubmit={print}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>
            Title
            {enteredTitle.trim() === "" ? (
              <span className="Warning"> This Field is Required</span>
            ) : null}
          </label>
          <input onChange={onChangeTitle} type="text" value={enteredTitle} />
        </div>
        <div className="new-expense__control">
          <label>
            Amount
            {enteredAmount.trim() === "" ? (
              <span className="Warning"> This Field is Required</span>
            ) : null}
          </label>
          <input
            onChange={onChangeAmount}
            type="number"
            value={enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label>
            Date
            {enteredDate.trim() === "" ? (
              <span className="Warning"> This Field is Required</span>
            ) : null}
          </label>
          <input
            onChange={onChangeDate}
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
          />
        </div>
      </div>
      <div className="new-expense__actions ">
        <button type="cancel" onClick={cancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseForm;

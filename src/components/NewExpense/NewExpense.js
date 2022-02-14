import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import React, { useState } from "react";

function NewExpense(pops) {
  const [flag, setFlag] = useState(0);
  const storeExpenseData = (Expense) => {
    const newData = {
      ...Expense,
      id: Math.random().toString(),
    };
    pops.onNewDataAdded(newData);
  };

  const AddNewExpenseClick = () => {
    setFlag(1);
  };

  const formCancel = () => {
    setFlag(0);
  };

  return (
    <div className="new-expense">
      {flag === 0 ? (
        <button onClick={AddNewExpenseClick}>Add New Expense</button>
      ) : (
        <ExpenseForm
          onSaveExpenseData={storeExpenseData}
          onFormCancel={formCancel}
        />
      )}
    </div>
  );
}

export default NewExpense;

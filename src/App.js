import Expense from "./components/Expenses/Expense";
import "./App.css";
import NewExpense from "./components/NewExpense/NewExpense";
import React, { useState } from "react";

function App() {
  let expense = [
    {
      id: "e1",
      title: "Car Expense",
      date: new Date(2022, 1, 1),
      amount: "300",
    },
    {
      id: "e2",
      title: "Bike Expense",
      date: new Date(2022, 1, 10),
      amount: "400",
    },
    {
      id: "e3",
      title: "BAnk Expense",
      date: new Date(2022, 1, 20),
      amount: "500",
    },
    {
      id: "e4",
      title: "Tour Expense",
      date: new Date(2022, 1, 30),
      amount: "600",
    },
  ];

  let [expenseList, setExpense] = useState(expense);
  console.log(expenseList);
  const addData = (newEntry) => {
    console.log(newEntry);
    expenseList.push(newEntry);
    setExpense(expenseList);
  };

  return (
    <div className="App">
      <NewExpense onNewDataAdded={addData} />
      <Expense item={expenseList} />
    </div>
  );
}

export default App;
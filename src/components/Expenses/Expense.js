import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "../ExpenseFilter/ExpensesFilter ";
import Card from "./Card";
import "./Expense.css";
import React, { useState } from "react";

function Expense(props) {
  const [filterYear, setFilterYear] = useState("All");

  const selectYearHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };
  return (
    <Card className="expense">
      <ExpensesFilter selected={filterYear} onYearChange={selectYearHandler} />
      {props.ExpensesItems.map((expense) => {
        if (
          filterYear === "All" ||
          expense.date.toISOString().includes(filterYear)
        )
          return (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              date={expense.date}
              amount={expense.amount}
            />
          );
      })}
    </Card>
  );
}
export default Expense;

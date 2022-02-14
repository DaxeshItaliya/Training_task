import ExpensesFilter from "../ExpenseFilter/ExpensesFilter ";
import Card from "./Card";
import "./Expense.css";
import React, { useState } from "react";
import ExpensesList from "./ExpensesList";

function Expense(props) {
  const [filterYear, setFilterYear] = useState("All");

  const selectYearHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };

  return (
    <Card className="expense">
      <ExpensesFilter selected={filterYear} onYearChange={selectYearHandler} />
      <ExpensesList Year={filterYear} List={props.ExpensesItems} />
    </Card>
  );
}
export default Expense;

import ExpensesFilter from "../ExpenseFilter/ExpensesFilter ";
import Card from "./Card";
import "./Expense.css";
import React, { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpenseChart from "./ExpenseChart";

function Expense(props) {
  const [filterYear, setFilterYear] = useState("All");

  const selectYearHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };

  const FilterList = props.ExpensesItems.filter((expense) => {
    return (
      filterYear === "All" || expense.date.toISOString().includes(filterYear)
    );
  });
  console.log(FilterList);
  return (
    <Card className="expense">
      <ExpensesFilter selected={filterYear} onYearChange={selectYearHandler} />
      <ExpenseChart expenses={FilterList} />
      <ExpensesList Year={filterYear} List={FilterList} />
    </Card>
  );
}
export default Expense;

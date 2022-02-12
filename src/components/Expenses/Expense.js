import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "../ExpenseFilter/ExpensesFilter ";
import Card from "./Card";
import "./Expense.css";
import React, { useState } from "react";

function Expense(prop) {
  const [filterYear, setFilterYear] = useState("2020");

  const selectYearHandler = (selecedYear) => {
    console.log(selecedYear);
    setFilterYear(selecedYear);
  };

  return (
    <Card className="expense">
      <ExpensesFilter selected={filterYear} onYearChange={selectYearHandler} />
      <ExpenseItem
        title={prop.item[0].title}
        date={prop.item[0].date}
        amount={prop.item[0].amount}
      ></ExpenseItem>

      <ExpenseItem
        title={prop.item[1].title}
        date={prop.item[1].date}
        amount={prop.item[1].amount}
      ></ExpenseItem>

      <ExpenseItem
        title={prop.item[2].title}
        date={prop.item[2].date}
        amount={prop.item[2].amount}
      ></ExpenseItem>

      <ExpenseItem
        title={prop.item[3].title}
        date={prop.item[3].date}
        amount={prop.item[3].amount}
      ></ExpenseItem>
    </Card>
  );
}
export default Expense;

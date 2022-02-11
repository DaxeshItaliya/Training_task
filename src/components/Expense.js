import ExpenseItem from "./ExpenseItem";
import "./Expense.css";

function Expense(prop) {
  return (
    <div className="expense">
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
    </div>
  );
}
export default Expense;

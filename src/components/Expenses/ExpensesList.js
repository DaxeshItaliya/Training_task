import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
  if (props.List.length === 0) {
    return <p className="expenses-list__fallback">No Data Found</p>;
  }

  return (
    <ul className="expenses-list">
      {props.List.map((expense) => {
        return (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            date={expense.date}
            amount={expense.amount}
          />
        );
      })}
    </ul>
  );
};

export default ExpensesList;

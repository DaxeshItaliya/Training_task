import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
  console.log(props.List);
  console.log(props.Year);
  let flag = 1;

  return (
    <ul className="expenses-list">
      {props.List.map((expense) => {
        console.log(
          props.Year === "All" ||
            expense.date.toISOString().includes(props.Year)
        );
        if (
          props.Year === "All" ||
          expense.date.toISOString().includes(props.Year)
        ) {
          flag = 0;
          return (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              date={expense.date}
              amount={expense.amount}
            />
          );
        }
      })}
      {flag === 1 ? (
        <p className="expenses-list__fallback">No Data Found</p>
      ) : null}
    </ul>
  );
};

export default ExpensesList;

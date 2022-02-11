import ExpenseItem from "./components/ExpenseItem";
import "./App.css";

function App() {
  const expense = [
    {
      title: "Car Expense",
      date: new Date(2022, 1, 1),
      amount: "300",
    },
    {
      title: "Bike Expense",
      date: new Date(2022, 1, 10),
      amount: "400",
    },
    {
      title: "BAnk Expense",
      date: new Date(2022, 1, 20),
      amount: "500",
    },
    {
      title: "Tour Expense",
      date: new Date(2022, 1, 30),
      amount: "600",
    },
  ];
  return (
    <div className="App">
      <ExpenseItem
        title={expense[0].title}
        date={expense[0].date}
        amount={expense[0].amount}
      ></ExpenseItem>

      <ExpenseItem
        title={expense[1].title}
        date={expense[1].date}
        amount={expense[1].amount}
      ></ExpenseItem>

      <ExpenseItem
        title={expense[2].title}
        date={expense[2].date}
        amount={expense[2].amount}
      ></ExpenseItem>

      <ExpenseItem
        title={expense[3].title}
        date={expense[3].date}
        amount={expense[3].amount}
      ></ExpenseItem>
    </div>
  );
}

export default App;

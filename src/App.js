import Expense from "./components/Expense";
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
      <Expense item={expense} />
    </div>
  );
}

export default App;

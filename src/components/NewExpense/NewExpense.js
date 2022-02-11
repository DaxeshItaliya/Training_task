import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

function NewExpense(pops) {
  const storeExpenseData = (Expense) => {
    const newData = {
      ...Expense,
      id: Math.random().toString(),
    };
    pops.onNewDataAdded(newData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={storeExpenseData} />
    </div>
  );
}

export default NewExpense;

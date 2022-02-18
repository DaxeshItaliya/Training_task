import React, { useContext } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const AddItemHandler = (event) => {
    event.preventDefault();
    const itemAmount = +event.target.children[0].children[1].value;
    if (itemAmount < 1 || itemAmount > 5) {
      return;
    }
    props.onSubmit(itemAmount);
  };

  return (
    <form id={props.id} onSubmit={AddItemHandler} className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;

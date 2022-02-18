import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const ctx = useContext(CartContext);

  const addToCart = (itemAmount) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: itemAmount,
      price: props.price,
    });
  };

  return (
    <li id={props.id} className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onSubmit={addToCart} />
      </div>
    </li>
  );
};

export default MealItem;

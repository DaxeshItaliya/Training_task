import React from "react";
import Model from "../UI/Model";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  const closeCart = () => {
    props.onBack();
  };

  return (
    <Model>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button onClick={closeCart} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Model>
  );
};

export default Cart;

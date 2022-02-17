import React, { useContext } from "react";
import CartContext from "../store/cart-context";
import CardIcon from "./CartIcon";
import classes from "./HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
  // const ctx = useContext(CartContext);
  // const numberOfCartItem = ctx;

  return (
    <button onClick={props.btnCLick} className={classes.button}>
      <span>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCardButton;

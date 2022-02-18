import React, { useContext, useEffect, useState } from "react";
import CartContext from "../store/cart-context";
import CardIcon from "./CartIcon";
import classes from "./HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
  const [isBtnHighlighted, setBtnIsHighlighted] = useState(false);
  const ctx = useContext(CartContext);
  const umberOfCartItem = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${
    isBtnHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (ctx.items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button onClick={props.btnCLick} className={btnClasses}>
      <span>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{umberOfCartItem}</span>
    </button>
  );
};

export default HeaderCardButton;

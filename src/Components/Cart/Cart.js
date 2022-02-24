import React, { Fragment, useContext, useState } from "react";
import CartContext from "../store/cart-context";
import Model from "../UI/Model";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);

  const cartItemRemoveHandler = (index) => {
    ctx.removeItem(index);
  };
  const cartItemAddHandler = (item) => {
    console.log(item);
    ctx.addItem({ ...item, amount: 1 });
  };

  console.log(ctx.items);
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItem = ctx.items.length > 0;
  const checkOutHandler = () => setCheckout(true);
  const checkOutCancel = () => setCheckout(false);

  const closeCart = () => {
    props.onBack();
  };

  const ActionButton = (
    <Fragment>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={closeCart} className={classes["button--alt"]}>
          Close
        </button>
        {hasItem && (
          <button onClick={checkOutHandler} className={classes.button}>
            Order
          </button>
        )}
      </div>
    </Fragment>
  );

  return (
    <Model>
      {!checkout && cartItem}
      {!checkout && ActionButton}
      {checkout && (
        <Checkout onCancel={checkOutCancel} onClose={props.onBack} />
      )}
    </Model>
  );
};

export default Cart;

import React from "react";

const CartContext = React.createContext({
  items: new Map(),
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});
export default CartContext;

import React from "react";

const CartContext = () => {
  console.log("hiTesting");
  return React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
  });
};
export default CartContext;

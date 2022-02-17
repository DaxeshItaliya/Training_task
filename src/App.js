import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Components/store/CartProvider";

function App() {
  const [cartIsSown, setCartIsShown] = useState(false);

  const setCartInvisible = () => {
    console.log("Gone");
    setCartIsShown(false);
  };

  const setCartVisible = () => {
    console.log("Visible");
    setCartIsShown(true);
  };

  return (
    <CartProvider>
      {cartIsSown ? <Cart onBack={setCartInvisible} /> : ""}
      <Header onMyCartClick={setCartVisible} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

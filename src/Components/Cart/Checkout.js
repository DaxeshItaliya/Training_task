import useValidator from "../../Hooks/use-validation";
import classes from "./Checkout.module.css";
import useHttp from "../../Hooks/use-http";
import { Fragment, useContext, useState } from "react";
import CartContext from "../store/cart-context";

const Checkout = (props) => {
  const name = useValidator((value) => value.trim() !== "");
  const street = useValidator((value) => value.trim() !== "");
  const postalCode = useValidator((value) => value.trim().length === 6);
  const city = useValidator((value) => value.trim() !== "");
  const ctx = useContext(CartContext);
  const sendData = useHttp();
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const FormSubmitted = (data) => {
    console.log(data);
    if (sendData.error === null) setFormSubmitted(true);
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    name.blurHandler();
    street.blurHandler();
    postalCode.blurHandler();
    city.blurHandler();
    console.log(
      "Chek",
      !name.isValid || !street.isValid || !postalCode.isValid || !city.isValid
    );
    if (
      !name.isValid ||
      !street.isValid ||
      !postalCode.isValid ||
      !city.isValid
    ) {
      return;
    }

    sendData.sendRequest(
      {
        url: "https://react-757fa-default-rtdb.firebaseio.com/Order.json",
        method: "POST",
        body: {
          details: {
            name: name.value,
            street: street.value,
            postalCode: postalCode.value,
            order: ctx.items,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      FormSubmitted
    );
  };

  if (sendData.isLoading) {
    return <p>Sending Data To FireBase</p>;
  }

  if (sendData.error !== null) {
    return (
      <Fragment>
        <p>SomeThing Went Wrong {sendData.error}</p>
        <button type="button" onClick={props.onCancel}>
          Close
        </button>
      </Fragment>
    );
  }

  if (isFormSubmitted) {
    ctx.clearCart();
    return (
      <Fragment>
        <p>Form Submitted Successfully</p>
        <button
          className={classes.submit}
          type="button"
          onClick={props.onClose}
        >
          Close
        </button>
      </Fragment>
    );
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label className={name.hasError ? classes.invalid : ""} htmlFor="name">
          Your Name
        </label>
        <input
          value={name.value}
          onChange={name.changeHandler}
          onBlur={name.blurHandler}
          type="text"
          id="name"
        />
        {name.hasError && (
          <p className={classes.invalid}>Please Enter Valid Input</p>
        )}
      </div>
      <div className={classes.control}>
        <label
          className={street.hasError ? classes.invalid : ""}
          htmlFor="street"
        >
          Street
        </label>
        <input
          value={street.value}
          onChange={street.changeHandler}
          onBlur={street.blurHandler}
          type="text"
          id="street"
        />
        {street.hasError && (
          <p className={classes.invalid}>Please Enter Valid Input</p>
        )}
      </div>

      <div className={classes.control}>
        <label
          className={postalCode.hasError ? classes.invalid : ""}
          htmlFor="postal"
        >
          Postal Code
        </label>
        <input
          value={postalCode.value}
          onChange={postalCode.changeHandler}
          onBlur={postalCode.blurHandler}
          type="text"
          id="postal"
        />
        {postalCode.hasError && (
          <p className={classes.invalid}>Please Enter Valid Input</p>
        )}
      </div>
      <div className={classes.control}>
        <label className={city.hasError ? classes.invalid : ""} htmlFor="city">
          City
        </label>
        <input
          value={city.value}
          onChange={city.changeHandler}
          onBlur={city.blurHandler}
          type="text"
          id="city"
        />
        {city.hasError && (
          <p className={classes.invalid}>Please Enter Valid Input</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

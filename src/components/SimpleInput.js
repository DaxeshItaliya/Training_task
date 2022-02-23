import { useState } from "react";

const SimpleInput = (props) => {
  // Field value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Field Touch
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  // Field value Validation
  const nameIsValid = name.trim() !== "";
  const emailIsValid =
    email.trim() !== "" &&
    email.trim().includes("@") &&
    email.trim().includes(".");

  // Field Validation on blur
  const nameInputIsValid = !nameIsValid && nameIsTouched;
  const emailInputIsValid = !emailIsValid && emailIsTouched;

  // Form Validation
  let formIsValid = false;

  if (nameInputIsValid && emailInputIsValid) {
    formIsValid = true;
  }

  //On Field Change Update
  const nameInputCHangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailInputCHangeHandler = (event) => {
    setEmail(event.target.value);
  };

  //On Field blur Update
  const nameInputBlurHandler = () => {
    setNameIsTouched(true);
  };
  const emailInputBlurHandler = () => {
    setEmailIsTouched(true);
  };

  //On Form Submit
  const formSubmitHandler = (event) => {
    event.preventDefault();
    setNameIsTouched(true);
    setEmailIsTouched(true);

    if (!nameIsValid || !emailIsValid) return;

    // Reset position
    console.log("Submitted");
    setName("");
    setEmail("");
    setNameIsTouched(false);
    setEmailIsTouched(false);
  };

  const nameInputClasses = nameInputIsValid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          onInput={nameInputCHangeHandler}
          onBlur={nameInputBlurHandler}
          id="name"
          value={name}
        />
      </div>
      {!nameIsValid && nameIsTouched && (
        <p className="error-text">Please Enter Valid Input</p>
      )}

      <div className={nameInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          onInput={emailInputCHangeHandler}
          onBlur={emailInputBlurHandler}
          id="email"
          value={email}
        />
      </div>
      {!emailIsValid && emailIsTouched && (
        <p className="error-text">Please Enter Valid Input</p>
      )}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

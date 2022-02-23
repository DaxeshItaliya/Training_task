import useValidator from "../Hooks/use-validator";

const SimpleInput = (props) => {
  const {
    value: name,
    inputIsValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputCHangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useValidator((value) => value.trim() !== "");

  const {
    value: email,
    inputIsValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputCHangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useValidator(
    (value) =>
      value.trim() !== "" &&
      value.trim().includes("@") &&
      value.trim().includes(".")
  );

  // Form Validation
  let formIsValid = false;
  if (nameIsValid && emailIsValid) {
    formIsValid = true;
  }

  //On Form Submit
  const formSubmitHandler = (event) => {
    event.preventDefault();
    nameInputBlurHandler();
    emailInputBlurHandler();
    if (!formIsValid) return;

    // Reset position
    console.log("Submitted");
    nameReset();
    emailReset();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
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
      {nameInputHasError && (
        <p className="error-text">Please Enter Valid Input</p>
      )}

      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          onInput={emailInputCHangeHandler}
          onBlur={emailInputBlurHandler}
          id="email"
          value={email}
        />
      </div>
      {emailInputHasError && (
        <p className="error-text">Please Enter Valid Input</p>
      )}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

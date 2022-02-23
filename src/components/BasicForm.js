import useValidator from "../Hooks/use-validator";

const BasicForm = (props) => {
  const fname = useValidator((value) => value.trim() !== "");
  const lname = useValidator((value) => value.trim() !== "");
  const email = useValidator(
    (value) =>
      value.trim() !== "" &&
      value.trim().includes("@") &&
      value.trim().includes(".")
  );

  const formIsValid = fname.isValid && lname.isValid && email.isValid;

  console.log(fname);
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    console.log("Submitted");
    fname.reset();
    lname.reset();
    email.reset();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div
          className={!fname.hasError ? "form-control" : "form-control invalid"}
        >
          <label htmlFor="name">First Name</label>
          <input
            value={fname.value}
            onChange={fname.changeHandler}
            onBlur={fname.blurHandler}
            type="text"
            id="name"
          />
        </div>
        <div
          className={!lname.hasError ? "form-control" : "form-control invalid"}
        >
          <label htmlFor="name">Last Name</label>
          <input
            value={lname.value}
            onChange={lname.changeHandler}
            onBlur={lname.blurHandler}
            type="text"
            id="name"
          />
        </div>
      </div>
      <div
        className={!email.hasError ? "form-control" : "form-control invalid"}
      >
        <label htmlFor="name">E-Mail Address</label>
        <input
          value={email.value}
          onChange={email.changeHandler}
          onBlur={email.blurHandler}
          type="email"
          id="name"
        />
      </div>
      <div className="form-actions">
        <button
          className={formIsValid ? "" : "disabled"}
          disabled={!formIsValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;

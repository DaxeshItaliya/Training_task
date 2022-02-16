import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT")
    return { value: action.value, isValid: action.value.trim().includes("@") };

  if (action.type === "INPUT_BLUR")
    return { value: state.value, isValid: state.value.trim().includes("@") };

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT")
    return { value: action.value, isValid: action.value.trim().length > 6 };

  if (action.type === "INPUT_BLUR")
    return { value: state.value, isValid: state.value.trim().length > 6 };

  return { value: "", isValid: false };
};

const Login = () => {
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  useEffect(() => {
    const debouncing = setTimeout(() => {
      console.log("API CAll");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(debouncing);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT",
      value: event.target.value,
    });
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "INPUT_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) ctx.onLogIn(emailState.value, passwordState.value);
    else if (!emailState.isValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          type="email"
          id="email"
          label="Email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}
        />

        <Input
          ref={passwordRef}
          type="password"
          id="password"
          label="Password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordState.isValid}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

import { useReducer } from "react";

const initialStat = {
  value: "",
  hasError: false,
  isValid: false,
  isTouch: false,
};

const CheckValidation = (state, action) => {
  if (action.type === "Add-Value") {
    const hasError = !action.isValid && state.isTouch;
    return {
      value: action.value,
      hasError: hasError,
      isValid: action.isValid,
      isTouch: state.isTouch,
    };
  }

  if (action.type === "Blur-Value") {
    return {
      value: state.value,
      hasError: !action.isValid,
      isValid: action.isValid,
      isTouch: true,
    };
  }

  return initialStat;
};

const useValidator = (validation) => {
  const [input, inputController] = useReducer(CheckValidation, initialStat);

  const valueChangeHandler = (event) => {
    inputController({
      type: "Add-Value",
      value: event.target.value,
      isValid: validation(event.target.value),
    });
  };

  const inputBlurHandler = (event) => {
    inputController({
      type: "Blur-Value",
      isValid: validation(event.target.value),
    });
  };

  const reset = () => {
    inputController({
      type: "Reset-Value",
    });
  };

  return {
    value: input.value,
    isValid: input.isValid,
    hasError: input.hasError,
    changeHandler: valueChangeHandler,
    blurHandler: inputBlurHandler,
    reset,
  };
};

export default useValidator;

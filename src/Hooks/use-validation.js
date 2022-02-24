import { useReducer } from "react";

const initialStat = {
  value: "",
  hasError: false,
  isValid: false,
};

const CheckValidation = (state, action) => {
  if (action.type === "Add-Value") {
    return {
      value: action.value,
      hasError: !action.isValid,
      isValid: action.isValid,
    };
  }

  if (action.type === "Blur-Value") {
    return {
      value: state.value,
      hasError: !action.isValid,
      isValid: action.isValid,
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

  const inputBlurHandler = () => {
    inputController({
      type: "Blur-Value",
      isValid: validation(input.value),
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

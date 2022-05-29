import { useReducer } from "react";

const UseForm = (validateValue) => {
  const inputReducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return { value: action.value, isTouch: state.isTouch };

      case "BLUR":
        return { value: state.value, isTouch: true };

      case "RESET":
        return { value: "", isTouch: false };

      default:
        return state;
    }
  };

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouch: false,
  });

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouch;

  const inputChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    inputChangeHandler,
    inputBlurHandler,
    reset,
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
  };
};

export default UseForm;

import "./signup.css";
import UseForm from "../hooks/UseForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const {
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
  } = UseForm((value) => value.trim() !== "");

  const {
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = UseForm((value) => value.trim().includes("@"));

  const {
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
  } = UseForm((value) => value.trim() !== "");

  const {
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordReset,
    value: enteredConfirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
  } = UseForm((value) => value.trim() !== "");

  const nameValidClasses = nameHasError ? "invalid" : "valid";
  const emailValidClasses = emailHasError ? "invalid" : "valid";
  const passwordValidClasses = passwordHasError ? "invalid" : "valid";
  const confirmPasswordValidClasses = confirmPasswordHasError
    ? "invalid"
    : "valid";

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(false);
      const res = await fetch(
        "https://game-troy.herokuapp.com/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
          }),
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setError(true);
        setErrMsg(resData.message);
      }

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

    nameReset();
    emailReset();
    passwordReset();
    confirmPasswordReset();
  };

  return (
    <>
      {isLoading && (
        <div className="loading_box">
          <p>Loading....</p>
        </div>
      )}
      {error && (
        <div className="error_box">
          <p>{errMsg}</p>
        </div>
      )}
      {success && (
        <div className="success_box">
          <p>Successful</p>
        </div>
      )}

      <form className="login_container" onSubmit={submitHandler}>
        <div className="login_wrapper">
          <h4 className="login_label">Signup</h4>

          <div className="login_input">
            <h5 className="input_title">Name</h5>
            <input
              type="text"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
              className={nameValidClasses}
            />
            {nameHasError && (
              <p
                style={{
                  color: "red",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0",
                  fontWeight: "300px",
                }}
              >
                *Please enter name
              </p>
            )}
          </div>

          <div className="login_input">
            <h5 className="input_title">Email</h5>
            <input
              type="text"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              className={emailValidClasses}
            />
            {emailHasError && (
              <p
                style={{
                  color: "red",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0",
                  fontWeight: "300px",
                }}
              >
                *Please enter email
              </p>
            )}
          </div>
          <div className="login_input">
            <h5 className="input_title">Password</h5>
            <input
              type="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              className={passwordValidClasses}
            />
            {passwordHasError && (
              <p
                style={{
                  color: "red",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0",
                  fontWeight: "300px",
                }}
              >
                *Please enter password
              </p>
            )}
          </div>

          <div className="login_input">
            <h5 className="input_title">Confirm Password</h5>
            <input
              type="password"
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              value={enteredConfirmPassword}
              className={confirmPasswordValidClasses}
            />
            {confirmPasswordHasError && (
              <p
                style={{
                  color: "red",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0",
                  fontWeight: "300px",
                }}
              >
                *Please enter password
              </p>
            )}
          </div>

          <div className="signup_rules">
            <input required type="checkbox" name="" id="" />
            <p className="signup_rule">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              at facilis fugit nihil, eveniet quae possimus. Debitis odio id
              dolore corrupti accusantium. Dignissimos corporis, ducimus
              reprehenderit laborum facilis a veritatis?
            </p>
          </div>

          <button className="login_btn">Singup</button>
        </div>
      </form>
    </>
  );
};

export default Signup;

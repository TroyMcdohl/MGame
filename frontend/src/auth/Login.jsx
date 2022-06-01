import "./login.css";
import UseForm from "../hooks/UseForm";
import { useNavigate, useHistory } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

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

  const emailValidClasses = emailHasError ? "invalid" : "valid";
  const passwordValidClasses = passwordHasError ? "invalid" : "valid";

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
        "https://game-troy.herokuapp.com/api/v1/users/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
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

        localStorage.setItem("currentUser", JSON.stringify(resData));
        setTimeout(() => {
          navigate("/");
        }, 3000);
        window.location.reload();
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

    emailReset();
    passwordReset();
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
      <div className="login_container">
        <form onSubmit={submitHandler} className="login_wrapper">
          <h4 className="login_label">Login</h4>
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

          <button className="login_btn">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;

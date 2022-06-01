import { useState } from "react";
import "./userPassword.css";
import { useNavigate } from "react-router-dom";

const UserPassword = () => {
  const [oPwd, setOPwd] = useState();
  const [nPwd, setNPwd] = useState();
  const [cPwd, setCPwd] = useState();

  const navigate = useNavigate();

  const passwordChangeHandler = async () => {
    const res = await fetch(
      "https://game-troy.herokuapp.com/api/v1/users/updatepassword",
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          oldPassword: oPwd,
          newPassword: nPwd,
          confirmPassword: cPwd,
        }),
      }
    );

    if (res.ok) {
      navigate("/");
    }
  };

  return (
    <div className="pwd_container">
      <div className="pwd_wrapper">
        <h3 className="pwd_title">Password Management</h3>
        <div className="pwd_input">
          <h5 className="pwdinput_title">Old Password</h5>
          <input
            type="password"
            className="pwd_input"
            onChange={(e) => setOPwd(e.target.value)}
          />
        </div>
        <div className="pwd_input">
          <h5 className="pwdinput_title">New Password</h5>
          <input
            type="password"
            className="pwd_input"
            onChange={(e) => setNPwd(e.target.value)}
          />
        </div>
        <div className="pwd_input">
          <h5 className="pwdinput_title">Re Password</h5>
          <input
            type="password"
            className="pwd_input"
            onChange={(e) => setCPwd(e.target.value)}
          />
        </div>
        <button className="pwd_btn" onClick={passwordChangeHandler}>
          Change
        </button>
      </div>
    </div>
  );
};

export default UserPassword;

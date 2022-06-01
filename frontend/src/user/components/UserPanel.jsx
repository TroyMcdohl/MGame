import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import CreateGame from "./CreateGame";
import UserInfo from "./UserInfo";
import "./userPanel.css";
import UserPassword from "./UserPassword";

const UserPanel = () => {
  const currentUser = useContext(UserContext).currentUser().user;

  const navigate = useNavigate();

  const clickReducer = (state, action) => {
    switch (action.type) {
      case "INFO":
        return { userInfo: true };

      case "PWD":
        return { userPwd: true };

      case "GAME":
        return { createGame: true };

      default:
        return state;
    }
  };

  const [clickState, dispatch] = useReducer(clickReducer, {
    userInfo: false,
    userPwd: false,
    createGame: false,
  });

  const infoHandler = () => {
    dispatch({ type: "INFO" });
  };

  const pwdHandler = () => {
    dispatch({ type: "PWD" });
  };

  const gameHandler = () => {
    dispatch({ type: "GAME" });
  };

  const infoResHandler = () => {
    navigate("/user/info");
  };

  const pwdResHandler = () => {
    navigate("/user/password");
  };
  const cgameResHandler = () => {
    navigate("/user/create");
  };

  const logoutHandler = async () => {
    await fetch("https://game-troy.herokuapp.com/api/v1/users/logout", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("currentUser");

    window.location.reload();
  };

  return (
    <div className="panel_container">
      <div className="panel_wrapper">
        <div className="panel_left">
          <h4 className="panel_title">User Information</h4>
          <ul className="panel_facts">
            <li className="panel_fact" onClick={infoHandler}>
              User Profile
              <span
                className="respon_btn"
                onClick={infoResHandler}
                style={{ color: "white" }}
              ></span>
            </li>
            <li className="panel_fact" onClick={pwdHandler}>
              User Password
              <span
                className="respon_btn"
                onClick={pwdResHandler}
                style={{ color: "white" }}
              ></span>
            </li>
            {currentUser.role === "admin" && (
              <li className="panel_fact" onClick={gameHandler}>
                Create Game
                <span
                  className="respon_btn"
                  onClick={cgameResHandler}
                  style={{ color: "white" }}
                ></span>
              </li>
            )}
            <li className="panel_fact" onClick={logoutHandler}>
              Logout
            </li>
          </ul>
        </div>
        <div className="panel_right">
          {!clickState.userInfo &&
            !clickState.userPwd &&
            !clickState.createGame && <UserInfo />}
          {clickState.userInfo && <UserInfo />}
          {clickState.userPwd && <UserPassword />}
          {clickState.createGame && <CreateGame />}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;

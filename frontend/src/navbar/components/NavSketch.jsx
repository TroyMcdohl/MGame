import "./navSketch.css";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

const NavSketch = () => {
  const currentUser = useContext(UserContext).currentUser();

  return (
    <div className="nav_container">
      <div className="nav_wrapper">
        <div className="nav_left">
          <div className="nav_icon">
            <SmartToyOutlinedIcon style={{ fontSize: "35px" }} />
          </div>
          <h4 className="nav_title">M Game</h4>
        </div>
        <div className="nav_center">
          {currentUser && (
            <>
              <div className="nav_store">
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Store
                </Link>
              </div>
              <div className="nav_library">
                <Link
                  to={"/library"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Library
                </Link>
              </div>
            </>
          )}
          {!currentUser && (
            <>
              <div className="nav_store">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={"/auth/login"}
                >
                  Login
                </Link>
              </div>
              <div className="nav_library">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={"/auth/signup"}
                >
                  Signup
                </Link>
              </div>
            </>
          )}
        </div>
        {currentUser && (
          <div className="nav_right">
            <div className="nav_user">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={"/user"}
              >
                <img
                  src={`https://game-troy.herokuapp.com/api/v1/${currentUser.user.photo}`}
                  alt=""
                  className="nav_user_photo"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavSketch;

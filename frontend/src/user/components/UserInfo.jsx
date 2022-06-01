import { useContext, useRef, useState } from "react";
import UserContext from "../../context/UserContext";
import "./userInfo.css";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState("");

  const imageRef = useRef();

  const currentUser = useContext(UserContext).currentUser().user;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("photo", imageFile);

  const infoChangeHandler = async () => {
    const res = await fetch(
      "https://game-troy.herokuapp.com/api/v1/users/updateme",
      {
        method: "PATCH",
        credentials: "include",
        body: formData,
      }
    );

    if (res.ok) {
      navigate("/");
    }

    console.log(await res.json());
  };

  return (
    <div className="userInfo_container">
      <div className="userInfo_wrapper">
        <div className="userInfo_photo">
          <img
            src={`https://game-troy.herokuapp.com/api/v1/${currentUser.photo}`}
            alt=""
            onClick={() => {
              imageRef.current.click();
            }}
            className="userInfo_img"
            style={{ cursor: "pointer" }}
          />
          <input
            type="file"
            ref={imageRef}
            style={{ display: "none" }}
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <div className="info_input">
          <h5 className="infoinput_title">Name</h5>
          <input
            type="text"
            className="info_input"
            placeholder={currentUser.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="info_input">
          <h5 className="infoinput_title">Email</h5>
          <input
            type="text"
            placeholder={currentUser.email}
            className="info_input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="info_input">
          <h5 className="infoinput_title">Password</h5>
          <input
            type="password"
            className="info_input"
            placeholder="********"
            disabled
          />
        </div>
        <button className="info_btn" onClick={infoChangeHandler}>
          Change
        </button>
      </div>
    </div>
  );
};

export default UserInfo;

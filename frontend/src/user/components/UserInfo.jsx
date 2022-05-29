import { useContext } from "react";
import UserContext from "../../context/UserContext";
import "./userInfo.css";

const UserInfo = () => {
  const currentUser = useContext(UserContext).currentUser().user;

  console.log(currentUser);

  return (
    <div className="userInfo_container">
      <div className="userInfo_wrapper">
        <div className="userInfo_photo">
          <img
            src="https://th.bing.com/th/id/OIP.zEK1mr_rnlkN81tI1bdWUAAAAA?w=180&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
            alt=""
            className="userInfo_img"
          />
        </div>
        <div className="info_input">
          <h5 className="infoinput_title">Name</h5>
          <input
            type="text"
            className="info_input"
            placeholder={currentUser.name}
          />
        </div>
        <div className="info_input">
          <h5 className="infoinput_title">Email</h5>
          <input
            type="text"
            placeholder={currentUser.email}
            className="info_input"
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
        <button className="info_btn">Change</button>
      </div>
    </div>
  );
};

export default UserInfo;

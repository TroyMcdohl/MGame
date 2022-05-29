import "./userPassword.css";

const UserPassword = () => {
  return (
    <div className="pwd_container">
      <div className="pwd_wrapper">
        <h3 className="pwd_title">Password Management</h3>
        <div className="pwd_input">
          <h5 className="pwdinput_title">Old Password</h5>
          <input type="password" className="pwd_input" />
        </div>
        <div className="pwd_input">
          <h5 className="pwdinput_title">New Password</h5>
          <input type="password" className="pwd_input" />
        </div>
        <div className="pwd_input">
          <h5 className="pwdinput_title">Re Password</h5>
          <input type="password" className="pwd_input" />
        </div>
        <button className="pwd_btn">Change</button>
      </div>
    </div>
  );
};

export default UserPassword;

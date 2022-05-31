import "./dashBot.css";
import { Link, useNavigate } from "react-router-dom";

const DashBot = () => {
  const navigate = useNavigate();

  return (
    <div className="dashbot_container">
      <div className="dashbot_wrapper">
        <div className="dashbot_display">
          <div className="dashbot_photo">
            <img
              src="https://th.bing.com/th/id/OIP.xXgNrEeWQVYJJ2HDadzQvQHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
              alt=""
              className="dashbot_img"
            />
          </div>
          <div className="dashbot_photodetail">
            <div className="dashbot_photos">
              <div className="dashbot_smphoto">
                <img
                  src="https://th.bing.com/th/id/OIP.YzXnriu9jxe-DDhoNIFHMwHaEK?w=319&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
                  alt=""
                  className="dashbot_smimg"
                />
              </div>

              <div className="dashbot_smphoto">
                <img
                  src="https://th.bing.com/th/id/OIP.J-RrhfUBHRe9ZKH20XyqfwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
                  alt=""
                  className="dashbot_smimg"
                />
              </div>

              <div className="dashbot_smphoto">
                <img
                  src="https://th.bing.com/th/id/OIP.Jw98o_Lm8bvpCKMeJi3n8wHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
                  alt=""
                  className="dashbot_smimg"
                />
              </div>
            </div>
            <div className="dashbot_detail">
              <h3 className="dashbot_title">Devil May Cry V</h3>

              <div className="dashbot_fact">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
                repellendus odit suscipit. Eius illo, quam ullam optio
                necessitatibus unde hic dicta laboriosam omnis laudantium
                tempore vitae voluptate maxime? Quis, omnis!
              </div>
              <ul className="dashbot_types">
                <li className="dashbot_type" style={{ backgroundColor: "red" }}>
                  Adventurer
                </li>
                <li
                  className="dashbot_type"
                  style={{ backgroundColor: "orange" }}
                >
                  Action
                </li>
                <li
                  className="dashbot_type"
                  style={{ backgroundColor: "green" }}
                >
                  Story
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dashbot_others">
          <div className="dashbot_other">
            <button
              className="dashbot_btn"
              onClick={() => {
                navigate("/games");
              }}
            >
              All Game
            </button>
          </div>
          <div className="dashbot_other">
            <button className="dashbot_btn">
              <Link
                to="/freegames"
                style={{ color: "white", textDecoration: "none" }}
              >
                Free Game
              </Link>
            </button>
          </div>
          <div className="dashbot_other">
            <button className="dashbot_btn">
              <Link
                to="/storygames"
                style={{ color: "white", textDecoration: "none" }}
              >
                Story Game
              </Link>
            </button>
          </div>
          <div className="dashbot_other">
            <button className="dashbot_btn">
              {" "}
              <Link
                to="/discountgames"
                style={{ color: "white", textDecoration: "none" }}
              >
                Discount Game
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBot;

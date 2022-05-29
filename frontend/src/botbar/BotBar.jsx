import "./botBar.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const BotBar = () => {
  return (
    <div className="botbar_container">
      <div className="botbar_wrapper">
        <h3 className="botbar_title">About Us</h3>
        <div className="botbar_detail">
          <div className="botbar_des">
            <h4 className="botbar_caption">Community</h4>
            <div className="botbar_para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              explicabo deleniti ut. Delectus in et minus voluptate alias totam
              modi optio quidem deleniti. Dolorem accusantium error ducimus
              placeat inventore nobis. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ea explicabo deleniti ut. Delectus in et minus
              voluptate alias totam modi optio quidem deleniti. Dolorem
              accusantium error ducimus placeat inventore nobis.
            </div>
          </div>
          <div className="botbar_contact">
            <div className="botbar_ph">
              <div className="botbar_phlogo">
                <LocalPhoneIcon />
              </div>
              <div className="botbar_phno">09344243244432</div>
            </div>
            <div className="botbar_email">
              <div className="botbar_elogo">
                <EmailOutlinedIcon />
              </div>
              <div className="botbar_eadd">mgame@gmail.com</div>
            </div>
            <ul className="bot_logoes">
              <li className="bot_logo">
                <FacebookOutlinedIcon />
              </li>
              <li className="bot_logo">
                <InstagramIcon />
              </li>
              <li className="bot_logo">
                <GitHubIcon />
              </li>
              <li className="bot_logo">
                <EmailOutlinedIcon />
              </li>
              <li className="bot_logo">
                <TwitterIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotBar;

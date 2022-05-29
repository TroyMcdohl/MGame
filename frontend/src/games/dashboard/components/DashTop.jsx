import "./dashTop.css";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";

const DashSketch = () => {
  return (
    <div className="dashtop_container">
      <div className="dashtop_wrapper">
        <div className="dashtop_left">
          <ArrowLeftOutlinedIcon />
        </div>
        <div className="dashtop_main">
          <div className="dashtop_slide">
            <img
              src="https://th.bing.com/th/id/R.e4c501d0b0df5bced08047df83b8e1a9?rik=qahegXIW%2f5Oq4g&pid=ImgRaw&r=0"
              alt=""
              className="dashtop_photo"
            />
          </div>
          <div className="dashtop_slide">
            <img
              src="https://th.bing.com/th/id/R.d4fde3df1603faa8379672f4a640793a?rik=ZZ2BLnpVu74nBQ&pid=ImgRaw&r=0"
              alt=""
              className="dashtop_photo"
            />
          </div>
          <div className="dashtop_slide">
            <img
              src="https://vgboxart.com/boxes/PS4/53753-minecraft.png"
              alt=""
              className="dashtop_photo"
            />
          </div>
        </div>
        <div className="dashtop_right">
          <ArrowRightOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default DashSketch;

import "./gameList.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, useParams } from "react-router-dom";

const GameList = (props) => {
  return (
    <div className="game_container">
      <div className="game_filter">
        <h4 className="game_fil_title">Search On your mind Adventure :</h4>
        <select className="game_fil">
          <option value="action">Action</option>
          <option value="rpg">RPG</option>
          <option value="story">Story</option>
          <option value="simulation">Simulation</option>
        </select>
      </div>
      <div className="game_wrapper">
        {props.games &&
          props.games.map((game) => (
            <div className="game_card" key={game._id}>
              <div className="game_photo">
                <img
                  src={`http://localhost:8000/${game.image}`}
                  alt=""
                  className="game_img"
                />
                <ul className="game_logoes">
                  <li className="game_logo">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/games/${game._id}`}
                    >
                      <SearchOutlinedIcon />
                    </Link>
                  </li>
                  <li className="game_logo">
                    <FavoriteBorderOutlinedIcon />
                  </li>
                </ul>
              </div>
              <div className="game_detail">
                <h3 className="game_title">{game.name}</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GameList;

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, useParams } from "react-router-dom";

const FreeGamePage = (props) => {
  return (
    <div className="game_container">
      <div className="game_wrapper">
        {props.games &&
          props.games
            .filter((g) => g.price < 500)
            .map((game) => (
              <div className="game_card" key={game._id}>
                <div className="game_photo">
                  <img
                    // src={`https://game-troy.herokuapp.com/api/v1/${game.image}`}
                    src={`${game.image}`}
                    alt=""
                    className="game_img"
                  />
                </div>
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

                <div className="game_detail">
                  <h3 className="game_title">{game.name}</h3>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default FreeGamePage;

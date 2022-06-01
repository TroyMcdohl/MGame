import "./libraryComponent.css";
import { useNavigate } from "react-router-dom";

const LibraryComponent = (props) => {
  const navigate = useNavigate();

  return (
    <div className="library_container">
      <div className="library_wrapper">
        {props.game &&
          props.game.length > 0 &&
          props.game.map((g) => (
            <div className="library_card">
              <div className="library_left">
                <div className="library_photo">
                  <img
                    // src={
                    //   `https://game-troy.herokuapp.com/api/v1/${g.game.image}` ||
                    src={`${g.game.image}`}
                    alt=""
                    className="library_img"
                  />
                </div>
              </div>
              <div className="library_right">
                <ul className="library_types">
                  <li className="library_type">
                    <h4 className="library_type_title">Name</h4>
                    <p className="library_type_fact">{g.game.name}</p>
                  </li>
                  <li className="library_type">
                    <h4 className="library_type_title">Price</h4>
                    <p className="library_type_fact">{g.game.price}$</p>
                  </li>
                  <li className="library_type">
                    <h4 className="library_type_title">Type</h4>
                    <p className="library_type_fact">{g.game.type}</p>
                  </li>
                  <li className="library_type">
                    <h4 className="library_type_title">Developer</h4>
                    <p className="library_type_fact">{g.game.developer}</p>
                  </li>
                </ul>
                <div className="library_remove_btn">
                  <button
                    className="re_btn"
                    onClick={async () => {
                      const res = await fetch(
                        `https://game-troy.herokuapp.com/api/v1/library/${g._id}`,
                        {
                          method: "DELETE",
                          credentials: "include",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );

                      if (!res.ok) {
                        navigate(0);
                      }
                    }}
                  >
                    Remove from Library
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LibraryComponent;

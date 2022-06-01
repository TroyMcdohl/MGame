import { useReducer, useState } from "react";
import "./createGame.css";

const CreateGame = () => {
  const [imgFile, setImgFile] = useState([]);
  const [mainFile, setMainFile] = useState(null);

  const valueReducer = (state, action) => {
    switch (action.type) {
      case "NAME":
        return { ...state, name: action.value };

      case "PRICE":
        return { ...state, price: action.value };

      case "DES":
        return { ...state, des: action.value };

      case "TYPE":
        return { ...state, type: action.value };

      case "DEVELOPER":
        return { ...state, developer: action.value };

      case "RELEASEDATE":
        return { ...state, releaseDate: action.value };

      default:
        return state;
    }
  };

  const [valueState, dispatch] = useReducer(valueReducer, {
    name: null,
    price: null,
    des: null,
    type: null,
    developer: null,
    releaseDate: null,
  });

  const nameHandler = (e) => {
    dispatch({ type: "NAME", value: e.target.value });
  };

  const priceHandler = (e) => {
    dispatch({ type: "PRICE", value: e.target.value });
  };

  const typeHandler = (e) => {
    dispatch({ type: "TYPE", value: e.target.value });
  };

  const redateHandler = (e) => {
    dispatch({ type: "RELEASEDATE", value: e.target.value });
  };

  const desHandler = (e) => {
    dispatch({ type: "DES", value: e.target.value });
  };

  const developHandler = (e) => {
    dispatch({ type: "DEVELOPER", value: e.target.value });
  };

  const photoHandler = (e) => {
    setImgFile(e.target.files);
  };

  const mainPicHandler = (e) => {
    setMainFile(e.target.files[0]);
  };

  const clickHandler = async () => {
    const form = new FormData();
    form.append("name", valueState.name);
    form.append("des", valueState.des);
    form.append("price", valueState.price);
    form.append("type", valueState.type);
    form.append("developer", valueState.developer);
    form.append("releaseDate", valueState.releaseDate);
    form.append("image", mainFile);
    for (let i = 0; i < imgFile.length; i++) {
      form.append("images", imgFile[i]);
    }

    const res = await fetch(`https://game-troy.herokuapp.com/api/v1/games/`, {
      method: "POST",
      credentials: "include",
      body: form,
    });
  };

  return (
    <div className="cgame_container">
      <div className="cgame_wrapper">
        <div className="cgame_input">
          <h5 className="cgame_input_title">Name</h5>
          <input
            type="text"
            className="cgame_inputcolor"
            onChange={nameHandler}
          />
        </div>
        <div className="cgame_input">
          <h5 className="cgame_input_title">Price</h5>
          <input
            type="text"
            className="cgame_inputcolor"
            onChange={priceHandler}
          />
        </div>
        <div className="cgame_input">
          <h5 className="cgame_input_title">Description</h5>
          <input
            type="text"
            className="cgame_inputcolor"
            onChange={desHandler}
          />
        </div>
        <div className="cgame_input">
          <h5 className="cgame_input_title">Release Date</h5>
          <input
            type="date"
            className="cgame_inputcolor"
            style={{ width: "190px" }}
            onChange={redateHandler}
          />
        </div>
        <div className="cgame_input">
          <h5 className="cgame_input_title">Developer</h5>
          <input
            type="text"
            className="cgame_inputcolor"
            onChange={developHandler}
          />
        </div>
        <div className="cgame_input">
          <h5 className="cgame_input_title">Type</h5>
          <input
            type="text"
            className="cgame_inputcolor"
            onChange={typeHandler}
          />
        </div>

        <div className="cgame_final">
          <div>
            <h5 className="cgame_input_title">Main Photo</h5>
            <input
              type="file"
              className="cgame_inputcolor"
              multiple
              onChange={mainPicHandler}
            />
          </div>
          <h5 className="cgame_input_title">Photo(at least 4 pic)</h5>
          <input
            type="file"
            className="cgame_inputcolor"
            multiple
            onChange={photoHandler}
          />
          <button className="cgame_btn" onClick={clickHandler}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;

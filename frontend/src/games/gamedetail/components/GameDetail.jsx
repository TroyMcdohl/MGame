import { useEffect, useState } from "react";
import "./gameDetail.css";

const GameDetail = (props) => {
  const [img, setImg] = useState();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const randomImgHandler = (e) => {
    setImg(e.target.src);
  };

  const libraryHandler = async () => {
    setError(false);
    const res = await fetch(
      `https://game-troy.herokuapp.com/api/v1/games/${props.game._id}/library/`,
      {
        credentials: "include",
        method: "POST",
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      setErrorMsg(resData.message);
      setError(true);
    }
  };

  return (
    <>
      {error && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h4
            style={{
              widht: "50%",
              backgroundColor: "red",
              padding: "20px 60px",
              margin: "0",
              color: "white",
            }}
          >
            {errorMsg}
          </h4>
        </div>
      )}
      {props.game && (
        <div className="gamedetail_container">
          <div className="gamedetail_wrapper">
            <div className="gamedetail_left">
              <div className="detailleft_photo">
                {img && <img src={img} alt="" className="detailleft_img" />}
                {!img && (
                  <>
                    <img
                      src={`${props.game.image}`}
                      alt=""
                      className="detailleft_img"
                    />
                  </>
                )}
              </div>
              <div className="detailleft_smphoto">
                {/* {props.game.images.map((img) => ( */}
                <img
                  // src={`https://game-troy.herokuapp.com/api/v1/${img}`}
                  src={`${props.game.image}`}
                  alt=""
                  className="detailleft_smimg"
                  onClick={randomImgHandler}
                />

                <img
                  // src={`https://game-troy.herokuapp.com/api/v1/${img}`}
                  src={`${props.game.image}`}
                  alt=""
                  className="detailleft_smimg"
                  onClick={randomImgHandler}
                />

                <img
                  // src={`https://game-troy.herokuapp.com/api/v1/${img}`}
                  src={`${props.game.image}`}
                  alt=""
                  className="detailleft_smimg"
                  onClick={randomImgHandler}
                />

                <img
                  // src={`https://game-troy.herokuapp.com/api/v1/${img}`}
                  src={`${props.game.image}`}
                  alt=""
                  className="detailleft_smimg"
                  onClick={randomImgHandler}
                />
                {/* ))} */}
              </div>
            </div>
            <div className="gamedetail_right">
              <div className="detailright_photo">
                <img
                  // src={`https://game-troy.herokuapp.com/api/v1/${props.game.image}`}

                  src={`${props.game.image}`}
                  alt=""
                  className="detailright_img"
                />
              </div>
              <div className="detailright_description">
                <p className="detailright_para">{props.game.des}</p>
                <div className="detail_des">
                  <div className="detail_types">
                    <div className="detail_type">
                      <h4 className="detail_label">Release Date</h4>
                      <p className="detail_fact">{props.game.releaseDate}</p>
                    </div>
                    <div className="detail_type">
                      <h4 className="detail_label">Price</h4>
                      <p className="detail_fact">${props.game.price}</p>
                    </div>
                    <div className="detail_type">
                      <h4 className="detail_label">Developers</h4>
                      <p className="detail_fact">{props.game.developer}</p>
                    </div>
                  </div>
                  <div className="detail_final">
                    <div className="detail_feel">{props.game.type}</div>
                    <button className="detailcart_btn" onClick={libraryHandler}>
                      Add to Library
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetail;

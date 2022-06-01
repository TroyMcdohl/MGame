import React, { useEffect, useState } from "react";
import StoryGamePage from "../components/StoryGamePage";

const StoryGame = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const res = await fetch(
          "https://game-troy.herokuapp.com/api/v1/games",
          {
            credentials: "include",
          }
        );

        const resData = await res.json();

        if (!res.ok) {
          setError(true);
          setErrMsg(resData.message);
        }

        console.log(resData);

        setData(resData.data);

        setLoading(false);
      };

      fetchData();
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {error && (
        <div className="error_box">
          <p>{errMsg}</p>
        </div>
      )}
      {loading && (
        <div className="loading_in">
          <h4>Loading.....</h4>
        </div>
      )}
      <StoryGamePage games={data} />
    </>
  );
};

export default StoryGame;

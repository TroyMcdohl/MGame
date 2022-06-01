import React, { useEffect, useState } from "react";
import GameDetail from "../components/GameDetail";
import { useParams } from "react-router-dom";

const Game = () => {
  const gameId = useParams().gameId;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://game-troy.herokuapp.com/api/v1/games/${gameId}`
      );

      const resData = await res.json();

      if (!res.ok) {
        setError(true);
      }

      setData(resData.data);

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {error && (
        <div className="error_box">
          <p>Can't fetch data</p>
        </div>
      )}
      {loading && (
        <div className="loading_in">
          <h4>Loading</h4>
        </div>
      )}
      <GameDetail game={data} />
    </>
  );
};

export default Game;

import React, { useEffect, useState } from "react";
import LibraryComponent from "../components/LibraryComponent";

const GameLibrary = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setErrMsg(false);
      setLoading(true);
      const res = await fetch(
        `https://game-troy.herokuapp.com/api/v1/library`,
        {
          credentials: "include",
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        setError(true);
        setErrMsg(resData.message);
        setLoading(false);
      }

      setLoading(false);
      setData(resData);
      console.log(resData);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <h4
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </h4>
      )}
      {error && (
        <h4
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {errMsg}
        </h4>
      )}
      <LibraryComponent game={data} />
    </>
  );
};

export default GameLibrary;

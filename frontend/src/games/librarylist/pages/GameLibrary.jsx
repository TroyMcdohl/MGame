import React, { useEffect, useState } from "react";
import LibraryComponent from "../components/LibraryComponent";

const GameLibrary = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/api/v1/library`, {
        credentials: "include",
      });

      const resData = await res.json();

      setData(resData);
      console.log(resData);
    };

    fetchData();
  }, []);

  return <LibraryComponent game={data} />;
};

export default GameLibrary;

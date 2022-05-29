import React, { useEffect } from "react";
import LibraryComponent from "../components/LibraryComponent";

const GameLibrary = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/api/v1/library`, {
        credentials: "include",
      });

      const resData = await res.json();

      console.log(resData);
    };

    fetchData();
  }, []);

  return <LibraryComponent />;
};

export default GameLibrary;

import React from "react";
import DashTop from "../components/DashTop";
import DashCenter from "../components/DashCenter";
import DashBot from "../components/DashBot";
import BotBar from "../../../botbar/BotBar";

const DashBoard = () => {
  return (
    <>
      <DashTop />
      <DashCenter />
      <DashBot />
      <BotBar />
    </>
  );
};

export default DashBoard;

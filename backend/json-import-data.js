const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Game = require("./models/Game");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(
    "mongodb+srv://m-game:Ilovemgame8@cluster0.mrwvd.mongodb.net/m-game?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB is running"))
  .catch((err) => console.log(err));

const games = JSON.parse(fs.readFileSync("./gameData.json"), "utf-8");

const importData = async () => {
  try {
    await Game.create(games);
    console.log("data successfully imported");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Game.deleteMany();
    console.log("data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

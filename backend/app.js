const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const gameRouter = require("./router/gameRouter");
const userRouter = require("./router/userRouter");
const libraryRouter = require("./router/libraryRouter");
const globalErrorHandler = require("./error/globalErrorHandler");
const AppError = require("./error/AppError");
const cors = require("cors");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB is running");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "https://game-troy-frontend.herokuapp.com",
    credentials: true,
  })
);

app.use(
  "/public/img/users",
  express.static(path.join("public", "img", "users"))
);
app.use(
  "/public/img/games",
  express.static(path.join("public", "img", "games"))
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/library", libraryRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`the route you find ${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running!");
});

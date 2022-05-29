const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");
const authController = require("../controller/authController");
const libraryRouter = require("./libraryRouter");

router.use("/:gameId/library", libraryRouter);

router
  .route("/")
  .get(authController.protect, gameController.getAllGames)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    gameController.uploadGamePhoto,
    gameController.resizeGamePhoto,
    gameController.createGame
  );

router
  .route("/:gameId")
  .get(gameController.getGame)
  .patch(gameController.updateGame)
  .delete(gameController.deleteGame);

module.exports = router;

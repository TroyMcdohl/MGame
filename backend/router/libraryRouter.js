const express = require("express");
const libraryController = require("../controller/libraryController");
const router = express.Router({ mergeParams: true });
const authController = require("../controller/authController");

router
  .route("/")
  .get(authController.protect, libraryController.findAllLibrary)
  .post(
    authController.protect,

    libraryController.createLibrary
  );

router
  .route("/:libraryId")
  .get(libraryController.findLibrary)
  .patch(libraryController.updateLibrary)
  .delete(libraryController.deleteLibrary);

module.exports = router;

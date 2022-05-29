const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/forgotpassword").post(authController.forgotPassword);
router.route("/resetpassword/:resetToken").patch(authController.resetPassword);

router.use(authController.protect);

router.route("/logout").patch(authController.logout);

router.route("/updatepassword").patch(authController.updatePassword);
router
  .route("/updateme")
  .patch(
    authController.uploadUserPhoto,
    authController.resizeUserPhoto,
    authController.updateMe
  );

module.exports = router;

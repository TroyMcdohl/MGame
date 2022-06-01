const jwt = require("jsonwebtoken");
const AppError = require("../error/AppError");
const User = require("../models/User");
const multer = require("multer");
const Email = require("../email/Email");
const crypto = require("crypto");
const sharp = require("sharp");

const objectFilter = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

let token;

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT);
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (
      !user ||
      !(await user.correctPassword(req.body.password, user.password))
    ) {
      return next(new AppError("User not found", 404));
    }

    token = signToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return next(new AppError("You need to login", 400));
    }

    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRECT);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new AppError("User not found", 404));
    }

    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return next(new AppError("You are not allowed to do this.", 400));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (
      !user ||
      !(await user.correctPassword(req.body.oldPassword, user.password))
    ) {
      return next(new AppError("You can't update password", 400));
    }

    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmPassword;

    await user.save();

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password || req.body.confirmPassword) {
      return next(new AppError("This route is not for update Password", 400));
    }

    const filter = objectFilter(req.body, "name", "email");

    if (req.file) {
      filter.photo = "public/img/users/" + req.file.filename;
    }

    const user = await User.findByIdAndUpdate(req.user._id, filter, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("User with that email not found", 404));
  }

  const resetToken = user.createResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password?Submit a request with your new password and confirm password to : ${resetURL}.\n If you didn't forget your password,please ignore this email;`;

  try {
    await new Email(user, resetURL).sendResetPassword();

    res.status(200).json({
      status: "success",
      message: "email send successfully",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: resetToken,
    });

    if (!user) {
      return next(new AppError("Can't reset password"));
    }

    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload a image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

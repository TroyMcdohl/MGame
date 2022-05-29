const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password required"],
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },

      message: "Password need to be same",
    },
  },

  photo: {
    type: String,
    default: "default.jpeg",
  },

  role: {
    type: String,
    default: "user",
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: Date,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

userSchema.methods.correctPassword = function (reqPassword, userPassword) {
  return bcrypt.compare(reqPassword, userPassword);
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

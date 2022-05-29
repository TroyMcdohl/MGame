const mongoose = require("mongoose");
const User = require("./User");
const Game = require("./Game");

const librarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },

    game: {
      type: mongoose.Schema.ObjectId,
      ref: Game,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

librarySchema.pre(/^find/, function (next) {
  this.populate({
    path: "game user",
  });

  next();
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;

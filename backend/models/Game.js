const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Gamename required"],
    },

    price: {
      type: Number,
      required: [true, "Price required"],
    },

    des: {
      type: String,
      required: [true, "Description required"],
    },

    developer: {
      type: String,
      required: [true, "Developer name required"],
    },

    releaseDate: {
      type: Date,
    },

    type: {
      type: String,
      required: [true, "Type required"],
    },

    image: {
      type: String,
    },

    images: {
      type: [String],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

gameSchema.virtual("library", {
  foreignField: "game",
  localField: "_id",
  ref: "Library",
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

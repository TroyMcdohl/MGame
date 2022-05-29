const Game = require("../models/Game");
const multer = require("multer");
const AppError = require("../../../mern-shop/m-shop_backend/error/AppError");
const sharp = require("sharp");

exports.getAllGames = async (req, res, next) => {
  try {
    const games = await Game.find().populate("library");

    res.status(200).json({
      status: "success",
      data: games,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGame = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.gameId).populate("images");

    res.status(200).json({
      status: "success",
      data: game,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      err: error,
    });
  }
};

exports.createGame = async (req, res, next) => {
  try {
    const game = await Game.create(req.body);

    res.status(200).json({
      status: "success",
      data: game,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      err: error,
    });
  }
};

exports.updateGame = async (req, res, next) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.gameId, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: game,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      err: error,
    });
  }
};

exports.deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.gameId);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      err: error,
    });
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
  diskStorage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadGamePhoto = upload.fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 4,
  },
]);

exports.resizeGamePhoto = async (req, res, next) => {
  if (!req.files) return next();

  const fileName = "gamecover-${Date.now()}.jpeg";

  req.body.image = `public/img/games/` + fileName;

  await sharp(req.files.image[0].buffer)
    .resize(1500, 1000)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/games/${fileName}`);

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `game-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(1500, 1000)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/games/${filename}`);

      req.body.images.push("public/img/games/" + filename);
    })
  );

  next();
};

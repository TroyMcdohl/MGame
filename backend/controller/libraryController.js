const AppError = require("../error/AppError");
const Library = require("../models/Library");

exports.createLibrary = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    req.body.game = req.params.gameId;

    const library = await Library.find({
      user: req.body.user,
      game: req.body.game,
    });

    if (library && library.length > 0) {
      return next(new AppError("You already add this game to library", 400));
    }

    const newlibrary = await Library.create(req.body);

    res.status(201).json(newlibrary);
  } catch (error) {
    next(error);
  }
};

exports.findAllLibrary = async (req, res, next) => {
  try {
    const libraries = await Library.find({ user: req.user._id });

    if (!libraries || libraries.length === 0) {
      return next(new AppError("No Games found", 404));
    }

    res.status(200).json(libraries);
  } catch (error) {
    next(error);
  }
};

exports.findLibrary = async (req, res, next) => {
  try {
    const library = await Library.findById(req.params.libraryId);
    if (!library) {
      return next(new AppError("No Games found", 404));
    }

    res.status(200).json(library);
  } catch (error) {
    next(error);
  }
};

exports.updateLibrary = async (req, res, next) => {
  try {
    const updateLibrary = await Library.findByIdAndUpdate(
      req.params.libraryId,
      req.body,
      {
        new: true,
        runValidatior: true,
      }
    );

    res.status(200).json(updateLibrary);
  } catch (error) {
    next(error);
  }
};

exports.deleteLibrary = async (req, res, next) => {
  try {
    const delLibrary = await Library.findByIdAndDelete(req.params.libraryId);

    if (!delLibrary) {
      return next(new AppError("That id with game not found", 404));
    }

    res.status(204).json(delLibrary);
  } catch (error) {
    next(error);
  }
};

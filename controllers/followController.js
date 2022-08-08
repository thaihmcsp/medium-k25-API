const { Follow } = require("../models/Folow");

exports.addFollow = async (req, res) => {
  try {
    const addFollow = await Follow.create({
      userID: req.body.userID,
      authorID: req.body.authorID,
    });

    res.status(200).json({ message: "create success", data: addFollow });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

exports.deleteFollow = async (req, res) => {
  try {
    const deleteFollow = await Follow.deleteOne({
      userID: req.params.userID,
      authorID: req.params.authorID,
    });

    res.status(200).json({ message: "create success", data: deleteFollow });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const { Block } = require("../models/Block");

exports.createBlock = async (req, res) => {
  try {
    const block = await Block.create({
      userID: req.body.userID,
      authorID: req.body.authorID,
    });

    res.status(200).json({ message: "create success", data: block });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

exports.deleteBlock = async (req, res) => {
  try {
    const deleteBlock = await Block.deleteOne({
      userID: req.params.userID,
      authorID: req.params.authorID,
    });

    res.status(200).json({ message: "create success", data: deleteBlock });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

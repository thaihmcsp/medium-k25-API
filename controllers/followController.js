const { Follow } = require("../models/Folow");

exports.addFollow = async (req, res) => {
  try {
    const addFollow = await Follow.create({
      userId: req.body.userId,
      authorId: req.body.authorId,
    });

    res.status(200).json({ message: "create success", data: addFollow });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

exports.deleteFollow = async (req, res) => {
  try {
    const deleteFollow = await Follow.deleteOne({_id: req.params.followId});

    res.status(200).json({ message: "create success", data: deleteFollow });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

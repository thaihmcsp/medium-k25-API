const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser)
      return res
        .status(400)
        .json({ message: "email is used, choose another one" });

    const password = bcrypt.hashSync(req.body.password, 10);
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password,
    });

    res.status(200).json({ message: "create account success" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

exports.login = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (!checkUser) return res.status(400).json({ message: "wrong email" });

    const checkPass = bcrypt.compareSync(req.body.password, checkUser.password);
    if (!checkPass) return res.status(400).json({ message: "wrong password" });

    delete checkUser._doc.password;

    const token = jwt.sign({ checkUser }, "thai", { expiresIn: "1d" });
    res.status(200).json({ message: "login success", token });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

exports.getLogInUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const jwt = require("jsonwebtoken");

exports.checkLogin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, "thai");
    req.user = user.checkUser;
    next();
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

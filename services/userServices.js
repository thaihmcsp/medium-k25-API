const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./publics/uploads/avatar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

exports.upload = multer(
  { storage: storage },
  {
    fileFilter: function (req, file, cb) {
      if (!file.mimetype.includes("image"))
        return cb(new Error("only image is allow"));
      cb(null, true);
    },
  }
);

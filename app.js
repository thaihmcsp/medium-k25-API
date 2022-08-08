require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const cors = require("cors");
const path = require("path");
const { startup } = require("./startup");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/publics", express.static(path.join(__dirname, "./publics")));
startup(app);

app.listen(PORT, () => {
  console.log("running port", PORT);
});

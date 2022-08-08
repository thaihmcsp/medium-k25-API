const router = require("express").Router();
const { addFollow, deleteFollow } = require("../controllers/followController");

router.post("/addFollow", addFollow);
router.delete("/deleteFollow/:id", deleteFollow);

module.exports = router;

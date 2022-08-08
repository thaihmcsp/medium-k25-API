const router = require("express").Router();
const { createBlock, deleteBlock } = require("../controllers/blockController");

router.post("/block", createBlock);
router.delete("/deleteBlock/:blockId", deleteBlock);

module.exports = router;

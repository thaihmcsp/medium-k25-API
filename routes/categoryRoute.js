const router = require('express').Router();
const Category_Controler =require("../controllers/categoryController")

router.get("/api", Category_Controler.getAllCategory);
router.get("/api1", Category_Controler.getOneCategories);
router.post("/api", Category_Controler.createCategory);
router.put("/api/:id", Category_Controler.updateCategory);
router.delete("/api/:id", Category_Controler.deleteCategory);



module.exports = router;
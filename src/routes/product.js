const router = require("express").Router();
const productController = require("../controller/product");

router.get("/get", productController.get);
router.get("/get", productController.getPagination);
router.post("/create", productController.create);
router.put("/update/:id", productController.update);
router.delete("/delete/:id", productController.delete);
module.exports = router;

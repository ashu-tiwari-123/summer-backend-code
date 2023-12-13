const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const verifyUser = require("../middlewares/authMiddle");

router.post("/create", verifyUser, productController.createProduct);
router.put("/:id", verifyUser, productController.updateProduct);
router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);
router.delete("/:id", verifyUser, productController.deleteProduct);

module.exports = router;

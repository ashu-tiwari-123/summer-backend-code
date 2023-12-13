const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const verifyUser = require("../middlewares/authMiddle");

router.post("/create", verifyUser, categoryController.createCategory);
router.post("/", verifyUser, categoryController.createParentCategory);
router.get("/", categoryController.getCategory);
router.get("/parent", categoryController.getParentCategory);
router.put("/:id", verifyUser, categoryController.updateCategory);
router.delete("/:id", verifyUser, categoryController.deleteCategory);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyUser = require("../middlewares/authMiddle");

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logOut);
router.put("/:id", verifyUser, userController.updateUser);
router.put("/pass/:id", verifyUser, userController.changePassword);
router.get("/", verifyUser, userController.getUser);
router.get("/:id", verifyUser, userController.getUserById);
router.delete("/:id", verifyUser, userController.deleteUser);

module.exports = router;

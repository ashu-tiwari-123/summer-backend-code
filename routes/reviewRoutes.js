const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const verifyUser = require("../middlewares/authMiddle");

router.post("/add-review", verifyUser, reviewController.createReview);
router.get("/:id", reviewController.getReview);
// router.delete('/remove',verifyUser,cartController.removeCartItem)

module.exports = router;

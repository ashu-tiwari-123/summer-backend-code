const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const verifyUser = require("../middlewares/authMiddle");

router.post("/add-to-cart", verifyUser, cartController.addToCart);
// router.post("/update", verifyUser, cartController.updateCartItem);
router.get('/cart',verifyUser,cartController.getCart)
router.delete('/remove',verifyUser,cartController.removeCartItem)


module.exports = router;

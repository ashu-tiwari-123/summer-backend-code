const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const verifyUser = require("../middlewares/authMiddle");

router.post("/create", verifyUser, orderController.createOrder);
// router.post("/payment", verifyUser, orderController.paymentVerification);
router.get("/:id", verifyUser, orderController.getOrder);
router.get("/order/:id", verifyUser, orderController.getOrderbyId);
router.get("/", verifyUser, orderController.getAllOrder);
router.get("/sales/top", orderController.getAllSoldItem);
router.put("/:id/placed", verifyUser, orderController.placeOrder);
router.put("/:id/confirmed", verifyUser, orderController.confirmOrder);
router.put("/:id/shiped", verifyUser, orderController.shipOrder);
router.put("/:id/delivered", verifyUser, orderController.deliverOrder);
router.put("/:id/cancelled", verifyUser, orderController.cancelOrder);
router.delete("/:id", verifyUser, orderController.deleteOrder);

module.exports = router;

const Address = require("../model/addressModel");
const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");
const User = require("../model/userModel");
const Razorpay = require("razorpay");

//demo order creation with payment integration
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const orderCreatePayment = async (req, res) => {
  const options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
};

const createOrder = async (req, res) => {
  let id = req.user._id;
  try {
    let address;
    const user = await User.findById(id).populate("cart").populate("address");
    address = new Address({
      user: id,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pin,
      mobile: req.body.mobile,
    });
    await address.save();
    user.address.push(address);
    let cart = await user.cart;
    let order = new Order({
      user: id,
      orderItems: cart.items,
      totalDiscountPrice: cart.totaldiscountPrice,
      totalPrice: cart.totalPrice,
      shippingAddress: address,
      PaymentType: req.body.type,
      status: "Confirmed",
    });
    user.orders.push(order);
    await order.save();
    await Cart.findByIdAndDelete(cart._id);
    await user.save();
    // const options = {
    //   amount: cart.totaldiscountPrice, // amount in the smallest currency unit
    //   currency: "INR",
    // };
    // const orderPay = await instance.orders.create(options);
    return res.status(200).send({ message: "Order", order, success: true });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// const paymentVerification = async = (req,res)=>{
//   console.log(req.body);
// }

const getOrder = async (req, res) => {
  const { id } = req.user._id;
  try {
    const user = await User.findById(id).populate("orders");
    if (!order) {
      throw new Error("No order Found!");
    }
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getOrderbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("orderItems")
      .populate("shippingAddress")
      .populate({
        path: "orderItems",
        populate: "product",
      });
    if (!order) {
      throw new Error("No order Found!");
    }
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find().populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    });
    if (!order) {
      throw new Error("No order Found!");
    }
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllSoldItem = async (req, res) => {
  try {
    const order = await Order.find().populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    });
    if (!order) {
      throw new Error("No order Found!");
    }
    let product = [];
    // const product = order.orderItems
    for (let index = 0; index < order.length; index++) {
      console.log(order[index].orderItems);
      product.push(order[index].orderItems);
    }
    return res.status(200).send({ message: "Order", product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//  Admin status updates

const placeOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    order.status = "Placed";
    await order.save();
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const confirmOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    order.status = "Confirmed";
    await order.save();
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const shipOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    order.status = "Shipped";
    await order.save();
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deliverOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    order.status = "Delivered";
    await order.save();
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    order.status = "Cancelled";
    await order.save();
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    return res.status(200).send({ message: "Order", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
module.exports = {
  createOrder,
  getOrder,
  getAllOrder,
  getAllSoldItem,
  placeOrder,
  confirmOrder,
  cancelOrder,
  deliverOrder,
  shipOrder,
  deleteOrder,
  getOrderbyId,
};

const Cart = require("../model/cartModel");
const Product = require("../model/productModel");
const User = require("../model/userModel");

const addToCart = async (req, res) => {
  try {
    let { productId, userId, quantity } = req.body;
    let product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      throw new Error("Product not found!");
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    let user = await User.findById(userId);
    if (cartItem) {
      cartItem.quantity += quantity;
      
      if (cartItem.quantity === 0) {
        cart.items.remove(cartItem);
      }
      // cartItem.discountPrice+= product.discountPrice * cartItem.quantity;
      // cartItem.discountPercent+= product.discountPercent;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        discountPrice: product.discountPrice,
        discountPercent: product.discountPercent,
      });
    }
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    cart.totaldiscountPrice = cart.items.reduce(
      (total, item) => total + item.discountPrice * item.quantity,
      0
    );
    await cart.save();
    user.cart = new Cart(cart);
    await user.save();
    return res.status(201).send({
      message: "Item added to cart successfully",
      cart,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    let { _id } = req.user;
    const cart = await Cart.findOne({ user: _id }).populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    return res.status(201).send({ message: "Cart", cart });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error("No cart found!");
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.total = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    return res.status(201).send({ message: "Cart", cart });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { addToCart, getCart, removeCartItem };

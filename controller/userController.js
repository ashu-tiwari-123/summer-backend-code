const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const { generateToken } = require("../config/jwtToken");
const Cart = require("../model/cartModel");

const createUser = async (req, res) => {
  let { firstname, lastname, email, password, mobile } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (user) {
      throw new Error("User already Exists!");
    }
    password = await bcrypt.hash(password, 10);
    const cart = new Cart();
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      mobile,
    });
    return res.status(200).send({ message: "Register Success", success: true , newUser });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User doesn't exists");
    }
    const passMatched = await bcrypt.compare(password, user.password);
    if (!passMatched) {
      throw new Error("Invalid Password!");
    }
    const token = await generateToken(user._id);
    return res
      .status(201)
      .send({ message: "Login Successful", token, success: true, user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).send({ message: "Updated Successfully", user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find().populate("cart");
    res.status(201).send({ message: "Users", users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("cart").populate("orders");
    res.status(201).send({ message: "User", user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(201).send({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  let { password } = req.body;
  const tokenUser = req.user;
  try {
    const user = await User.findById(id);
    // if (tokenUser._id !== id) {
    //   res
    //     .status(201)
    //     .send({ message: "You can't change another user password" });
    // }
    password = await bcrypt.hash(password, 10);
    user.password = password;
    const newPass = await user.save();
    res.status(201).send({ message: "Password Changed Succesfully", newPass });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const logOut = async (req,res)=>{
  try {
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getUser,
  getUserById,
  deleteUser,
  changePassword,
  logOut
};

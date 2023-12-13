const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const SECRET = process.env.JWT_SECRET || 1234567789;

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).send("No token found! Authorization Failed");
    }
    const verify = jwt.verify(token, SECRET);
    const user = await User.findById(verify.id);
    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  next();
};

module.exports = verifyUser;

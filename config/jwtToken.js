const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || 1234567789;
const generateToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: "7d" });
};

module.exports = { generateToken };

// Imports
const express = require("express");
const connectDB = require("./config/mongoDB");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
var bodyParser = require("body-parser");

//cors
app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Routes
app.use("/api/user/", userRoutes);
app.use("/api/product/", productRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/cart/", cartRoutes);
app.use("/api/order/", orderRoutes);
app.use("/api/review/", reviewRoutes);

// Server
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running at port ", PORT);
});

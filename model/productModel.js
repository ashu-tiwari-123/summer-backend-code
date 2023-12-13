const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: Number,
    imageUrl: {
      type: String,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      required: true,
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      }
    ],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", ProductSchema);

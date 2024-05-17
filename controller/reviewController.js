const Product = require("../model/productModel");
const Review = require("../model/reviewModel");

const createReview = async (req, res) => {
  const user = req.user;
  try {
    const { productId, text, rating } = req.body;
    const product = await Product.findById(productId);
    const review = new Review({
      reviewer: user._id,
      reviewedItem: product._id,
      text,
      rating,
    });
    product.review.push(review);
    await review.save();
    await product.save();
    res.json({ message: "Review created successfully", review });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getReview = async (req, res) => {
  const { id } = req.params;
  try {
    let data = [];
    let total=0;
    let ratings;
    const product = await Product.findById(id);
    const review = product.review;
    for (let index = 0; index < review.length; index++) {
      data.push(await Review.findById(review[index]));
      total = data[index].rating + total;
    }
    ratings = (total / (review.length * 5)) * 5;
    res.json({ message: "Review fetched successfully", ratings });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { getReview, createReview };

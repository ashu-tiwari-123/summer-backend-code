const Product = require("../model/productModel");
const Review = require("../model/reviewModel");

const createReview = async (req, res) => {
    const user = req.user
  try {
    const {productId, text, rating } = req.body;
    const product = await Product.findById(productId);
    const review = new Review({
      reviewer:user._id,
      reviewedItem:product._id,
      text,
      rating,
    });
    product.review.push(review)
    await review.save();
    await product.save();
    res.json({ message: "Review created successfully", review });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getReview = async(req,res)=>{
    const {id} = req.params
    try {
        const review = await Review.findById(id).populate("reviewer").populate("reviewedItem")
        res.json({ message: "Review created successfully", review });
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {getReview ,createReview}
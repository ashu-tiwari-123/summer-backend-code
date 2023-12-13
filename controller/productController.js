const Product = require("../model/productModel");
const Category = require("../model/categoryModel");
const Parent = require("../model/parentCategoryModel");

const createProduct = async (req, res) => {
  const category = await Parent.findOne({ name: req.body.category });
  try {
    let product;
    if (!category) {
      throw new Error("Category not found");
    }
    let image = [];
    image.push(req.body.image1)
    image.push(req.body.image2)
    image.push(req.body.image3)
    let disPer =
      ((req.body.price - req.body.discountPrice) * 100) / req.body.price;
    if (category) {
      product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        imageUrl: req.body.imageUrl,
        color: req.body.color,
        quantity: req.body.quantity,
        category: category._id,
        discountPercent: disPer.toFixed(),
        discountPrice: req.body.discountPrice,
        images:image
      });
      await product.save();
    }
    return res.status(200).send({ message: "Product", product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.find().populate("category");
    return res.status(200).send({ message: "Products", product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .populate("category")
      .populate("review")
      .populate({
        path: "review",
        populate: {
          path: "reviewer",
        },
      });
    return res.status(200).send({ message: "Product", product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).send({ message: "Deleted Product", product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send({ message: "Updated Product", product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};

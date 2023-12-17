
const Parent = require("../model/parentCategoryModel");

const createParentCategory = async (req, res) => {
  let {name,image } = req.body;
  try {
    const cat = await Parent.findOne({ name: name });
    if (cat) {
      throw new Error("Category already exists");
    }
    const parent = await Parent.create({
      name,
      image
    });
    res.status(200).send({ message: "New Category", parent });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const createCategory = async (req, res) => {
  let { name, parent } = req.body;
  try {
    const cat = await Category.findOne({ name: name });
    const par = await Parent.findById(parent);
    if (cat) {
      throw new Error("Category already exists");
    }
    const category = await Category.create({
      name,parent,
    });
    // let p = new Parent({
    //   child:
    // })
    res.status(200).send({ message: "New Category", category });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find().populate("parent");
    res.status(200).send({ message: "Categories", category });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getParentCategory = async (req, res) => {
  try {
    const category = await Parent.find().populate("child");
    res.status(200).send({ message: "Categories", category });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Categories", category });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Parent.findByIdAndDelete(id);
    res.status(200).send({ message: "deleted Category"});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  createParentCategory,
  getParentCategory
};

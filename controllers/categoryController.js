const Category = require("../models/Category");

//create
module.exports.createCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      CategoryName: req.body.CategoryName,
    });

    if (category) {
      return res
        .status(400)
        .json({ status: "Fail", message: "Category already exists" });
    }

    const newCategory = await Category.create(req.body);

    res.status(200).json({
      status: "success",
      data: { newCategory },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

//find one
module.exports.getOneCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

//find all
module.exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

//find one
module.exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find category",
      });
    }
    const newCategory = await Category.updateOne(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      status: "success",
      data: { newCategory },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

//delete by id
module.exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find category",
      });
    }

    await Category.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: "Delete category successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

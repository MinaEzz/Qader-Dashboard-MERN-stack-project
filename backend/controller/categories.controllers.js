const { SUCCESS, ERROR, FAIL } = require("../utils/httpStatusText");
const Category = require("../models/category.model");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      const error = new Error("No Categories Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { categories } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const matchedCategory = await Category.findOne({ _id: categoryId });
    if (!matchedCategory) {
      const error = new Error("Category Not Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { category: matchedCategory } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const addCategory = async (req, res, next) => {
  const body = req.body;
  const createdCategory = new Category(body);
  try {
    const hasCategory = await Category.findOne({ name: body.name });
    if (!hasCategory) {
      await createdCategory.save();
      res
        .status(201)
        .json({ status: SUCCESS, data: { category: createdCategory } });
    } else {
      const error = new Error("Category Is Already Exist.");
      error.status = FAIL;
      error.code = 409;
      return next(error);
    }
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const body = req.body;
  try {
    let updatedCategory = await Category.findByIdAndUpdate(categoryId, {
      $set: { ...body },
    });
    if (!updatedCategory) {
      const error = new Error("Category Not Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { category: updatedCategory } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      const error = new Error("Category Not Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { Category: deletedCategory } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};

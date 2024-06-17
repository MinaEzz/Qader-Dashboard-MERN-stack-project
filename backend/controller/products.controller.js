const { SUCCESS, ERROR, FAIL } = require("../utils/httpStatusText");
const Product = require("../models/product.model");
const Category = require("../models/category.model")


const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      const error = new Error("No Products Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { products } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const matchedProduct = await Product.findOne({ _id: productId });
    if (!matchedProduct) {
      const error = new Error("Product Not Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res
      .status(200)
      .json({ status: SUCCESS, data: { product: matchedProduct } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const addProduct = async (req, res, next) => {
  const body = req.body;
  try {
    const category = await Category.findOne({ name: body.categoryName });
    if (category) {
      const createdProduct = new Product({ ...body, category: category._id });
      await createdProduct.save();
      res.status(201).json({ status: SUCCESS, data: { product: createdProduct } });
    } else {
      const error = new Error(`Category "${body.categoryName}" Is Not Exists.`);
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const {productId} = req.params
  const {title, description, price, categoryName, image} = req.body
  try {
    const category = await Category.findOne({name: categoryName})
    if(!category) {
      const error = new Error(`Category "${categoryName}" Is Not Exists.`);
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
      const updateData = {title, description, price, category: category._id, image} 
      const updatedProduct = await Product.findByIdAndUpdate(productId,{$set: updateData} ,{ new: true })
      if(!updatedProduct){
        const error = new Error("Product Not Found.");
        error.status = FAIL;
        error.code = 404;
        return next(error);
      }
      res.status(200).json({ status: SUCCESS, data: { product: updatedProduct } });
    
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
}

const searchProduct = async (req, res, next) => {
  const { searchTerm } = req.params;
  try {
    // Use a regular expression to perform a case-insensitive search
    const searchRegex = new RegExp(searchTerm, "i");
    const filter = {
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    };
    const products = await Product.find(filter);
    if (!products || products.length === 0) {
      const error = new Error("No Products Found Matches Your Search Term.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { products } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      const error = new Error("Product Not Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { product: deletedProduct } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const deleteAllProducts = async (req, res, next) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ status: SUCCESS, data: null });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  searchProduct,
  deleteProduct,
  deleteAllProducts,
  updateProduct
};

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  searchProduct,
  deleteProduct,
  deleteAllProducts,
  updateProduct
} = require("../controller/products.controller");


router.route("/").get(getAllProducts).post(addProduct).delete(deleteAllProducts)
router.route("/:productId").get(getProductById).delete(deleteProduct).patch(updateProduct)
router.route("/search/:searchTerm").get(searchProduct);

module.exports = router;

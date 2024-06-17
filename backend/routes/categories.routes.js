const router = require("express").Router();
const { getAllCategories, addCategory, updateCategory, deleteCategory, getCategoryById } = require("../controller/categories.controllers");

router.route("/").get(getAllCategories).post(addCategory)
router.route("/:categoryId").get(getCategoryById).patch(updateCategory).delete(deleteCategory)

module.exports = router;

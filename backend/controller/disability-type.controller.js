const { SUCCESS, ERROR, FAIL } = require("../utils/httpStatusText");
const DisabilityType = require("../models/disability-type.model");
const Category = require("../models/category.model")


const getAllDisabilities = async (req, res, next) => {
  try {
    const disabilities = await DisabilityType.find();
    if (!disabilities || disabilities.length === 0) {
      const error = new Error("No Disabilities Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { disabilities } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

const addDisability = async (req, res, next) => {
  const {name, categoryName} = req.body;
  try {
    const category = await Category.findOne({ name: categoryName });
    if (category) {
      const createdDisability = new DisabilityType({
        name,
        category: category._id,
      });
      await createdDisability.save();
      res
        .status(201)
        .json({ status: SUCCESS, data: { disapility: createdDisability } });
    } else {
      const error = new Error(`Category "${categoryName}" Is Not Exists.`);
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

module.exports = { getAllDisabilities, addDisability };

const { SUCCESS, ERROR, FAIL } = require("../utils/httpStatusText");
const Admin = require("../models/admin.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res, next) => {
  const {name, email, password} = req.body;

  try {
    const hasAdmin = await Admin.findOne({email: email});
    if (!hasAdmin) {
      const hashedPassword = await bcrypt.hash(password, 12);
      if (!hashedPassword) {
        const error = new Error("Couldn't Create User, Please Try Again.");
        error.status = ERROR;
        error.code = 500;
        return next(error);
      }
      const createdAdmin = new Admin({name, email, password: hashedPassword});
      await createdAdmin.save();

      const token = jwt.sign(
        { userId: createdAdmin._id, name: createdAdmin.name },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      if (!token) {
        const error = new Error("Couldn't Create User, Please Try Again.");
        error.status = ERROR;
        error.code = 500;
        return next(error);
      }

      res.status(201).json({
        status: SUCCESS,
        data: {
          user: createdAdmin,
          token: token,
        },
      });
    } else {
      const error = new Error("User Is Already Exist, Please Login Instead.");
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

const login = async (req, res, next) => {
  const { identifier, password } = req.body;

  try {
    const identifiedAdmin = await Admin.findOne({
      $or: [
        { email: identifier },
        { name: identifier },
      ],
    });
    if (!identifiedAdmin) {
      const error = new Error(
        "Couldn't Identify The User, Credentials Seem To Be Wrong."
      );
      error.status = FAIL;
      error.code = 401;
      return next(error);
    }

    const isValidPassword = await bcrypt.compare(
      password,
      identifiedAdmin.password
    );
    if (!isValidPassword) {
      const error = new Error(
        "Couldn't Identify The User, Credentials Seem To Be Wrong."
      );
      error.status = FAIL;
      error.code = 401;
      return next(error);
    }

    const token = jwt.sign(
      { userId: identifiedAdmin._id, name: identifiedAdmin.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    if (!token) {
      const error = new Error("Couldn't Login, Please Try Again.");
      error.status = ERROR;
      error.code = 500;
      return next(error);
    }
    res.status(200).json({
      status: SUCCESS,
      data: {
        user: identifiedAdmin,
        token: token,
      },
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
};

module.exports = { signUp, login };

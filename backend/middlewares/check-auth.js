const { FAIL, ERROR } = require("../utils/httpStatusText");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // authorization: 'bearer ...token'
    if (!token) {
      const error = new Error("Authentication Faild.");
      error.status = FAIL;
      error.code = 401;
      return next(error);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = { user: decodedToken };
    next();
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 401;
    return next(error);
  }
};

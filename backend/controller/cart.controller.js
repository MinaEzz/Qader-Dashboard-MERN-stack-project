const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const addToCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  if (!quantity || quantity < 1) {
    const error = new Error("Quantity Must Be At Least 1.");
    error.status = FAIL;
    error.code = 404;
    return next(error);
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Product Not Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If the cart does not exist, create a new one
      cart = new Cart({
        userId,
        items: [],
        total: 0,
      });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // If the product is already in the cart, update the quantity and price
      existingItem.quantity += quantity;
      existingItem.price = product.price * existingItem.quantity;
    } else {
      // If the product is not in the cart, add it
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price * quantity,
      });
    }

    // Update the total price of the cart
    cart.total = cart.items.reduce((acc, item) => acc + item.price, 0);

    await cart.save();

    return res
      .status(200)
      .json({ status: SUCCESS, data: { cart }, message: "Cart Updated" });
  } catch (err) {
    const error = new Error(err.message);
    error.status = "error";
    error.code = 500;
    return next(error);
  }
};

const getCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart) {
      const error = new Error("Cart not found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = "error";
    error.code = 500;
    return next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        cart.total = cart.items.reduce((acc, item) => acc + item.price, 0);
        await cart.save();
      }
      res.status(200).json({
        status: "success",
        data: {
          cart,
        },
      });
    } else {
      const error = new Error("Cart not found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
  } catch (err) {
    const error = new Error(err.message);
    error.status = "error";
    error.code = 500;
    return next(error);
  }
};

module.exports = { addToCart, getCart, removeFromCart };

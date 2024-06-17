const mongoose = require("mongoose");

// create schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rate: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    feedback: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
  },
  { timestamps: true }
);

// create model
module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");
// create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// create model
module.exports = mongoose.model("Category", categorySchema);

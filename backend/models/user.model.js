const mongoose = require("mongoose");
// create Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    age: Number,
    image: { type: String },
    disabilityType: {
      name: { type: String, required: true },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DisabilityType",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// create model
module.exports = mongoose.model("User", userSchema);

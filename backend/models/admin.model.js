const mongoose = require("mongoose");
// create Schema
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})


module.exports = mongoose.model("Admin", adminSchema)
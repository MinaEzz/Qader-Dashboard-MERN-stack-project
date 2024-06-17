const mongoose = require('mongoose')

// create schema
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      location: {
        type: String,
        required: true,
        trim: true
      },
      expectedSalary: {
        type: Number,
        required: true
      },
      applyLink: {
        type: String,
        required: true,
        trim: true
      }
}, { timestamps: true })

// create model

module.exports = mongoose.model("Job", jobSchema)
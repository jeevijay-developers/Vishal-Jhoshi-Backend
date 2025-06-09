const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema(
  {
    class: { type: String, required: true },
    target: { type: String, required: true },
    subject: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Homework", homeworkSchema);

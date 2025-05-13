const mongoose = require("mongoose");

const TestQuestionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    // enum: ["physics", "chemistry", "maths", "biology"], // Only allow specific subjects
  },
  topic: {
    type: String,
    // required: true,
    default: null,
  },
  subtopic: {
    type: String,
  },
  level: {
    type: String,
    // required: true,
    enum: ["easy", "intermediate", "hard"], // Ensure predefined levels
    default: "intermediate",
  },
  type: {
    type: String,
    required: true,
    enum: ["INTEGER", "BOOLEAN"], // Specific question types
  },
  description: {
    type: String,
    required: true,
  },
  descriptionImage: {
    type: String,
    default: null,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  marks: {
    correct: {
      type: Number,
      default: 0,
    },
    incorrect: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model("TestQuestion", TestQuestionSchema);

const mongoose = require("mongoose");

const SelectTestQuestionSchema = new mongoose.Schema({
  subject: { type: String, default: "" }, // e.g., "Physics"
  topic: { type: String, default: "" }, // e.g., "Kinematics"
  subtopic: { type: String, default: "" }, // e.g., "Equations of motion"
  level: { type: String, default: "easy" }, // Level of difficulty
  type: {
    type: String,
    lowercase: true,
  }, // Question type
  reason: {
    type: String,
    default: "",
  },
  assertionEnglish: {
    type: String,
    default: "",
  },
  description: { type: String, default: "" }, // Question description text
  descriptionImage: { type: String, default: null }, // Base64 or image URL for the description image
  optionType: { type: String, default: "text", enum: ["text", "textImage"] }, // Option type
  textOptionsA: { type: String, default: "" }, // Option A (Text)
  textOptionsB: { type: String, default: "" }, // Option B (Text)
  textOptionsC: { type: String, default: "" }, // Option C (Text)
  textOptionsD: { type: String, default: "" }, // Option D (Text)
  imageOptionsA: { type: String, default: "" }, // Option A (Image URL or base64)
  imageOptionsB: { type: String, default: "" }, // Option B (Image URL or base64)
  imageOptionsC: { type: String, default: "" }, // Option C (Image URL or base64)
  imageOptionsD: { type: String, default: "" }, // Option D (Image URL or base64)
  correctAnswer: { type: [String], default: [] }, // Array of correct answers (for multi-select)
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

module.exports = mongoose.model("SelectTestQuestion", SelectTestQuestionSchema);

// export default TestQuestion;

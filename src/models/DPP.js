const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  questionType: { type: String, required: true, lowercase: true },
  subject: { type: String, required: true },
});

const dppSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      enum: ["10", "11", "12", "DROP"],
      default: "DROP",
      required: true,
      uppercase: true,
    },
    subject: {
      type: String,
      required: true,
      lowecase: true,
    },
    chapter: {
      type: String,
      required: true,
      lowecase: true,
    },
    topic: {
      type: String,
      required: true,
      lowecase: true,
    },
    publish: {
      type: Boolean,
      required: true,
      default: false,
    },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

const DPP = mongoose.model("DPP", dppSchema);
module.exports = DPP;

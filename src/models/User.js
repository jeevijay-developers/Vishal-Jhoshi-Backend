const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  location: String,
  birthDate: Date,
  image_url: { type: String, default: "" },
  bannerImage: { type: String, default: "" },
  role: { type: String, default: "student" },
  progressId: { type: mongoose.Schema.Types.ObjectId, ref: "Progress" },
  studySessions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "StudySession" },
  ],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  target: { type: String, required: true },
  mentors: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
  seenBy: [{ type: String }], // Array of user IDs who have seen the message
  mentorship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentorship",
    default: null,
  },
  status: { type: Boolean, default: true }, // true for active, false for inactive
});

module.exports = mongoose.model("User", userSchema);

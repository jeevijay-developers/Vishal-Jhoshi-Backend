const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema({
  ranking: {
    type: Number,
    default: 0,
  },
  experties: [
    {
      type: String,
    },
  ],
  experience: {
    type: String,
  },
  menteesCount: {
    type: Number,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Mentorship = mongoose.model("Mentorship", mentorshipSchema);
module.exports = Mentorship;

const mongoose = require("mongoose");
const Message = require("./Message"); // Import the Message model

const roomSchema = new mongoose.Schema(
  {
    firstRoom: { type: String, required: true },
    secondRoom: { type: String, required: true },
    firstUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    secondUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seenBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    chats: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ], // Reference to Message model
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatRoom", roomSchema);

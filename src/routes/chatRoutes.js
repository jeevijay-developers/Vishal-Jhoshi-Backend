const express = require("express");
const {
  userChats,
  chatUserList,
  removeSeen,
  updateSeen,
  getAllRoomsById,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/chat/:userId/:selectedUser", userChats);
router.get("/remove/:userId/:selectedUser", removeSeen);
router.get("/update/:userId/:selectedUser", updateSeen);
router.post("/chatUserList", chatUserList);
router.get("/chatRooms/:userId", getAllRoomsById);

module.exports = router;

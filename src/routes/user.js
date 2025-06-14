const express = require("express");
const {
  getMyProfile,
  updateProfile,
  getOtherUserProfile,
  getUserProgress,
  updateUserProgress,
  startStudySession,
  stopStudySession,
  updateImage,
  getStudySessions,
  getAllStudySessions,
  getAllMentors,
  createMentorship,
  getMentorshipDetails,
  getAllMentorsAndStudents,
  getMyMentor,
  getAllStudents
} = require("../controllers/userController");
const {
  updateUserInfo,
  updateImageUrl,
  createNewMentor,
  assignMentor,
} = require("../controllers/authController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/me", getMyProfile);

router.put("/update-user/:userId", updateUserInfo);

router.put("/me", updateProfile);

router.get("/users/:userId", getOtherUserProfile);
router.get("/mentors", getAllMentors);
router.get("/all-students", getAllStudents);
router.post("/create-mentorship/:userId", createMentorship);
router.get("/get-mentorship/:userId", getMentorshipDetails);
router.post("/create-new-mentor", createNewMentor);

router.post("/update-image/", updateImage);

router.put(
  "/update-image-url/:userId/:target",
  upload.single("image"),
  updateImageUrl
);

router.get("/progress/:progressId", getUserProgress);

router.post("/progress/:progressId", updateUserProgress);

router.post("/studyMode/startStudySession", startStudySession);

router.post("/studyMode/stopStudySession", stopStudySession);

router.post("/studyMode/stopStudySession", stopStudySession);

router.get("/studyMode/study-sessions", getStudySessions);
router.get("/studyMode/all/:userId", getAllStudySessions);
router.get("/get-all-mentors-students", getAllMentorsAndStudents);

router.put("/assign-mentor/:userId/:mentorId", assignMentor);
router.get("/get-my-mentor/:userId", getMyMentor);

module.exports = router;

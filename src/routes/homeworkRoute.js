const {
  createNewHomeWork,
  getAllHomeWorks,
} = require("../controllers/homeController");

const router = require("express").Router();

router.post("/homework/add", createNewHomeWork);
router.get("/homework/get-all", getAllHomeWorks);

module.exports = router;

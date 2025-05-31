const DPP = require("../models/DPP");

const router = require("express").Router();
const testController = require("../controllers/testController");

router.post("/add-dpp-details", async (req, res) => {
  try {
    const dppDetails = req.body;

    if (
      dppDetails.class === "" ||
      dppDetails.subject === "" ||
      dppDetails.chapter === "" ||
      dppDetails.topic === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDpp = new DPP(dppDetails);
    const dpp = await newDpp.save();

    return res
      .status(201)
      .json({ message: "DPP details added successfully", data: dpp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/create/dpp/select-dpp-question/:id",
  testController.createSelectQuestionForDPP
);
router.post(
  "/create/dpp/integer-dpp-question/:id",
  testController.createintTestForDPP
);

router.put("/dpp/publish-dpp/:id", async (req, res) => {
  try {
    const dppId = req.params.id;

    const dpp = await DPP.findById(dppId);
    if (!dpp) {
      return res.status(404).json({ message: "DPP not found" });
    }

    dpp.publish = true;
    await dpp.save();

    return res.status(200).json({ message: "DPP published successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

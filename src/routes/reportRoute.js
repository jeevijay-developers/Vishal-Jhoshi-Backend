const express = require("express");
const User = require("../models/User");
const router = express.Router();
// const { getAdminTodoReport } = require("../controllers/progressController");
const ReportMentor = require("../models/ReportMentor");
// import { getAdminTodoReport } from "../controllers/progressController";
// import ReportMentor from "../models/ReportMentor";
// import User from "../models/User";

// router.get("/admin/:adminTodoId", getAdminTodoReport);

router.post("/report-mentor", async (req, res) => {
  try {
    const { mentorId, message, reason } = req.body;
    console.log(mentorId, message, reason);

    if (!mentorId) {
      return res.status(400).json({ error: "Mentor ID is required" });
    }

    // Optionally sanitize strings
    const cleanMessage = message.trim();
    const cleanReason = reason.trim();

    // Check if mentor exists
    const mentor = await User.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Save report
    const report = new ReportMentor({
      mentorId,
      message: cleanMessage,
      report: cleanReason,
    });

    const savedReport = await report.save();

    res.status(201).json({
      success: true,
      message: "Report submitted successfully.",
      data: savedReport,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

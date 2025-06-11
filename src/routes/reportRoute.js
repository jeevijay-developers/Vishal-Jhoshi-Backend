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
router.get("/report-mentor", async (req, res) => {
  try {
    const reports = await ReportMentor.find().populate("mentorId");

    const mentorMap = new Map();

    reports.forEach((rep) => {
      const mentorId = rep.mentorId._id.toString();

      if (mentorMap.has(mentorId)) {
        mentorMap.get(mentorId).count += 1;
      } else {
        mentorMap.set(mentorId, {
          mentor: rep.mentorId,
          count: 1,
        });
      }
    });

    // Convert the map to an array to return as JSON
    const data = Array.from(mentorMap.values());
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get-report-mentor/:id", async (req, res) => {
  try {
    const reports = await ReportMentor.find({ mentorId: req.params.id });
    return res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;

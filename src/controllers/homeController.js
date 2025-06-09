const Homework = require("../models/Homework");

exports.createNewHomeWork = async (req, res) => {
  try {
    const homeWork = req.body;

    if (
      !homeWork.class ||
      !homeWork.target ||
      !homeWork.subject ||
      !homeWork.link
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const HOME_WORK = await Homework.create(homeWork);
    res.status(201).json(HOME_WORK);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllHomeWorks = async (req, res) => {
  try {
    const homeWork = await Homework.find({}).sort({ createdAt: -1 });
    res.status(200).json(homeWork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

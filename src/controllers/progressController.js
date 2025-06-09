const TodoAssignment = require("../models/AdminTodo");
// const StudentTodo = require('../models/StudentTodo');

// exports.getAdminTodoReport = async (req, res) => {
//   try {
//     const { adminTodoId } = req.params;

//     const assignments = await TodoAssignment.find({ adminTodoId })
//       .populate("studentId")
//       .populate("studentTodoId");

//     const report = assignments.map((entry) => ({
//       student: entry.studentId,
//       completion: entry.studentTodoId.completionPercentage,
//     }));

//     res.json(report);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

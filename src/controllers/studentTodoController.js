const StudentTodo = require('../models/StudentTodo');

exports.updateSubtaskStatus = async (req, res) => {
  try {
    const { studentTodoId, subtaskIndex, status } = req.body;

    const studentTodo = await StudentTodo.findById(studentTodoId);
    if (!studentTodo) return res.status(404).json({ error: 'Student todo not found' });

    studentTodo.todos[subtaskIndex].status = status;

    const completed = studentTodo.todos.filter(t => t.status === true).length;
    studentTodo.completionPercentage = (completed / studentTodo.todos.length) * 100;

    await studentTodo.save();

    res.json({ message: 'Updated successfully', studentTodo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

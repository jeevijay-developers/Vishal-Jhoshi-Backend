const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentTodoController');

router.post('/update-subtask', controller.updateSubtaskStatus);
router.get('/get-students-todo', controller.getStudentTodos); // to request admin todo for student, it checks if the student's todo exist or not
router.get('/get-students', controller.getStudents);

module.exports = router;

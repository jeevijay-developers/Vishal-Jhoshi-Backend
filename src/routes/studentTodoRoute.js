const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentTodoController');

router.post('/update-subtask', controller.updateSubtaskStatus);
router.get('/get-students-todo/:id', controller.getStudentTodos); 
router.get('/get-students', controller.getStudents);

module.exports = router;

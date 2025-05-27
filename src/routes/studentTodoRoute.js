const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentTodoController');

router.post('/update-subtask', controller.updateSubtaskStatus);

module.exports = router;

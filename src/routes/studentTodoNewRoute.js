const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentTodoNewController');

router.get('/get-todo/:id', controller.getTodoById);
router.get('/get-all-todo', controller.getAllTodo);
router.post('/create-todo', controller.createTodo);
router.post('/update-todo/:id', controller.updateTodo);

module.exports = router;
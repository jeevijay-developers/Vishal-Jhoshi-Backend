const express = require('express');
const router = express.Router();
const {createAdminTodo, getAdminTodos} = require('../controllers/adminTodoController');

router.post('/create-todo', createAdminTodo);
router.get('/get-todos', getAdminTodos);

module.exports = router;

const express = require('express');
const router = express.Router();
import { getAdminTodoReport } from '../controllers/progressController';

router.get('/admin/:adminTodoId', getAdminTodoReport);

module.exports = router;

const router = require('express').Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

const { authMiddleware } = require('../middleware/authMiddleware');
router.post('/create', authMiddleware, createTask);
router.get('/get', authMiddleware, getTasks);
router.put('/update/:id', authMiddleware, updateTask);
router.delete('/delete/:id', authMiddleware, deleteTask);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

// filter tasks as pending or completed
router.get('/filter', auth, taskController.getFilteredTasks);
// test route to check if tasks are working or not
router.get('/test', auth, taskController.testRoute);
//create tasks
router.post('/', auth, taskController.createTask);
//get present user tasks
router.get('/', auth, taskController.getUserTasks);
//get task info by id of the task
router.get('/:id', auth, taskController.getTaskById);
//update tasks
router.patch('/:id', auth, taskController.updateTask);
//delete tasks
router.delete('/:id', auth, taskController.deleteTask);
//share tasks
router.patch('/:id/share', auth, taskController.shareTask);
//unshare tasks
router.patch('/:id/unshare', auth, taskController.unshareTask);

module.exports = router;

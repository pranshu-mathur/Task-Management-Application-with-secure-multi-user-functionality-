const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

//Get all users
router.get('/all', userController.getAllUsers);
// Register a new user
router.post('/register', userController.registerUser);
// Login user
router.post('/login', userController.loginUser);
// Delete user and their tasks
router.delete('/me', auth, userController.deleteUserAndTasks);

module.exports = router;

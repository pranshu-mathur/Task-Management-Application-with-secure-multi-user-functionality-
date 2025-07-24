const User = require('../models/User');
const Task = require('../models/Tasks');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ _id: user._id, message: "User Created Successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Unable to login, user not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login, invalid credentials');
        }

        const token = jwt.sign(
            { _id: user._id.toString() },
            process.env.JWT_SECRET_KEY
        );

        res.send({ token, message: "Logged in successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.deleteUserAndTasks = async (req, res) => {
    try {
        const userId = req.user._id;

        await Task.deleteMany({ owner: userId });
        await Task.updateMany(
            { sharedWith: userId },
            { $pull: { sharedWith: userId } }
        );
        await req.user.deleteOne();

        res.status(200).json({ message: 'User and associated tasks cleaned up successfully' });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: 'Failed to delete user and related data' });
    }
};

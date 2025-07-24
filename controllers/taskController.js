const Task = require('../models/Tasks');
const User = require('../models/User');

exports.getFilteredTasks = async (req, res) => {
    const filter = req.query.filter || 'all';

    let query = {
        $or: [
            { owner: req.user._id },
            { sharedWith: req.user._id }
        ]
    };

    if (filter === 'completed') query.completed = true;
    else if (filter === 'pending') query.completed = false;

    try {
        const tasks = await Task.find(query);

        if (tasks.length === 0) {
            let msg = "No tasks found";
            if (filter === 'completed') msg = "No completed tasks found";
            else if (filter === 'pending') msg = "No pending tasks found";
            else msg = "You have no tasks yet";

            return res.status(200).json({ message: msg, tasks: [], count: 0 });
        }

        res.status(200).json({
            message: `Successfully fetched ${filter} tasks`,
            tasks,
            count: tasks.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

exports.testRoute = (req, res) => {
    res.json({
        message: 'Task routes are working!',
        user: req.user
    });
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, completed, sharedWith = [] } = req.body;

        const validUserIds = [];
        for (const id of sharedWith) {
            const user = await User.findById(id);
            if (user) validUserIds.push(user._id);
        }

        const task = new Task({
            title,
            description,
            dueDate,
            completed,
            owner: req.user._id,
            sharedWith: validUserIds
        });

        await task.save();
        res.status(201).json({ task, message: "Task Created and Shared Successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            $or: [
                { owner: req.user._id },
                { sharedWith: req.user._id }
            ]
        });

        res.status(200).json({
            message: "Tasks Fetched Successfully",
            tasks,
            count: tasks.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

exports.getTaskById = async (req, res) => {
    const taskid = req.params.id;

    try {
        const task = await Task.findOne({ _id: taskid, owner: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ task, message: 'Task Fetched Successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Invalid Task ID' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const task = await Task.findOne({ _id: id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only the owner can update this task' });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to update task' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        res.status(200).json({ message: 'Task deleted successfully', task });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to delete task' });
    }
};

exports.shareTask = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        const shareUser = await User.findById(userId);
        if (!shareUser) {
            return res.status(404).json({ message: 'User to share with not found' });
        }

        if (task.sharedWith.includes(shareUser._id)) {
            return res.status(400).json({ message: 'Task already shared with this user' });
        }

        task.sharedWith.push(shareUser._id);
        await task.save();

        res.status(200).json({ message: 'Task shared successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to share task' });
    }
};

exports.unshareTask = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        task.sharedWith = task.sharedWith.filter(id => id.toString() !== userId);
        await task.save();

        res.status(200).json({ message: 'User removed from shared list', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to unshare task' });
    }
};

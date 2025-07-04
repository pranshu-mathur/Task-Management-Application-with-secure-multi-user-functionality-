const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharedWith: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
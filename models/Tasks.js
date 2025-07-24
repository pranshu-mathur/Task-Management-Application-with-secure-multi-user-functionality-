const mongoose = require ('mongoose');

const jwt =require('jsonwebtoken');
const TaskSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    dueDate :{
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{timestamps: true 

});

const Task = mongoose.model('Task',TaskSchema);
module.exports = Task;

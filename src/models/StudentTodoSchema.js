const mongoose = require('mongoose');

const StudentTodoSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentName: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    todos: [
        {
            title: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            status: {
                type: String,
                enum: ['pending', 'in-progress', 'completed'],
                default: 'pending',
            },
        },
    ],
    createdBy: {
        type: String,
        default: 'student',
    }
}, { timestamps: true });

module.exports = mongoose.model("StudentTodo", StudentTodoSchema);

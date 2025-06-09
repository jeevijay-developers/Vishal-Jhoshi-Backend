const mongoose = require('mongoose')

const studentTodoNew = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    todo: [{
        title: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true
        },
    }]
})

module.exports = mongoose.model("StudentTodo", studentTodoNew);
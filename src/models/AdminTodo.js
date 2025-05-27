const mongoose = require('mongoose');

const AdminTodoSchema = new mongoose.Schema({
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
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("AdminTodo", AdminTodoSchema);

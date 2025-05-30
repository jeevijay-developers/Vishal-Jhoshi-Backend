const mongoose = require('mongoose');

const RelationshipSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adminTodoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminTodo',
        required: true
    },
    studentTodoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentTodo',
        required: true
    },
})

module.exports = mongoose.model('Relationship', RelationshipSchema);
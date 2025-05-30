const StudentTodo = require('../models/StudentTodoSchema');
const Relationship = require('../models/RelationshipSchema');
const AdminTodo = require('../models/AdminTodo');
const User = require('../models/User');

const updateSubtaskStatus = async (req, res) => {
    try {
        const { todo } = req.body;

        const studentTodo = await StudentTodo.findById(todo._id);
        if (!studentTodo) {
            return res.status(404).json({ error: 'Student todo not found' });
        }
 
        // Loop through updated todos from request and apply changes
        todo.todos.forEach((updatedTask) => {
            const task = studentTodo.todos.id(updatedTask._id); // Find subtask by _id
            if (task) {
                task.status = updatedTask.status; // Update status
            }
        });

        // Recalculate completionPercentage
        const completed = studentTodo.todos.filter(t => t.status === 'completed').length;
        studentTodo.completionPercentage = (completed / studentTodo.todos.length) * 100;

        await studentTodo.save();

        res.json({ message: 'Updated successfully', studentTodo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// It checks student's todo exist or not in Relationship schema
const getStudentTodos = async (req, res) => {

    try {
        const studentId = "6830623333272c9f92020c6f"; // Hardcoded for now
        const student = await User.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const studentName = student.name; // Assuming the field is 'name'

        const adminTodo = await AdminTodo.findOne();
        if (!adminTodo) return res.status(404).json({ message: "Admin Todo not found" });

        const existingRelation = await Relationship.findOne({
            userId: studentId,
            adminTodoId: adminTodo._id,
        });

        if (existingRelation) {
            const studentTodo = await StudentTodo.findById(existingRelation.studentTodoId);
            return res.status(200).json({ todo: studentTodo });
        }

        const newStudentTodo = new StudentTodo({
            studentId: studentId,
            studentName: studentName,
            heading: adminTodo.heading,
            todos: adminTodo.todos.map(todo => ({
                title: todo.title,
                startDate: todo.startDate,
                endDate: todo.endDate,
                status: 'pending',
            })),
            createdBy: 'student',
        });

        await newStudentTodo.save();

        const relation = new Relationship({
            userId: studentId,
            adminTodoId: adminTodo._id,
            studentTodoId: newStudentTodo._id,
        });

        await relation.save();

        res.status(201).json({ todo: newStudentTodo });
    } catch (err) {
        console.error("Error in getStudentTodos:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

const getStudents = async(req, res) => {
    try {
        const users = await StudentTodo.find();
        res.json(users?.reverse() || []);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = { updateSubtaskStatus, getStudentTodos, getStudents };

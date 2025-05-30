const AdminTodo = require('../models/AdminTodo');
const StudentTodo = require('../models/StudentTodoSchema');
const Relationship = require('../models/RelationshipSchema');

const getStudentTodos = async (req, res) => {
    try {
        const studentId = req.user._id; // assuming user is authenticated

        const adminTodo = await AdminTodo.findOne(); // assuming only 1 adminTodo
        if (!adminTodo) return res.status(404).json({ message: "Admin Todo not found" });

        // Check if Relationship exists
        const existingRelation = await Relationship.findOne({
            userId: studentId,
            adminTodoId: adminTodo._id,
        });

        if (existingRelation) {
            // Fetch student's personal todo
            const studentTodo = await StudentTodo.findById(existingRelation.studentTodoId);
            return res.status(200).json({ todo: studentTodo });
        }

        // Create new StudentTodo (copy of AdminTodo)
        const newStudentTodo = new StudentTodo({
            heading: adminTodo.heading,
            todos: adminTodo.todos.map(todo => ({
                title: todo.title,
                startDate: todo.startDate,
                endDate: todo.endDate,
                status: 'pending', // fresh copy
            })),
            createdBy: 'student',
        });

        await newStudentTodo.save();

        // Save Relationship
        const relation = new Relationship({
            userId: studentId,
            adminTodoId: adminTodo._id,
            studentTodoId: newStudentTodo._id,
        });

        await relation.save();

        res.status(201).json({ todo: newStudentTodo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

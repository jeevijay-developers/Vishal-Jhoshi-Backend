const AdminTodo = require('../models/AdminTodo');

const createAdminTodo = async (req, res) => {
  try{
    const { heading, todos } = req.body

    if (!heading) {
      return res.status(400).json({ message: "Heading is required" });
    }

    // Validate each todo
    for (const todo of todos) {
      if (!todo.title || !todo.startDate || !todo.endDate) {
        return res.status(400).json({ message: "Each todo must have title, startDate, and endDate" });
      }
    }
    
    const newTodo = await AdminTodo.create({ heading, todos });
    res.status(201).json({ message: "Admin todo created successfully", data: newTodo});

  }catch (error) {
    console.error("Error creating admin todo:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const getAdminTodos = async (req, res) => {
  try {
    const adminTodos = await AdminTodo.find();
    res.status(200).json(adminTodos);
  } catch (error) {
    console.error("Error fetching admin todos:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createAdminTodo, getAdminTodos };
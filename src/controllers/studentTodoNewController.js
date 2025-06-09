const StudentTodo = require('./../models/StudentTodoNew')

const createTodo = async (req, res) => {
    const data = req.body;
    console.log("Data: ", data);

    if (!data) {
        return res.status(400).json({ message: "Data not found" });
    }

    const { studentId, date, todo } = data;

    try {
        const newTodo = await StudentTodo.create({
            studentId: studentId,
            date: new Date(date), // or just new Date() for current date
            todo: todo.map(task => ({
                title: task.title,
                status: task.status
            }))
        });

        res.status(201).json({ message: "Todo created successfully", data: newTodo });
    } catch (error) {
        console.error("Error creating admin todo:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getTodoById = async (req, res) => {
  const studentId = req.params.id;

  const defaultTasks = [
    { title: "Do Live meditation", status: false },
    { title: "Complete the home work", status: false },
    { title: "Complete today's PYQs", status: false },
    { title: "10 Hours Study", status: false },
    { title: "Equal study time distribution between subjects", status: false },
    { title: "Live lecture attent", status: false },
  ];

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  const today = new Date();
  // console.log("Today's date: ", today);
  
  try {
    // Use aggregation match to compare only date part
    const todo = await StudentTodo.findOne({
      studentId,
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          today.toISOString().slice(0, 10),
        ],
      },
    });

    if (!todo) {
      const newTodo = await StudentTodo.create({
        studentId,
        date: new Date(),
        todo: defaultTasks,
      });

      return res.status(201).json({
        message: "New todo created for today",
        data: newTodo,
      });
    }

    return res.status(200).json({
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { todo } = req.body;

  if (!todoId || !Array.isArray(todo)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const updated = await StudentTodo.findByIdAndUpdate(
      todoId,
      { todo },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo updated", data: updated });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllTodo = async (req, res) => {
  const today = new Date();

  try {
    const todos = await StudentTodo.find({
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          today.toISOString().slice(0, 10),
        ],
      },
    });

    return res.status(200).json({
      message: "Today's Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching today's todos:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createTodo, getTodoById, updateTodo, getAllTodo }
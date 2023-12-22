import Todo from "../../models/Todo.js";

export const createTodoController = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = {
      title,
      userId: req.user.userId,
      status: false,
    };

    const newTodo = new Todo(todo);
    await newTodo.save();
    res.status(200).send({ message: "Todo is created", todo: newTodo });
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
};

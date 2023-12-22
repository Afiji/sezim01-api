import Todo from "../../models/Todo.js";

export const exportTodosController = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).select("-__v");
    res.json(todos);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

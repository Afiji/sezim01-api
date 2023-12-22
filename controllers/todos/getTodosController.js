import Todo from "../../models/Todo.js";

export const getTodosController = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).select(
      "-userId -__v"
    );
    res.status(200).json(todos);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};

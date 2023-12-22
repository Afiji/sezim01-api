import Todo from "../../models/Todo.js";

export const deleteTodoController = async (req, res) => {
  const { todoId } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};

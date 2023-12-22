import Todo from "../../models/Todo.js";

export const editTodoStatusController = async (req, res) => {
  const todoId = req.params.todoId;
  const { status } = req.body;
  // console.log(req.body);

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { status: status },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.status(200).send({
      message: "Todo status updated successfully",
      todo: updatedTodo,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};

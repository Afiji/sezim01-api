import Todo from "../../models/Todo.js";

export const editTodoNameController = async (req, res) => {
  const todoId = req.params.todoId;
  const { newName } = req.body;
  console.log(req.params.todoId);
  console.log(req.body);

  if (!newName) {
    return res.status(400).send({ message: "New name is required" });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title: newName },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.status(200).send({
      message: "Todo name updated successfully",
      todo: updatedTodo,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};

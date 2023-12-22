import Todo from "../../models/Todo.js";

export const deleteAllTodosController = async (req, res) => {
  console.log("Attempting to delete all todos for user:", req.user.userId);
  try {
    await Todo.deleteMany({ userId: req.user.userId });
    res.status(200).send({ message: "All todos have been deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import Todo from "../../models/Todo.js";
import { s3Client } from "../../multerS3.js";
import dotenv from "dotenv";

dotenv.config();

export const uploadTodoImageController = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findById(todoId);
    const imageUrl = req.file.location;
    console.log(todo);
    console.log(imageUrl);
    console.log(todoId);

    if (todo) {
      todo.imageUrl = imageUrl;
      await todo.save();
      res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl: imageUrl,
      });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};

export const deleteTodoImageController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todoId = req.params.todoId;
    const todo = await Todo.findOne({ _id: todoId, userId: userId });
    console.log(todo);
    console.log(userId);
    console.log(todoId);

    if (!todo || !todo.imageUrl) {
      return res.status(404).json({ message: "Todo or image not found" });
    }

    const fileKey = todo.imageUrl.split("/").pop();
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `todos/${fileKey}`,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    todo.imageUrl = null;
    await todo.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Deletion error:", error);
    res
      .status(500)
      .json({ message: "Error deleting image", error: error.toString() });
  }
};

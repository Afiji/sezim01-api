import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createTodoController } from "../controllers/todos/createTodoController.js";
import { getTodosController } from "../controllers/todos/getTodosController.js";
import { editTodoStatusController } from "../controllers/todos/editTodosStatusController.js";
import { editTodoNameController } from "../controllers/todos/editTodoNameController.js";
import { deleteTodoController } from "../controllers/todos/deleteTodoController.js";
import { deleteAllTodosController } from "../controllers/todos/deleteAllTodosController.js";
import { exportTodosController } from "../controllers/todos/exportTodosController.js";
import { upload } from "../multerS3.js";
import {
  uploadTodoImageController,
  deleteTodoImageController,
} from "../controllers/todos/todoImageController.js";

const router = express.Router();

router.post("/create-todo", verifyToken, createTodoController);
router.get("/get-all-todos", verifyToken, getTodosController);
router.patch(
  "/edit-todo-status/:todoId",
  verifyToken,
  editTodoStatusController
);
router.patch("/edit-todo-name/:todoId", verifyToken, editTodoNameController);
router.delete("/delete-todo/:todoId", verifyToken, deleteTodoController);
router.delete("/delete-all-todos", verifyToken, deleteAllTodosController);
router.get("/export-todos", verifyToken, exportTodosController);
router.post(
  "/upload-image/:todoId",
  verifyToken,
  upload.single("image"),
  uploadTodoImageController
);
router.delete("/delete-image/:todoId", verifyToken, deleteTodoImageController);

export default router;

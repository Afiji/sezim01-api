import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import { buildRouter } from "@adminjs/express";
import { Database, Resource } from "@adminjs/mongoose";
import Auth from "./models/Auth.js";
import Todo from "./models/Todo.js";
import todosRoutes from "./routes/todosRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
  resources: [
    {
      resource: Auth,
      options: {
        parent: { name: "Content" },
        properties: {
          name: {
            isVisible: { filter: true, show: true, edit: true, list: true },
          },
          email: {
            isVisible: { filter: true, show: true, edit: true, list: true },
          },
          hash_pass: {
            isVisible: {
              filter: false,
              show: false,
              edit: false,
              list: false,
            },
          },
        },
        actions: {
          new: {
            isAccessible: false,
          },
          edit: {
            isAccessible: true,
          },
          delete: {
            isAccessible: true,
          },
          filter: {
            isAccessible: true,
          },
        },
      },
    },
    {
      resource: Todo,
      options: {
        parent: { name: "Content" },
        propertries: {
          userId: {
            reference: "Auth",
          },
        },
      },
    },
  ],
});

const router = buildRouter(adminJs);

dotenv.config();
const app = express();
app.use(express.json());
app.use(adminJs.options.rootPath, router);
const port = process.env.PORT || 5057;
const corsOptions = {
  // origin: process.env.FRONTEND_HOST,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use("/uploads", express.static("uploads"));
// app.use(express.static("uploads"));

app.use("/todos", todosRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/register", registerRoutes);
app.use("/email", emailRoutes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connect db success"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.listen(port, () => {
  console.log("Server is running at localhost: " + port);
});

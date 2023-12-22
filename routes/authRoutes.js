import express from "express";
import { authController } from "../controllers/auth/authController.js";
import { validateAuth } from "../validators/authValidator.js";
import { validationErrors } from "../middlewares/validationErrors.js";

const router = express.Router();

router.post("/auth", validateAuth, validationErrors, authController);

export default router;

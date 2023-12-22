import express from "express";
import { validateRegister } from "../validators/registerValidatir.js";
import { validationErrors } from "../middlewares/validationErrors.js";
import { registerController } from "../controllers/register/registerController.js";

const router = express.Router();

router.post(
  "/register",
  validateRegister,
  validationErrors,
  registerController
);

export default router;

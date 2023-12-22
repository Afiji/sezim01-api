import { check } from "express-validator";

export const validateAuth = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password").notEmpty().withMessage("Password is required"),
];

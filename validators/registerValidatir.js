import { check } from "express-validator";

export const validateRegister = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 symbols are required")
    .isLength({ max: 20 })
    .withMessage("Maximum 20 symbols are required")
    .matches(/^[a-z]+$/)
    .withMessage("Name should contain lowercase letters"),
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("Must be at least 1 symbol,1 uppercase letter,1 number")
    .isLength({ min: 7, max: 15 })
    .withMessage("Password length must be between 7 and 15 symbols"),
];

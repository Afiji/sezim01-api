import express from "express";
import { verifyEmail } from "../controllers/email/verifyEmailController.js";

const router = express.Router();

router.get("/verify-email/:token", verifyEmail);

export default router;

import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUserController } from "../controllers/user/getUserController.js";
import { editProfileController } from "../controllers/user/updateUserInfo.js";
import upload from "../multer.js";
import Auth from "../models/Auth.js";

const router = express.Router();

router.get("/get-user", verifyToken, getUserController);
router.patch("/edit-profile", verifyToken, editProfileController);
router.post(
  "/upload-avatar",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const file = req.file;
      console.log(req.body, req.file);
      console.log(userId);
      await Auth.findByIdAndUpdate(userId, { avatar: file.path });

      res.status(200).send({
        message: "Avatar uploaded successfully",
        avatarPath: file.path,
      });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
);

export default router;

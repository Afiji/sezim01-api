import express from "express";
import dotenv from "dotenv";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUserController } from "../controllers/user/getUserController.js";
import { editProfileController } from "../controllers/user/updateUserInfo.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { upload } from "../multer.js";
import Auth from "../models/Auth.js";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import multer from "multer";
import multerS3 from "multer-s3";

dotenv.config();

console.log("AWS Bucket Name:", process.env.AWS_BUCKET_NAME);

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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

      // Найти существующего пользователя и удалить старый аватар из S3, если он есть
      const user = await Auth.findById(userId);
      if (user && user.avatar) {
        // Получаем ключ файла из URL аватара
        const fileKey = user.avatar.split("/").pop();

        // Параметры для удаления файла из S3
        const deleteParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `profile-images/${fileKey}`,
        };

        // Отправляем команду на удаление в S3
        await s3Client.send(new DeleteObjectCommand(deleteParams));
      }

      // Загрузить новый аватар
      const avatarUrl = req.file.location; // URL нового файла на S3

      // Обновить пользователя в базе данных с новым URL аватара
      await Auth.findByIdAndUpdate(userId, { avatar: avatarUrl });
      res.status(200).json({
        message: "Avatar uploaded successfully",
        avatarPath: avatarUrl,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Error uploading avatar" });
    }
  }
);

router.delete("/delete-avatar", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await Auth.findById(userId);

    if (!user || !user.avatar) {
      return res.status(404).json({ message: "User or avatar not found" });
    }

    // Получаем ключ файла из URL аватара
    const fileKey = user.avatar.split("profile-images/")[1]; // Исправлено для получения части пути после 'profile-images/'
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `profile-images/${fileKey}`,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    // Обновляем запись пользователя в базе данных, удаляем ссылку на аватар
    await Auth.findByIdAndUpdate(userId, { avatar: "" });
    res.status(200).json({ message: "Avatar deleted successfully" });
  } catch (error) {
    console.error("Deletion error:", error);
    res.status(500).json({ message: "Error deleting avatar" });
  }
});

export default router;

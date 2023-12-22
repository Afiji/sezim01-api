// config/s3Config.js
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("imageError"), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      const rootFolder = "todos";
      const encodedName = encodeURIComponent(file.originalname);
      const fileName = `${Date.now().toString()}-${encodedName}`;
      const finalPath = `${rootFolder}/${fileName}`;
      cb(null, finalPath);
    },
  }),
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: imageFileFilter,
});

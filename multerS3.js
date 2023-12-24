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

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `todos/${Date.now().toString()}-${file.originalname}`);
    },
    acl: "public-read",
  }),
});

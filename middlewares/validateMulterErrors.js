import multer from "multer";

export const valudateMulterErrors = (err, req, res, next) => {
  if (err && err.message === "imageError") {
    return res.status(400).send({ message: err.message });
  }
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send({ message: "File is large. Limit is 1MB" });
    }
    return res.status(500).send({ message: err.message });
  }
  next();
};

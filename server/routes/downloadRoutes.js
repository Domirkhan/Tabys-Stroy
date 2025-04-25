import express from "express";
import Upload from "../models/Upload.js";

const router = express.Router();

// Маршрут для получения файла по его id
router.get("/file/:id", async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.id);
    if (!upload) {
      return res.status(404).json({ success: false, message: "Файл не найден" });
    }
    res.set("Content-Type", upload.file.contentType);
    return res.send(upload.file.data);
  } catch (error) {
    console.error("Ошибка при получении файла:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера при получении файла",
      error: error.message,
    });
  }
});

export default router;
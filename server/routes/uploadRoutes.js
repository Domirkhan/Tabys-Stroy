import express from "express";
import multer from "multer";
import Upload from "../models/Upload.js";

const router = express.Router();
// Настраиваем Multer для хранения файла в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Маршрут для загрузки одного файла (поле форму должно называться "file")
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Файл не найден. Убедитесь, что вы отправили данные с полем 'file'."
        });
      }
      
      // Формируем объект для загрузки
      const uploadData = {
        fileName: req.body.fileName || req.file.originalname,
        file: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      };
  
      // Создаём документ Upload
      const newUpload = new Upload(uploadData);
      await newUpload.save();
  
      res.status(201).json({
        success: true,
        message: "Файл успешно загружен",
        upload: newUpload,
      });
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
      res.status(500).json({
        success: false,
        message: "Ошибка сервера",
        error: error.message,
      });
    }
  });

export default router;
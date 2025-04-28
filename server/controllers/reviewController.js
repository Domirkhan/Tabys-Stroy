import reviewModel from "../models/reviewModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Добавление отзыва
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment, userName } = req.body;
    
    if (!productId || !rating || !comment || !userName) {
      return res.status(400).json({
        success: false,
        message: "Все поля должны быть заполнены"
      });
    }

    // Создаем массив медиафайлов
    const media = req.files ? req.files.map(file => ({
      url: `/uploads/reviews/${file.filename}`,
      type: file.mimetype
    })) : [];

    const review = new reviewModel({
      productId,
      userId: req.user._id,
      rating: Number(rating),
      comment,
      userName,
      media: media // передаем массив объектов
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: "Отзыв успешно добавлен",
      review
    });

  } catch (error) {
    console.error("Ошибка при создании отзыва:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при создании отзыва",
      error: error.message
    });
  }
};
  
  // Получение отзывов для продукта
  export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        // Добавляем проверку productId
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "ID продукта не указан"
            });
        }

        const reviews = await reviewModel
            .find({ productId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            reviews
        });
    } catch (error) {
        console.error("Ошибка при получении отзывов:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при получении отзывов",
            error: error.message
        });
    }
};

// Удаление отзыва
export const deleteReview = async (req, res) => {
  try {
      const { reviewId } = req.params;

      if (!reviewId) {
          return res.status(400).json({
              success: false,
              message: "ID отзыва не указан"
          });
      }

      const review = await reviewModel.findById(reviewId);

      if (!review) {
          return res.status(404).json({
              success: false,
              message: "Отзыв не найден"
          });
      }

      // Удаляем медиафайлы, если они есть
      if (review.media && review.media.length > 0) {
          review.media.forEach(media => {
              const filePath = path.join(__dirname, '..', media.url);
              if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath);
              }
          });
      }

      await review.deleteOne();

      res.status(200).json({
          success: true,
          message: "Отзыв успешно удален"
      });
  } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
      res.status(500).json({
          success: false,
          message: "Ошибка при удалении отзыва",
          error: error.message
      });
  }
};
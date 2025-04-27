import reviewModel from "../models/reviewModel.js";

// Добавление отзыва
export const createReview = async (req, res) => {
    try {
      const { productId, rating, comment, userName } = req.body;
      const userId = req.user._id;
  
      // Проверка наличия всех необходимых данных
      if (!productId || !rating || !comment || !userName) {
        return res.status(400).send({
          success: false,
          message: "Все поля должны быть заполнены"
        });
      }
  
      // Проверка существования предыдущего отзыва
      const existingReview = await reviewModel.findOne({
        productId,
        userId
      });
  
      if (existingReview) {
        return res.status(400).send({
          success: false,
          message: "Вы уже оставляли отзыв для этого товара"
        });
      }
  
      // Создание нового отзыва
      const review = new reviewModel({
        productId,
        userId,
        rating,
        comment,
        userName
      });
  
      await review.save();
  
      res.status(201).send({
        success: true,
        message: "Отзыв успешно добавлен",
        review
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Ошибка при добавлении отзыва",
        error: error.message
      });
    }
  };
  
  // Получение отзывов для продукта
  export const getProductReviews = async (req, res) => {
    try {
      const { productId } = req.params;
      const reviews = await reviewModel
        .find({ productId })
        .sort({ createdAt: -1 });
  
      res.status(200).send({
        success: true,
        reviews
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Ошибка при получении отзывов",
        error
      });
    }
  };
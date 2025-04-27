import React, { useState, useEffect } from 'react';
import { Rate, Input, Button, message } from 'antd';
import { useAuth } from '../../context/auth';
import axios from 'axios';

const { TextArea } = Input;

const Reviews = ({ productId }) => {
    const [auth] = useAuth();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
  

  // Получение отзывов
  const getReviews = async () => {
    // Добавляем проверку наличия productId
    if (!productId) {
      console.error('ProductId is undefined');
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/review/product-reviews/${productId}`
      );
      if (data?.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Добавление отзыва
  const handleSubmitReview = async () => {
    try {
      if (!auth?.user?.name) {
        message.error('Не удалось определить имя пользователя');
        return;
      }
  
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/review/create-review`,
        {
          productId,
          rating,
          comment,
          userName: auth.user.name // Убедимся что имя пользователя существует
        },
        {
          headers: {
            Authorization: auth.token
          }
        }
      );
  
      if (data?.success) {
        message.success('Отзыв успешно добавлен');
        setComment('');
        setRating(5);
        getReviews();
      }
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || 'Ошибка при добавлении отзыва');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Добавляем проверку наличия productId перед вызовом getReviews
    if (productId) {
      getReviews();
    }
  }, [productId]);

  return (
    <div className="reviews-section">
      <h3>Отзывы</h3>
      
      {auth?.token ? (
        <div className="review-form">
          <Rate value={rating} onChange={setRating} />
          <TextArea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Напишите ваш отзыв"
          />
          <Button 
            type="primary"
            onClick={handleSubmitReview}
            loading={loading}
            disabled={!comment.trim()}
          >
            Отправить отзыв
          </Button>
        </div>
      ) : (
        <p>Войдите, чтобы оставить отзыв</p>
      )}

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review._id} className="review-item">
            <div className="review-header">
              <span className="user-name">{review.userName}</span>
              <Rate disabled value={review.rating} />
              <span className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
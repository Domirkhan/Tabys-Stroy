import React, { useState, useEffect } from 'react';
import { Rate, Input, Button, message, Upload, Modal } from 'antd';
import { PlusOutlined, PlayCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import '../styles/reviews.css';

const { TextArea } = Input;

const Reviews = ({ productId }) => {
    const [auth] = useAuth();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewVideo, setPreviewVideo] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // Настройки для загрузки файлов
    const uploadProps = {
        beforeUpload: file => {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isImage && !isVideo) {
                message.error('Можно загружать только изображения и видео!');
                return false;
            }
            if (!isLt5M) {
                message.error('Файл должен быть меньше 5MB!');
                return false;
            }

            return false;
        },
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
        fileList,
    };

    const handlePreview = async (file) => {
        try {
            // Для существующих медиафайлов из отзыва
            if (file._id) {
                const mediaUrl = `${import.meta.env.VITE_API}/api/v1/review/media/${file._id}`;
                setPreviewImage(file.type?.startsWith('image/') ? mediaUrl : '');
                setPreviewVideo(file.type?.startsWith('video/') ? mediaUrl : '');
                setPreviewOpen(true);
                setPreviewTitle('Медиа');
            }
            // Для новых загружаемых файлов
            else if (file.originFileObj) {
                if (!file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                setPreviewImage(file.type?.startsWith('image/') ? file.preview : '');
                setPreviewVideo(file.type?.startsWith('video/') ? file.preview : '');
                setPreviewOpen(true);
                setPreviewTitle(file.name);
            }
        } catch (error) {
            console.error('Ошибка при предпросмотре файла:', error);
            message.error('Ошибка при загрузке предпросмотра');
        }
    };

    const getReviews = async () => {
        try {
            if (!productId) {
                console.log('ProductId не определен');
                return;
            }

            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/api/v1/review/product-reviews/${productId}`
            );
            if (data?.success) {
                setReviews(data.reviews);
            }
        } catch (error) {
            console.error("Ошибка при получении отзывов:", error);
            message.error("Не удалось загрузить отзывы");
        }
    };

    useEffect(() => {
        if (productId) {
            getReviews();
        }
    }, [productId]);

    // Добавление отзыва с медиафайлами
    const handleSubmitReview = async () => {
        try {
            if (!auth?.user?.name) {
                message.error('Не удалось определить имя пользователя');
                return;
            }

            setLoading(true);
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('rating', rating);
            formData.append('comment', comment);
            formData.append('userName', auth.user.name);

            // Добавление медиафайлов
            fileList.forEach(file => {
                if (file.originFileObj) {
                    formData.append('media', file.originFileObj);
                }
            });

            const { data } = await axios.post(
                `${import.meta.env.VITE_API}/api/v1/review/create-review`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: auth.token
                    }
                }
            );

            if (data?.success) {
                message.success('Отзыв успешно добавлен');
                setComment('');
                setRating(5);
                setFileList([]);
                getReviews();
            }
        } catch (error) {
            console.error(error);
            message.error(error.response?.data?.message || 'Ошибка при добавлении отзыва');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const { data } = await axios.delete(
                `${import.meta.env.VITE_API}/api/v1/review/delete-review/${reviewId}`,
                {
                    headers: {
                        Authorization: auth.token
                    }
                }
            );

            if (data?.success) {
                message.success('Отзыв успешно удален');
                getReviews();
            }
        } catch (error) {
            console.error(error);
            message.error('Ошибка при удалении отзыва');
        }
    };

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
                    <div className="review-form-buttons">
                        <Upload
                            listType="picture-card"
                            {...uploadProps}
                            onPreview={handlePreview}
                        >
                            {fileList.length >= 8 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Добавить</div>
                                </div>
                            )}
                        </Upload>
                        <Button 
                            type="primary"
                            onClick={handleSubmitReview}
                            loading={loading}
                            disabled={!comment.trim()}
                        >
                            Отправить отзыв
                        </Button>
                    </div>
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
                            {auth?.user?.role === 1 && (
                                <Button 
                                    type="text" 
                                    danger
                                    onClick={() => handleDeleteReview(review._id)}
                                    icon={<DeleteOutlined />}
                                >
                                    Удалить
                                </Button>
                            )}
                        </div>
                        <p className="review-comment">{review.comment}</p>
                        {review.media && review.media.length > 0 && (
                            <div className="review-media">
                                {review.media.map((media, index) => (
                                    <div key={index} className="media-item">
                                        {media.type.startsWith('image/') ? (
                                            <img
                                                src={`${import.meta.env.VITE_API}/api/v1/review/media/${media._id}`}
                                                alt={`Фото ${index + 1}`}
                                                onClick={() => handlePreview(media)}
                                            />
                                        ) : (
                                            <video
                                                src={`${import.meta.env.VITE_API}/api/v1/review/media/${media._id}`}
                                                className="video-preview"
                                                onClick={() => handlePreview(media)}
                                            >
                                                <PlayCircleOutlined />
                                            </video>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => {
                    setPreviewOpen(false);
                    setPreviewImage('');
                    setPreviewVideo('');
                }}
                width={800}
            >
                {previewImage && (
                    <img 
                        alt="preview" 
                        style={{ width: '100%' }} 
                        src={previewImage} 
                    />
                )}
                {previewVideo && (
                    <video
                        controls
                        style={{ width: '100%' }}
                        src={previewVideo}
                    >
                        Ваш браузер не поддерживает видео
                    </video>
                )}
            </Modal>
        </div>
    );
};

// Вспомогательная функция для преобразования файла в base64
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

export default Reviews;
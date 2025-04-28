import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Определяем путь в зависимости от типа загрузки
        let uploadPath = 'uploads/';
        
        // Если это медиафайл отзыва
        if (req.baseUrl.includes('review')) {
            uploadPath = 'uploads/reviews/';
        }
        // Если это фото продукта
        else if (req.baseUrl.includes('product')) {
            uploadPath = 'uploads/products/';
        }

        // Создаем директорию, если её нет
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    // Определяем разрешенные типы файлов в зависимости от маршрута
    if (req.baseUrl.includes('review')) {
        // Для отзывов разрешаем изображения и видео
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Только изображения и видео'), false);
        }
    } else {
        // Для продуктов только изображения
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Только изображения'), false);
        }
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Экспортируем разные middleware для разных случаев
export const productPhotosUpload = upload.array('photos', 5);
export const reviewMediaUpload = upload.array('media', 8);

// Для обратной совместимости
export default upload.array('photos', 5);
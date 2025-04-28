import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // или ваш путь
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Используем .array вместо .single, поле должно быть "photos"
const upload = multer({ storage: storage }).array("photos", 5); // 5 – максимальное количество фото

export default upload;
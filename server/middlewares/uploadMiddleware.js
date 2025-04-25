import multer from 'multer';
import path from 'path';

// Настраиваем хранилище
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // куда сохранять файлы
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage });
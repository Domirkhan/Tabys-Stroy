import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import multer from "multer";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Настройка multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/categories');
    // Создаем директорию если её нет
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Можно загружать только изображения'));
    }
  }
});

// Создание категории
export const createCategoryController = async (req, res) => {
  try {
    upload.single('icon')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Ошибка при загрузке файла",
          error: err.message
        });
      }

      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Название категории обязательно"
        });
      }

      let iconUrl = '';
      if (req.file) {
        iconUrl = `/uploads/categories/${req.file.filename}`;
      }

      const category = await categoryModel.create({
        name,
        slug: slugify(name),
        iconUrl
      });

      res.status(201).json({
        success: true,
        message: "Категория успешно создана",
        category
      });
    });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при создании категории",
      error: error.message
    });
  }
};

// Обновление категории
export const updateCategoryController = async (req, res) => {
  try {
    upload.single('icon')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Ошибка при загрузке файла",
          error: err.message
        });
      }

      const { name } = req.body;
      const { id } = req.params;

      const category = await categoryModel.findById(id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Категория не найдена"
        });
      }

      if (name !== category.name) {
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
          return res.status(400).json({
            success: false,
            message: "Категория с таким названием уже существует"
          });
        }
      }

      let iconUrl = category.iconUrl;
      if (req.file) {
        // Удаляем старую иконку
        if (category.iconUrl) {
          const oldPath = path.join(__dirname, '..', category.iconUrl);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        iconUrl = `/uploads/categories/${req.file.filename}`;
      }

      category.name = name;
      category.slug = slugify(name);
      category.iconUrl = iconUrl;

      await category.save();

      res.status(200).json({
        success: true,
        message: "Категория успешно обновлена",
        category
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false, 
      message: "Ошибка при обновлении категории",
      error: error.message
    });
  }
};
// get all cat
export const categoryControlller = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({
      success: true,
      message: "Все категории",
      category: categories // используем то же имя поля 'category', которое ожидает фронтенд
    });
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении категорий",
      error: error.message
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
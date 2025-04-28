import productModel from "../models/productModel.js"; // Импорт модели продукта
import categoryModel from "../models/categoryModel.js";
import subcategoryModel from "../models/Subcategory.js";
import fs from "fs";
import slugify from "slugify";
import path from "path";
import mongoose from "mongoose";

export const createProductController = async (req, res) => {
  try {
    const fields = req.fields || req.body;
    const { name, description, category, subcategory, characteristics, availability, pricePerUnit } = fields;
    
    // Валидация обязательных полей
    if (!name || !description || !category ) {
      return res.status(400).send({ 
        error: "Пожалуйста, заполните все обязательные поля" 
      });
    }

    // Проверка корректности значения availability
    const validAvailabilityValues = ['Есть в наличии', 'Нет в наличии', 'Под заказ', 'Уточнить наличие'];
    if (availability && !validAvailabilityValues.includes(availability)) {
      return res.status(400).send({
        error: "Некорректный статус наличия товара"
      });
    }

    // Приводим subcategory к ObjectId
    let subcatId = undefined;
    if (subcategory && mongoose.Types.ObjectId.isValid(subcategory)) {
      subcatId = new mongoose.Types.ObjectId(subcategory);
    }
    
    // Парсинг characteristics
    let parsedCharacteristics = [];
    if (characteristics) {
      try {
        parsedCharacteristics = typeof characteristics === 'string' 
          ? JSON.parse(characteristics)
          : characteristics;

        if (!Array.isArray(parsedCharacteristics)) {
          return res.status(400).send({ 
            error: "Characteristics must be an array" 
          });
        }
      } catch (error) {
        return res.status(400).send({ 
          error: "Invalid format for characteristics" 
        });
      }
    }
    
    // Обработка pricePerUnit
    let parsedPricePerUnit = {};
    if (pricePerUnit) {
      try {
        parsedPricePerUnit = typeof pricePerUnit === 'string'
          ? JSON.parse(pricePerUnit)
          : pricePerUnit;
      } catch (e) {
        return res.status(400).send({ 
          error: "Invalid format for pricePerUnit" 
        });
      }
    }

    // Создаем продукт
    const product = new productModel({
      ...fields,
      slug: slugify(name, { lower: true }),
      photos: [],
      subcategory: subcatId,
      characteristics: parsedCharacteristics,
      pricePerUnit: parsedPricePerUnit,
      availability: availability || 'Есть в наличии'
    });
    
    // Обработка загруженных файлов
    if (req.files && req.files.length > 0) {
      const uploadDir = path.join(process.cwd(), "uploads", "products");
      
      // Создаем директорию, если её нет
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const file of req.files) {
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}-${slugify(name)}-${Math.random().toString(36).slice(2)}${ext}`;
        const uploadPath = path.join(uploadDir, fileName);
        
        fs.writeFileSync(uploadPath, file.buffer);
        product.photos.push(`uploads/products/${fileName}`);
      }
    }
    
    await product.save();
    res.status(201).send({
      success: true,
      message: "Продукт успешно создан",
      product
    });
  } catch (error) {
    console.error("Ошибка в createProductController:", error);
    res.status(500).send({
      success: false,
      message: "Ошибка при создании продукта",
      error: error.message
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category")
      .populate("subcategory");

    const baseUrl = process.env.VITE_API || 'http://localhost:8080'; // установите API_URL

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product: {
        ...product._doc,
        characteristics: product.characteristics,
        images: product.photos.map(photo => `${baseUrl}/${photo}`),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// Получение фото продукта
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    
    if (product && product.photos && product.photos.length > 0) {
      const photoRelativePath = product.photos[0];
      const photoAbsolutePath = path.join(process.cwd(), photoRelativePath);
      
      if (!fs.existsSync(photoAbsolutePath)) {
        return res.status(404).send({ error: "Файл не найден" });
      }

      const ext = path.extname(photoRelativePath).toLowerCase();
      const contentType = ext === '.png' ? 'image/png' : 
                         ext === '.gif' ? 'image/gif' : 
                         'image/jpeg';

      const fileData = fs.readFileSync(photoAbsolutePath);
      res.set("Content-Type", contentType);
      return res.status(200).send(fileData);
    }
    
    return res.status(404).send({ error: "Фото отсутствует" });
  } catch (error) {
    console.error("Ошибка в productPhotoController:", error);
    res.status(500).send({
      success: false,
      message: "Ошибка при получении фото",
      error: error.message
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    
    if (product) {
      // Удаляем фотографии
      if (product.photos.length > 0) {
        product.photos.forEach(photo => {
          const photoPath = path.join(process.cwd(), photo);
          if (fs.existsSync(photoPath)) {
            fs.unlinkSync(photoPath);
          }
        });
      }

      await product.deleteOne();
    }

    res.status(200).send({
      success: true,
      message: "Продукт успешно удален"
    });
  } catch (error) {
    console.error("Ошибка в deleteProductController:", error);
    res.status(500).send({
      success: false,
      message: "Ошибка при удалении продукта",
      error: error.message
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const fields = req.fields || req.body;
    const { 
      name, 
      description, 
      category, 
      subcategory, 
      shipping, 
      characteristics,
      availability 
    } = fields;
    
    if (!name || !description|| !category)
      return res.status(400).send({ error: "Пожалуйста, заполните все обязательные поля" });
    
    // Проверка корректности значения availability
    const validAvailabilityValues = ['Есть в наличии', 'Нет в наличии', 'Под заказ', 'Уточнить наличие'];
    if (availability && !validAvailabilityValues.includes(availability)) {
      return res.status(400).send({
        error: "Некорректный статус наличия товара"
      });
    }
    
    let subcatId = undefined;
    if (subcategory && mongoose.Types.ObjectId.isValid(subcategory)) {
      subcatId = new mongoose.Types.ObjectId(subcategory);
    }
    
    let parsedCharacteristics = [];
    if (characteristics) {
      try {
        parsedCharacteristics = JSON.parse(characteristics);
        if (!Array.isArray(parsedCharacteristics))
          return res.status(400).send({ error: "Characteristics must be an array" });
      } catch (error) {
        return res.status(400).send({ error: "Invalid format for characteristics" });
      }
    }
    
    // Добавляем парсинг pricePerUnit, как в createProductController
    let parsedPricePerUnit = {};
    if (fields.pricePerUnit) {
      try {
        parsedPricePerUnit = typeof fields.pricePerUnit === 'string'
          ? JSON.parse(fields.pricePerUnit)
          : fields.pricePerUnit;
      } catch (e) {
        return res.status(400).send({ error: "Invalid format for pricePerUnit" });
      }
    }
    
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...fields,
        slug: name ? slugify(name, { lower: true }) : undefined,
        subcategory: subcatId,
        characteristics: parsedCharacteristics,
        pricePerUnit: parsedPricePerUnit,
        availability: availability || 'Есть в наличии'
      },
      { new: true }
    );
    
    if (req.files && req.files.length > 0) {
      // Удаляем старые фото
      if (updatedProduct.photos.length > 0) {
        updatedProduct.photos.forEach(photo => {
          const oldPhotoPath = path.join(process.cwd(), photo);
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath);
          }
        });
      }

      updatedProduct.photos = [];
      const uploadDir = path.join(process.cwd(), "uploads", "products");
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const file of req.files) {
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}-${slugify(name)}-${Math.random().toString(36).slice(2)}${ext}`;
        const uploadPath = path.join(uploadDir, fileName);
        
        fs.writeFileSync(uploadPath, file.buffer);
        updatedProduct.photos.push(`uploads/products/${fileName}`);
      }
    }
    
    await updatedProduct.save();
    res.status(200).send({
      success: true,
      message: "Продукт успешно обновлен",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Ошибка в updateProductController:", error);
    res.status(500).send({
      success: false,
      message: "Ошибка при обновлении продукта",
      error: error.message
    });
  }
};


// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo"); // Исключаем поле photo из результата
    res.status(200).send({
      success: true,
      products: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search product",
      error,
    });
  }
};
// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
     
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

export const productSubcategoryController = async (req, res) => {
  try {
    const subcategory = await subcategoryModel.findOne({ slug: req.params.slug });
    if (!subcategory) {
      return res.status(404).send({
        success: false,
        message: "Subcategory not found",
      });
    }
    const products = await productModel
      .find({ subcategory: subcategory._id })
      .populate("category")
      .populate("subcategory"); // теперь используем корректное имя поля

    res.status(200).send({
      success: true,
      subcategory, // можно возвращать объект подкатегории
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching subcategory products",
      error: error.message,
    });
  }
};

export const getNewProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .populate("subcategory")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).send({
      success: true,
      message: "New Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting new products",
      error: error.message,
    });
  }
};
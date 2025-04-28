import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  updateProductController,
  searchProductController,
  realtedProductController,
  productCategoryController,
  productSubcategoryController,
  getNewProductsController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { productPhotosUpload } from "../middlewares/uploadMiddleware.js";
import multer from "multer";
const router = express.Router();
// Инициализируем multer с использованием memoryStorage (вы можете менять настройки по необходимости)
const storage = multer.memoryStorage();
const upload = multer({ storage });
//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  productPhotosUpload,
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  productPhotosUpload,
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

// для получения товаров по подкатегории
router.get("/product-subcategory/:slug", productSubcategoryController);

router.get("/new-products", getNewProductsController);
export default router;
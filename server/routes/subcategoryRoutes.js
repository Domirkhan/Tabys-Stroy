import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createSubcategoryController,
  getAllSubcategoriesController,
  singleSubcategoryController,
  updateSubcategoryController,
  deleteSubcategoryController,

} from "../controllers/subcategoryController.js";

const router = express.Router();

// создать подкатегорию (только для админа)
router.post(
  "/create-subcategory",
  requireSignIn,
  isAdmin,
  createSubcategoryController
);

// обновить подкатегорию (только для админа)
router.put(
  "/update-subcategory/:id",
  requireSignIn,
  isAdmin,
  updateSubcategoryController
);

// получить все подкатегории (публичный)
router.get("/get-subcategory", getAllSubcategoriesController);

// получить одну подкатегорию по slug (публичный)
router.get("/single-subcategory/:slug", singleSubcategoryController);

// удалить подкатегорию (только для админа)
router.delete(
  "/delete-subcategory/:id",
  requireSignIn,
  isAdmin,
  deleteSubcategoryController
);


export default router;
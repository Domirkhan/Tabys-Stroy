import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { createOrderController, getAllOrdersController, getUserOrdersController, updateOrderStatusController } from "../controllers/orderController.js";

const router = express.Router();

// Создание заказа (пользователь должен быть залогинен)
router.post("/create-order", requireSignIn, createOrderController);

// Добавьте дополнительные маршруты для получения заказов или обновления статуса заказа
// Например, для администратора:
 router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
 router.put("/update-order/:orderId", requireSignIn, isAdmin, updateOrderStatusController);
 router.get("/user-orders", requireSignIn, getUserOrdersController);
export default router;
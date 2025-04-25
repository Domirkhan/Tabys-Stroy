import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import cors from "cors";
import path from "path";

// Configure environment variables
dotenv.config();

// Database config
connectDB();

// Create Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// Use your routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/subcategory", subcategoryRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);      // Для загрузки файлов
app.use("/api/v1/download", downloadRoutes);    // Для отдачи файлов

// Если файлы сохранялись на диск, можно сделать их раздачу публичной:
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
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
import reviewRoutes from './routes/reviewRoutes.js';
import statsRoutes from "./routes/statsRoutes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";
import path from "path";
import { createServer } from 'http';
import { Server } from 'socket.io';

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
app.use('/api/v1/review', reviewRoutes);
app.use("/api/v1/stats", statsRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Если файлы сохранялись на диск, можно сделать их раздачу публичной:
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Добавьте эти строки после других middleware
app.use('/uploads/products', express.static('uploads/products'));
app.use('/uploads/reviews', express.static('uploads/reviews'));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

// Сохраняем io в глобальной области для использования в других файлах
global.io = io;

io.on('connection', (socket) => {
  console.log('Admin connected');
  
  socket.on('disconnect', () => {
    console.log('Admin disconnected');
  });
});

const PORT = process.env.PORT || 8080;
// Используйте httpServer вместо app.listen
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgCyan.white);
  });
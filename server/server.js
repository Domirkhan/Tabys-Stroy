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
import promoCodeRoutes from "./routes/promoCodeRoutes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";
import path from "path";
import { createServer } from 'http';
import { Server } from 'socket.io';
import JWT from "jsonwebtoken";

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
app.use(cors({
  origin: [
    process.env.FRONTEND_URL.replace(/\/$/, ''),
    'http://localhost:5173',
    'http://localhost:8081'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
app.use("/api/v1/promo", promoCodeRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Если файлы сохранялись на диск, можно сделать их раздачу публичной:
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/reviews', express.static(path.join(__dirname, 'uploads/reviews')));
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products')));
app.use('/uploads/categories', express.static(path.join(__dirname, 'uploads/categories')));

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
// Добавляем middleware для проверки авторизации WebSocket
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Не авторизован'));
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Неверный токен'));
  }
});

io.on('connection', (socket) => {
  console.log('Клиент подключен:', socket.user._id);
  
  socket.on('disconnect', () => {
    console.log('Клиент отключен:', socket.user._id);
  });
});
const PORT = process.env.PORT || 8081;
// Используйте httpServer вместо app.listen
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgCyan.white);
  });
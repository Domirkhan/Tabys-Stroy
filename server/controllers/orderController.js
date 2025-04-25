import Order from "../models/orderModel.js";
import nodemailer from "nodemailer";

// Функция отправки уведомления (как ранее)
const sendNotificationEmail = async (order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "admin@example.com", // укажите email администратора или менеджера
      subject: `Новый заказ: ${order._id}`,
      html: `<p>Пользователь с id <strong>${order.user}</strong> сделал заказ.</p>
             <p>Общая сумма заказа: <strong>${order.totalAmount}</strong></p>
             <p>Статус оплаты: <strong>${order.paymentStatus}</strong></p>
             <p>Пожалуйста, проверьте панель администратора для подтверждения заказа.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Уведомление отправлено на email администратора.");
  } catch (err) {
    console.error("Ошибка при отправке уведомления:", err);
  }
};

// Контроллер для создания заказа (для пользователя)
export const createOrderController = async (req, res) => {
  try {
    const { orderItems, totalAmount } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Нет товаров в заказе",
      });
    }

    const order = new Order({
      user: req.user._id, // предполагается, что пользователь аутентифицирован
      orderItems,
      totalAmount,
      paymentStatus: "Not Processed",
      orderStatus: "Not Processed",
    });
    await order.save();

    // Отправка уведомления администратору
    sendNotificationEmail(order);

    res.status(201).json({
      success: true,
      message: "Заказ успешно создан. Ожидайте подтверждения от администратора.",
      order,
    });
  } catch (error) {
    console.error("Error in createOrderController:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при создании заказа",
      error: error.message,
    });
  }
};

// Получение всех заказов (для администратора)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Все заказы",
      orders,
    });
  } catch (error) {
    console.error("Error in getAllOrdersController:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении заказов",
      error: error.message,
    });
  }
};

// Обновление статуса заказа (подтверждение, отмена, и т.д.) (для администратора)
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body; // например, orderStatus: "Processing", "Shipped", "Delivered", "Cancelled"
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: orderStatus || "Not Processed", paymentStatus: paymentStatus || "Not Processed" },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Заказ не найден",
      });
    }
    res.status(200).json({
      success: true,
      message: "Статус заказа обновлен",
      order,
    });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при обновлении статуса заказа",
      error: error.message,
    });
  }
};

export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Ошибка при получении заказов пользователя:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении заказов",
      error: error.message,
    });
  }
};
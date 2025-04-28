import Order from "../models/orderModel.js";
import nodemailer from "nodemailer";
import sendAdminEmail from "../utils/sendAdminEmail.js";

// Создание HTML шаблона для email уведомления
const createAdminOrderTemplate = (order) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #333; text-align: center; border-bottom: 2px solid #eee; padding-bottom: 10px;">
              Новый заказ #${order._id}
          </h2>
          
          <div style="margin: 20px 0;">
              <p><strong>Клиент:</strong> ${order.user.name}</p>
              <p><strong>Email:</strong> ${order.user.email}</p>
              <p><strong>Телефон:</strong> ${order.user.phone || 'Не указан'}</p>
              <p><strong>Способ получения:</strong> ${order.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Доставка'}</p>
              <p><strong>Сумма заказа:</strong> ${order.totalAmount} тг</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
              <h3 style="color: #444; margin-top: 0;">Товары в заказе:</h3>
              <ul style="list-style: none; padding: 0;">
                  ${order.orderItems.map(item => `
                      <li style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                          <div><strong>${item.name}</strong></div>
                          <div>Количество: ${item.quantity} ${item.selectedUnit}</div>
                          <div>Цена: ${item.price} тг за ${item.selectedUnit}</div>
                          <div><strong>Итого: ${item.quantity * item.price} тг</strong></div>
                      </li>
                  `).join('')}
              </ul>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #666;">
              <p>Для управления заказом перейдите в панель администратора</p>
          </div>
      </div>
  `;
};

// Контроллер для создания заказа (для пользователя)
// Обновляем контроллер создания заказа
export const createOrderController = async (req, res) => {
  try {
      const { orderItems, totalAmount, deliveryMethod } = req.body;

      const order = new Order({
          user: req.user._id,
          orderItems,
          totalAmount,
          deliveryMethod,
          orderStatus: "Не обработан",
          paymentStatus: "Не обработан"
      });

      await order.save();

      // Получаем заполненные данные заказа
      const populatedOrder = await Order.findById(order._id).populate('user');
      
      // Отправляем уведомление администратору
      try {
          const emailSent = await sendAdminEmail(
              `Новый заказ #${order._id}`,
              createAdminOrderTemplate(populatedOrder)
          );
          
          if (emailSent) {
              console.log('Уведомление успешно отправлено администратору');
          }
      } catch (emailError) {
          console.error('Ошибка при отправке уведомления администратору:', emailError);
      }

      // Оповещаем через сокет
      if (global.io) {
          global.io.emit('newOrder', {
              orderId: order._id,
              totalAmount: order.totalAmount,
              userName: populatedOrder.user.name
          });
      }

      res.status(201).json({
          success: true,
          message: "Заказ успешно создан",
          order
      });
  } catch (error) {
      console.error("Ошибка при создании заказа:", error);
      res.status(500).json({
          success: false,
          message: "Ошибка при создании заказа",
          error: error.message
      });
  }
};

// Получение всех заказов (для администратора)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email phone") // Добавляем поле phone
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
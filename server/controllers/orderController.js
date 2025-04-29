import Order from "../models/orderModel.js";
import nodemailer from "nodemailer";
import sendAdminEmail from "../utils/sendAdminEmail.js";
import sendEmail from "../utils/sendEmail.js";

// Создание HTML шаблона для email уведомления
// Шаблон письма для администратора
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
  ${order.deliveryMethod === 'delivery' ? `<p><strong>Адрес доставки:</strong> ${order.user.address}</p>` : ''}
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
      </div>
  `;
};
const createUserOrderStatusTemplate = (order) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #333; text-align: center; border-bottom: 2px solid #eee; padding-bottom: 10px;">
              Обновление статуса заказа #${order._id}
          </h2>
          
          <div style="margin: 20px 0;">
              <p>Уважаемый(ая) ${order.user.name},</p>
              <p>Статус вашего заказа был обновлен:</p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                  <p><strong>Статус заказа:</strong> ${order.orderStatus}</p>
                  <p><strong>Статус оплаты:</strong> ${order.paymentStatus}</p>
              </div>
              
              <div style="margin-top: 20px;">
                  <h3 style="color: #444;">Детали заказа:</h3>
                  <p><strong>Сумма заказа:</strong> ${order.totalAmount} тг</p>
                  <p><strong>Способ получения:</strong> ${order.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Доставка'}</p>
                  ${order.deliveryMethod === 'delivery' ? `<p><strong>Адрес доставки:</strong> ${order.user.address || 'Не указан'}</p>` : ''}
              </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.CLIENT_URL}/dashboard/user/orders" 
                 style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                 Перейти к заказам
              </a>
          </div>
      </div>
  `;
};

// Контроллер для создания заказа (для пользователя)
// Обновляем контроллер создания заказа
// Для создания заказа
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

    // Получаем заполненные данные заказа со всеми полями пользователя
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email phone address');
    
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
        userName: populatedOrder.user.name,
        address: populatedOrder.user.address // Добавляем адрес
      });
    }

    res.status(201).json({
      success: true,
      message: "Заказ успешно создан",
      order: populatedOrder // Отправляем заполненные данные
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
      .populate("user", "name email phone address") // Добавляем address
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
    let { orderStatus, paymentStatus } = req.body; // Изменили const на let

    // Преобразуем английские статусы в русские
    const statusMapping = {
      'Delivered': 'Доставлен',
      'Paid': 'Оплачен',
      'Processing': 'В обработке',
      'Cancelled': 'Отменён',
      'Shipping': 'Отправлен',
      'Not Processed': 'Не обработан',
      'Not Paid': 'Не оплачен'
    };

    // Преобразуем статусы если они на английском
    orderStatus = statusMapping[orderStatus] || orderStatus;
    paymentStatus = statusMapping[paymentStatus] || paymentStatus;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { 
        orderStatus: orderStatus || "Не обработан", 
        paymentStatus: paymentStatus || "Не оплачен" 
      },
      { new: true }
    ).populate('user', 'name email phone address');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Заказ не найден",
      });
    }

    // Отправляем email пользователю
    try {
      const emailSent = await sendEmail(
        order.user.email,
        `Обновление статуса заказа #${order._id}`,
        createUserOrderStatusTemplate(order)
      );

      if (emailSent) {
        console.log('Уведомление успешно отправлено пользователю');
      }
    } catch (emailError) {
      console.error('Ошибка при отправке уведомления пользователю:', emailError);
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
    const orders = await Order.find({ user: req.user._id })
      .populate('user', 'name email phone address') // Добавляем address
      .sort({ createdAt: -1 });
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
import Order from "../models/orderModel.js";
import nodemailer from "nodemailer";
import sendAdminEmail from "../utils/sendAdminEmail.js";
import sendEmail from "../utils/sendEmail.js";

// Создание HTML шаблона для email уведомления

const createAdminOrderTemplate = (order) => {
  return `
  <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; border-radius: 12px; border: 1px solid #eee; overflow: hidden;">
    <div style="background: #ff0000; color: #fff; padding: 24px 32px; text-align: center;">
      <img src="https://tabys-stroy.kz/logo.png" alt="Tabys Stroy" style="height: 48px; margin-bottom: 10px;" />
      <h2 style="margin: 0; font-size: 2rem; font-weight: 700;">Новый заказ #${order._id}</h2>
    </div>
    <div style="padding: 24px 32px;">
      <p style="font-size: 1.1rem; color: #333;"><b>Клиент:</b> ${order.user.name}</p>
      <p style="font-size: 1.1rem; color: #333;"><b>Email:</b> ${order.user.email}</p>
      <p style="font-size: 1.1rem; color: #333;"><b>Телефон:</b> ${order.user.phone || 'Не указан'}</p>
      <p style="font-size: 1.1rem; color: #333;"><b>Способ получения:</b> ${order.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Доставка'}</p>
      ${order.deliveryMethod === 'delivery' ? `<p style="font-size: 1.1rem; color: #333;"><b>Адрес доставки:</b> ${order.user.address || 'Не указан'}</p>` : ''}
      <p style="font-size: 1.1rem; color: #333;"><b>Сумма заказа:</b>
        ${
          order.promoCode && order.discountAmount > 0
            ? `<span style="text-decoration:line-through;color:#888;margin-right:8px;">
                ${order.totalAmount + order.discountAmount} тг
               </span>
               <span style="color:#ff0000;font-weight:600;">
                ${order.totalAmount} тг
               </span>`
            : `${order.totalAmount} тг`
        }
      </p>
      ${
        order.promoCode && order.discountAmount > 0
          ? `<div style="color:#4caf50; font-size:1rem; margin-bottom: 10px;">
                Промокод <b>${order.promoCode}</b> применён: скидка ${order.discountPercent}% (−${order.discountAmount} тг)
             </div>`
          : ''
      }
      <div style="background: #fff; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <h3 style="color: #ff0000; margin-top: 0; font-size: 1.2rem;">Товары в заказе:</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${order.orderItems.map(item => `
            <li style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
              <div style="font-weight: 600; color: #222;">${item.name}</div>
              <div style="color: #555;">Количество: ${item.quantity} ${item.selectedUnit}</div>
              <div style="color: #555;">Цена: ${item.price} тг за ${item.selectedUnit}</div>
              <div style="font-weight: 600; color: #ff0000;">Итого: ${item.quantity * item.price} тг</div>
            </li>
          `).join('')}
        </ul>
      </div>
      <div style="text-align: center; margin-top: 32px;">
        <a href="https://tabys-stroy.kz/dashboard/admin/orders"
          style="background: #ff0000; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1.1rem; display: inline-block;">
          Перейти к заказу
        </a>
      </div>
    </div>
    <div style="background: #f5f5f5; color: #888; text-align: center; font-size: 0.95rem; padding: 16px 0; border-top: 1px solid #eee;">
      Tabys Stroy &copy; ${new Date().getFullYear()} | tabys-stroy.kz
    </div>
  </div>
  `;
};

const createUserOrderStatusTemplate = (order) => {
  return `
  <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; border-radius: 12px; border: 1px solid #eee; overflow: hidden;">
    <div style="background: #ff0000; color: #fff; padding: 24px 32px; text-align: center;">
      <img src="https://tabys-stroy.kz/logo.png" alt="Tabys Stroy" style="height: 48px; margin-bottom: 10px;" />
      <h2 style="margin: 0; font-size: 2rem; font-weight: 700;">Ваш заказ #${order._id}</h2>
    </div>
    <div style="padding: 24px 32px;">
      <p style="font-size: 1.1rem; color: #333;">Здравствуйте, <b>${order.user.name}</b>!</p>
      <p style="font-size: 1.1rem; color: #333;">Статус вашего заказа: <b>${order.orderStatus}</b></p>
      <p style="font-size: 1.1rem; color: #333;">Статус оплаты: <b>${order.paymentStatus}</b></p>
      <p style="font-size: 1.1rem; color: #333;"><b>Сумма заказа:</b>
        ${
          order.promoCode && order.discountAmount > 0
            ? `<span style="text-decoration:line-through;color:#888;margin-right:8px;">
                ${order.totalAmount + order.discountAmount} тг
               </span>
               <span style="color:#ff0000;font-weight:600;">
                ${order.totalAmount} тг
               </span>`
            : `${order.totalAmount} тг`
        }
      </p>
      ${
        order.promoCode && order.discountAmount > 0
          ? `<div style="color:#4caf50; font-size:1rem; margin-bottom: 10px;">
                Промокод <b>${order.promoCode}</b> применён: скидка ${order.discountPercent}% (−${order.discountAmount} тг)
             </div>`
          : ''
      }
      <p style="font-size: 1.1rem; color: #333;"><b>Способ получения:</b> ${order.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Доставка'}</p>
      ${order.deliveryMethod === 'delivery' ? `<p style="font-size: 1.1rem; color: #333;"><b>Адрес доставки:</b> ${order.user.address || 'Не указан'}</p>` : ''}
      <div style="background: #fff; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <h3 style="color: #ff0000; margin-top: 0; font-size: 1.2rem;">Товары в заказе:</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${order.orderItems.map(item => `
            <li style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
              <div style="font-weight: 600; color: #222;">${item.name}</div>
              <div style="color: #555;">Количество: ${item.quantity} ${item.selectedUnit}</div>
              <div style="color: #555;">Цена: ${item.price} тг за ${item.selectedUnit}</div>
              <div style="font-weight: 600; color: #ff0000;">Итого: ${item.quantity * item.price} тг</div>
            </li>
          `).join('')}
        </ul>
      </div>
      <div style="text-align: center; margin-top: 32px;">
        <a href="https://tabys-stroy.kz/dashboard/user/orders"
          style="background: #ff0000; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1.1rem; display: inline-block;">
          Перейти к заказам
        </a>
      </div>
    </div>
    <div style="background: #f5f5f5; color: #888; text-align: center; font-size: 0.95rem; padding: 16px 0; border-top: 1px solid #eee;">
      Tabys Stroy &copy; ${new Date().getFullYear()} | tabys-stroy.kz
    </div>
  </div>
  `;
};



// Для создания заказа
export const createOrderController = async (req, res) => {
  try {
    // Получаем все поля, включая скидку и промокод
    const {
      orderItems,
      totalAmount,
      deliveryMethod,
      promoCode,
      discountPercent,
      discountAmount
    } = req.body;

    const order = new Order({
      user: req.user._id,
      orderItems,
      totalAmount,
      deliveryMethod,
      promoCode: promoCode || null,
      discountPercent: discountPercent || 0,
      discountAmount: discountAmount || 0,
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
        address: populatedOrder.user.address
      });
    }

    res.status(201).json({
      success: true,
      message: "Заказ успешно создан",
      order: populatedOrder
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
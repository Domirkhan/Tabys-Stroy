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
          order.promoCode 
            ? `<div>
                <span style="text-decoration:line-through;color:#888;margin-right:8px;">
                  ${order.totalAmount + order.discountAmount} тг
                </span>
                <span style="color:#ff0000;font-weight:600;">
                  ${order.totalAmount} тг
                </span>
                ${order.promoInactive 
                  ? '<span style="color:#ff0000;font-size:0.9em">*Промокод не действует</span>'
                  : ''
                }
              </div>
              <div style="color:#4caf50;font-size:0.9em">
                Промокод <b>${order.promoCode}</b>: скидка ${order.discountPercent}% 
                (−${order.discountAmount} тг)
              </div>`
            : `${order.totalAmount} тг`
        }
      </p>

      <div style="background: #fff; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <h3 style="color: #ff0000; margin-top: 0; font-size: 1.2rem;">Товары в заказе:</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${order.orderItems.map(item => `
            <li style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
              <div style="font-weight: 600; color: #222;">${item.name}</div>
              <div style="color: #555;">
                Количество: ${item.quantity} ${item.selectedUnit}
              </div>
              <div style="color: #555;">
                Цена: ${
                  order.promoCode && 
                  !order.promoInactive && 
                  !order.excludedSubcategories?.includes(item.subcategory) ? 
                  `<span style="text-decoration: line-through; color: #888; margin-right: 8px;">
                    ${item.price} тг/${item.selectedUnit}
                  </span>
                  <span style="color: #ff0000;">
                    ${Math.round(item.price * (1 - order.discountPercent/100))} тг/${item.selectedUnit}
                  </span>
                  <span style="color: #4caf50; font-size: 12px;">
                    −${order.discountPercent}%
                  </span>` 
                  : `${item.price} тг/${item.selectedUnit}
                    ${order.promoCode && order.excludedSubcategories?.includes(item.subcategory) ? 
                    '<div style="background-color: #fff3e0; padding: 8px; border-radius: 4px; margin-top: 8px; font-size: 0.9rem; color: #ff7043">* Промокод не действует на данный товар</div>' 
                    : ''}`
                }
              </div>
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
          <div style="color: #555;">
            Количество: ${item.quantity} ${item.selectedUnit}
          </div>
          <div style="color: #555;">
            Цена: ${
              order.promoCode && !order.promoInactive ? 
              `<span style="text-decoration: line-through; color: #888; margin-right: 8px;">
                ${item.price} тг/${item.selectedUnit}
               </span>
               <span style="color: #ff0000;">
                ${item.price * (1 - order.discountPercent/100)} тг/${item.selectedUnit}
               </span>` 
              : `${item.price} тг/${item.selectedUnit}`
            }
          </div>
          <div style="font-weight: 600; color: #ff0000;">
            Итого: ${
              order.promoCode && !order.promoInactive ?
              `<span style="text-decoration: line-through; color: #888; margin-right: 8px;">
                ${item.quantity * item.price} тг
               </span>
               <span>
                ${item.quantity * item.price * (1 - order.discountPercent/100)} тг
               </span>`
              : `${item.quantity * item.price} тг`
            }
          </div>
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
    const {
      orderItems,
      totalAmount,
      originalAmount,
      deliveryMethod,
      promoCode,
      discountPercent,
      discountAmount,
      excludedSubcategories,
      promoInactive
    } = req.body;

    // Валидация входных данных
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Необходимо указать товары для заказа"
      });
    }

    if (typeof totalAmount !== 'number' || totalAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Некорректная сумма заказа"
      });
    }

    // Преобразование orderItems с подробной проверкой данных
    const processedOrderItems = orderItems.map((item, index) => {
  if (!item) {
    throw new Error(`Товар ${index} отсутствует`);
  }

  if (!item._id) {
    throw new Error(`Отсутствует ID для товара ${index}`);
  }

  if (!item.name) {
    throw new Error(`Отсутствует название для товара ${index}`);
  }

  if (!item.selectedUnit) {
    throw new Error(`Отсутствует единица измерения для товара ${index}`);
  }

  if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
    throw new Error(`Некорректное количество для товара ${index}`);
  }

  const originalPrice = item.pricePerUnit[item.selectedUnit];
  if (typeof originalPrice !== 'number' || originalPrice <= 0) {
    throw new Error(`Некорректная цена для товара ${index}`);
  }

  // Проверяем, применяется ли скидка к данному товару
  const isExcluded = excludedSubcategories?.includes(item.subcategory);
  const finalPrice = isExcluded ? originalPrice : 
    (promoCode && !promoInactive) ? 
      Math.round(originalPrice * (1 - (discountPercent || 0) / 100)) : 
      originalPrice;

  return {
    product: item._id,
    name: item.name,
    price: originalPrice, // Добавляем обязательное поле price
    originalPrice: originalPrice,
    finalPrice: finalPrice,
    quantity: Number(item.quantity),
    selectedUnit: item.selectedUnit,
    subcategory: item.subcategory || null,
    hasDiscount: !isExcluded && promoCode && !promoInactive,
    discountPercent: !isExcluded && promoCode && !promoInactive ? discountPercent : 0
  };
});

    // Создание заказа с проверенными данными
    const order = new Order({
      user: req.user._id,
      orderItems: processedOrderItems,
      totalAmount: Number(totalAmount),
      originalAmount: Number(originalAmount),
      deliveryMethod: deliveryMethod || 'delivery',
      promoCode: promoCode || null,
      discountPercent: Number(discountPercent) || 0,
      discountAmount: Number(discountAmount) || 0,
      promoInactive: Boolean(promoInactive),
      excludedSubcategories: Array.isArray(excludedSubcategories) ? excludedSubcategories : []
    });

    await order.save();

    // Получаем заполненные данные заказа
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email phone address')
      .populate('orderItems.product')
      .populate('orderItems.subcategory');

    // Отправляем уведомления
    try {
      // Уведомление администратору
      await sendAdminEmail(
        `Новый заказ #${order._id}`,
        createAdminOrderTemplate(populatedOrder)
      );

      // Уведомление пользователю
      await sendEmail(
        populatedOrder.user.email,
        `Ваш заказ #${order._id} успешно создан`,
        createUserOrderStatusTemplate(populatedOrder)
      );

      // Оповещение через сокет
      if (global.io) {
        global.io.emit('newOrder', {
          orderId: order._id,
          totalAmount: order.totalAmount,
          originalAmount: order.originalAmount,
          userName: populatedOrder.user.name,
          userEmail: populatedOrder.user.email,
          phone: populatedOrder.user.phone,
          address: populatedOrder.user.address,
          promoDetails: promoCode ? {
            code: promoCode,
            discount: discountPercent,
            amount: discountAmount,
            inactive: promoInactive,
            excludedSubcategories
          } : null
        });
      }
    } catch (emailError) {
      console.error('Ошибка при отправке уведомлений:', emailError);
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
      message: error.message || "Ошибка при создании заказа",
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
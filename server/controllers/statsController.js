import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const getAdminStats = async (req, res) => {
  try {
    // Получаем общее количество заказов
    const totalOrders = await Order.countDocuments();
    
    // Исправляем запрос для успешных заказов
    const successfulOrders = await Order.countDocuments({ 
      orderStatus: "Доставлен" // Изменено с "Delivered" на "Доставлен"
    });
    
    // Исправляем запрос для отменённых заказов
    const cancelledOrders = await Order.countDocuments({ 
      orderStatus: "Отменён" // Изменено с "Cancelled" на "Отменён"
    });
    
    // Получаем общее количество пользователей
    const totalUsers = await User.countDocuments();
    
    // Исправляем запрос для подсчета выручки
    const totalRevenue = await Order.aggregate([
      {
        $match: { 
          orderStatus: "Доставлен",
          paymentStatus: "Оплачен"
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        successfulOrders,
        cancelledOrders,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });

  } catch (error) {
    console.error("Error in getAdminStats:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении статистики",
      error: error.message
    });
  }
};
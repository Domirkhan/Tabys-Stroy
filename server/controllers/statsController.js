import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const getAdminStats = async (req, res) => {
  try {
    // Получаем общее количество заказов
    const totalOrders = await Order.countDocuments();
    
    // Получаем количество успешных заказов (статус "Delivered")
    const successfulOrders = await Order.countDocuments({ 
      orderStatus: "Delivered" 
    });
    
    // Получаем количество отменённых заказов
    const cancelledOrders = await Order.countDocuments({ 
      orderStatus: "Cancelled" 
    });
    
    // Получаем общее количество пользователей
    const totalUsers = await User.countDocuments();
    
    // Получаем общую выручку по успешным заказам
    const totalRevenue = await Order.aggregate([
      {
        $match: { 
          orderStatus: "Delivered",
          paymentStatus: "Paid"
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
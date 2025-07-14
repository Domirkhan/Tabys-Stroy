import express from "express";
import PromoCode from "../models/promoCodeModel.js";
const router = express.Router();

// Генерация промокода (только для админа)
router.post("/generate", async (req, res) => {
  try {
    const { code, discountPercent, expiresAt, minAmount, excludedSubcategories } = req.body;
    const promo = await PromoCode.create({ code, discountPercent, expiresAt, minAmount, excludedSubcategories });
    res.json({ success: true, promo });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

// Проверка промокода
router.post("/check", async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.json({ success: false, message: "Код промокода не указан" });
    }

    const promo = await PromoCode.findOne({ code, isActive: true })
      .populate('excludedSubcategories')
      .lean(); // Используем lean() вместо exec()
    
    if (!promo) {
      return res.json({ success: false, message: "Промокод не найден" });
    }

    if (promo.expiresAt && new Date() > promo.expiresAt) {
      return res.json({ success: false, message: "Промокод истёк" });
    }
    
    // Безопасное извлечение ID подкатегорий
    const excludedSubcategories = (promo.excludedSubcategories || [])
      .map(sc => (sc && (sc._id || sc)) || null)
      .filter(Boolean);
    
    res.json({ 
      success: true, 
      promo: {
        ...promo,
        excludedSubcategories
      } 
    });
  } catch (error) {
    console.error('Ошибка при проверке промокода:', error);
    res.status(500).json({ 
      success: false, 
      message: "Ошибка при проверке промокода",
      error: error.message // Добавляем текст ошибки для отладки
    });
  }
});
router.get("/all", async (req, res) => {
  try {
    const promoCodes = await PromoCode.find().sort({ createdAt: -1 });
    res.json({ success: true, promoCodes });
  } catch (e) {
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    await PromoCode.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: "Ошибка при удалении" });
  }
});
export default router;
import express from "express";
import PromoCode from "../models/promoCodeModel.js";
const router = express.Router();

// Генерация промокода (только для админа)
router.post("/generate", async (req, res) => {
  try {
    const { code, discountPercent, expiresAt } = req.body;
    const promo = await PromoCode.create({ code, discountPercent, expiresAt });
    res.json({ success: true, promo });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

// Проверка промокода
router.post("/check", async (req, res) => {
  const { code } = req.body;
  const promo = await PromoCode.findOne({ code, isActive: true });
  if (!promo) return res.json({ success: false, message: "Промокод не найден" });
  if (promo.expiresAt && new Date() > promo.expiresAt)
    return res.json({ success: false, message: "Промокод истёк" });
  res.json({ success: true, promo });
});
router.get("/all", async (req, res) => {
  try {
    const promoCodes = await PromoCode.find().sort({ createdAt: -1 });
    res.json({ success: true, promoCodes });
  } catch (e) {
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});
export default router;
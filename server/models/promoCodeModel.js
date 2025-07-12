import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: { type: Number, required: true }, // % скидки
  expiresAt: { type: Date }, // дата окончания действия
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("PromoCode", promoCodeSchema);
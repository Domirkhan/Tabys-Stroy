import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountPercent: {
    type: Number,
    required: true
  },
  expiresAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  minAmount: {
    type: Number,
    default: 0
  },
  excludedSubcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  }]
}, { timestamps: true });

export default mongoose.model("PromoCode", promoCodeSchema);
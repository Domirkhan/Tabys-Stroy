import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "users", 
      required: true 
    },
    orderItems: [
      {
        product: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Products", 
          required: true 
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        selectedUnit: { type: String, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    deliveryMethod: {
      type: String,
      enum: ["delivery", "pickup"],
      required: true,
      default: "delivery"
    },
    paymentStatus: { 
      type: String, 
      enum: ["Не обработан", "В обработке", "Оплачен", "Не оплачен"],
      default: "Не обработан"
    },
    orderStatus: {
      type: String,
      enum: ["Не обработан", "В обработке", "Отправлен", "Доставлен", "Отменён"],
      default: "Отменён"
    },
    promoCode: { type: String, default: null },
    discountPercent: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
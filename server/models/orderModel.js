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
    paymentStatus: { 
      type: String, 
      enum: ["Не обработан", "В обработке", "Оплачен", "Не оплачен"],
      default: "Not Processed"
    },
    orderStatus: {
      type: String,
      enum: ["Не обработан", "В обработке", "Отправлен", "Доставлен", "Cancelled"],
      default: "Отменён"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
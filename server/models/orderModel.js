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
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { 
      type: String, 
      enum: ["Not Processed", "Processing", "Paid", "Failed"],
      default: "Not Processed"
    },
    orderStatus: {
      type: String,
      enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Not Processed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
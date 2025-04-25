import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    pricePerUnit: { type: Map, of: Number, default: {} },
    availability: {
      type: String,
      enum: ['Есть в наличии', 'Нет в наличии', 'Под заказ', 'Уточнить наличие'],
      default: 'Есть в наличии'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
    quantity: { type: Number, required: true },

    photos: { type: [String], default: [] },

    shipping: { type: Boolean },
    characteristics: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
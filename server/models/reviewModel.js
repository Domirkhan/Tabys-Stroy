import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  media: [{
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
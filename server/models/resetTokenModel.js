import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // Токен удалится через 15 минут
  }
});

export default mongoose.model("ResetToken", resetTokenSchema);
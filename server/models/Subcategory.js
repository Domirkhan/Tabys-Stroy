import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.model("Subcategory", subcategorySchema);

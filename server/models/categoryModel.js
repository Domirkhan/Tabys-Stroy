import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  iconUrl: {
    type: String,
    default: ''
  }
});
// Добавим pre-save middleware для автоматического создания slug
// Добавим pre-save middleware для автоматического создания slug
categorySchema.pre('save', function(next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true,      // привести к нижнему регистру
      strict: true,     // удалить специальные символы
      trim: true        // удалить пробелы в начале и конце
    });
  }
  next();
});
export default mongoose.model("Category", categorySchema);
import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Upload", UploadSchema);
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  fileKey: {
    type: String,
    required: true,
    unique: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  lastAccessedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Image', ImageSchema);

import mongoose, { Schema } from 'mongoose';

// import moment from 'moment';

/**
 * image schema
 */
const ImageSchema = new Schema(
  {
    link: {
      type: String,
      required: [true, '圖片路徑 為必填'],
    },
    deleteHash: {
      type: String,
      required: [true, '刪除雜湊值 為必填'],
    }
  },
  {
    timestamps: true
  }
);

/**
 * image model
 */
export const Image = mongoose.model('Album', ImageSchema);

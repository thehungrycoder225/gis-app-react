import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const areaSchema = new Schema(
  {
    municipality: {
      type: String,
    },
    barangay: {
      type: String,
    },
  },
  { timestamps: true },
  { collection: 'marinduque_area' }
);

module.exports = mongoose.model('Area', areaSchema);

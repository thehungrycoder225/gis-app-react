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
  { collection: 'marinduque_area', timestamps: true }
);
const Area = mongoose.model('Area', areaSchema);

export default Area;

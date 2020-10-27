import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    department: {
      type: String,
    },
    office: {
      type: String,
    },
  },
  { timestamps: true },
  { collection: 'msc_course' }
);

const Department = mongoose.model('Department', departmentSchema);

export default Department;

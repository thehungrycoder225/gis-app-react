import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    department: {
      type: String,
    },
  },
  { collection: 'msc_department', timestamps: true }
);

const Department = mongoose.model('Department', departmentSchema);

export default Department;

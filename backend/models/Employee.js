import mongoose from 'mongoose';
import geocoder from '../utils/geocoder.js';

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    empId: {
      type: String,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    barangay: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: ['Number'],
        index: '2dsphere',
      },
      formattedAddress: {
        type: String,
      },
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        formattedAddress: String,
      },
    ],
  },
  { collection: 'employee_location', timestamps: true }
);

employeeSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.address = undefined;
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;

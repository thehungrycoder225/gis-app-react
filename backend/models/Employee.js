import mongoose from 'mongoose';
import geocoder from '../utils/geocoder.js';

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    empId: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please input your Employee Id'],
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'Please input your Name'],
    },
    age: {
      type: Number,
      required: [true, 'Please input your Age'],
    },
    phone: {
      type: Number,
      required: [true, 'Please input your Contact Number'],
    },
    landline: {
      type: Number,
    },
    gender: {
      type: String,
      required: [true, 'Please select a gender'],
    },
    department: {
      type: String,
      required: [true, 'Please select your office'],
    },
    street: {
      type: String,
      required: [true, 'Please input your street'],
    },
    municipality: {
      type: String,
      required: [true, 'Please select your municipality'],
    },
    barangay: {
      type: String,
      required: [true, 'Please select your barangay'],
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
  this.locations = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.address = undefined;
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;

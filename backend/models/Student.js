import mongoose from 'mongoose';
import geocoder from '../utils/geocoder.js';
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studentId: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please input your Student Id'],
      maxLength: [
        7,
        'Student Id Should Only Contain a maximum of 7 characters',
      ],
    },
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please input your Name'],
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    phone: {
      type: Number,
    },
    municipality: {
      type: String,
    },
    barangay: {
      type: String,
    },
    school: {
      type: String,
    },
    course: {
      type: String,
    },
    yearLevel: {
      type: Number,
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
  { collection: 'student_location', timestamps: true }
);

studentSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.address = undefined;
  next();
});

const Student = mongoose.model('Students', studentSchema);
export default Student;

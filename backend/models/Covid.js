import mongoose from 'mongoose';
import geocoder from '../utils/geocoder.js';
const Schema = mongoose.Schema;

const covidCaseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    caseId: {
      type: String,
      unique: true,
      required: [true, 'Please add a Case Id'],
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    municipality: {
      type: String,
    },
    barangay: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      required: [true, 'Please Indicate Status'],
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'covid_location', timestamps: true }
);

covidCaseSchema.pre('save', async function (next) {
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

const CovidCase = mongoose.model('CovidCase', covidCaseSchema);
export default CovidCase;

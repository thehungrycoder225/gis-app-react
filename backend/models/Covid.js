import mongoose from 'mongoose';
import geocoder from '../utils/geocoder';
const Schema = mongoose.Schema;

const covidCaseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
  { timestamps: true },
  { collection: 'covid_cases' }
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

covidCaseSchema.pre('save', async function (next) {
  const clientPromise = this.client.map(async (id) => await User.findById(id));
  this.client = await Promise.all(clientPromise);
  next();
});

covidCaseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'client',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const CovidCase = mongoose.model('CovidCase', covidCaseSchema);
export default CovidCase;

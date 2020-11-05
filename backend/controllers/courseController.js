import Course from '../models/Course.js';
import ApiFeatures from '../utils/apifeatures.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';

const getCourse = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Course.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const course = await features.query;
  if (!course) {
    return next(new AppError('Course Does not Exists', 404));
  }
  return res.status(200).json(course);
});

export { getCourse };

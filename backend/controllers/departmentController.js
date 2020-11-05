import Department from '../models/Department.js';
import ApiFeatures from '../utils/apifeatures.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';

const getDepartment = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Department.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const department = await features.query;
  if (!department) {
    return next(new AppError('Department Does not Exists', 404));
  }
  return res.status(200).json(department);
});

export { getDepartment };

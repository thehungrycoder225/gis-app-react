import Area from '../models/Area.js';
import ApiFeatures from '../utils/apifeatures.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';

const getArea = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Area.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const area = await features.query;
  if (!area) {
    return next(
      new AppError('A Municipality with this Query Does not Exists', 404)
    );
  }
  return res.status(200).json({
    success: true,
    count: area.length,
    data: area,
  });
});

export { getArea };

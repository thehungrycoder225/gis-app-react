import Covid from '../models/Covid.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';
import ApiFeatures from '../utils/apifeatures.js';
import generateToken from '../utils/generateToken.js';

// @desc Add New Covid Case
// @route POST /api/covid
// @access Public

const addCovidCase = asyncHandler(async (req, res, next) => {
  const {
    caseId,
    age,
    gender,
    municipality,
    barangay,
    address,
    status,
  } = req.body;

  const caseExist = await Covid.findOne({ caseId });
  if (caseExist) {
    res.status(400);
    throw new Error('Covid Case with that ID IS Already Registered');
  }

  const covid = await Covid.create({
    caseId,
    age,
    gender,
    municipality,
    barangay,
    address,
    status,
  });

  if (covid) {
    res.status(201).json({
      caseId: covid.caseId,
      age: covid.age,
      gender: covid.gender,
      municipality: covid.municipality,
      barangay: covid.barangay,
      address: covid.address,
      location: covid.location,
      status: covid.status,
      formattedAddress: covid.formattedAddress,
      token: generateToken(covid._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Covid Case Data');
  }
});

// @desc Auth & get profile
// @route GET /api/covid/profile
// @access Private

const getCaseProfile = asyncHandler(async (req, res) => {
  const covid = await Covid.findById(req.covid._id);
  if (employee) {
    res.json({
      caseId: covid.caseId,
      age: covid.age,
      gender: covid.gender,
      municipality: covid.municipality,
      barangay: covid.barangay,
      address: covid.address,
      location: covid.location,
      status: covid.status,
      formattedAddress: covid.formattedAddress,
    });
  } else {
    res.status(404);
    throw new AppError('Covid Case not found', 404);
  }
});

// @desc Auth & get profile
// @route PUT /api/covid/profile
// @access Private

const updateCaseProfile = asyncHandler(async (req, res) => {
  const covid = await Covid.findById(req.covid._id);
  if (covid) {
    covid.caseId = req.body.caseId || covid.caseId;
    covid.age = req.body.age || covid.age;
    covid.gender = req.body.gender || covid.gender;
    covid.municipality = req.body.municipality || covid.municipality;
    covid.barangay = req.body.barangay || covid.barangay;
    covid.address = req.body.address || covid.address;
    covid.status = req.body.status || covid.status;

    const updatedCase = await covid.save();
    res.json({
      _id: updatedCase._id,
      caseId: updatedCase.caseId,
      age: updatedCase.age,
      gender: updatedCase.gender,
      municipality: updatedCase.municipality,
      barangay: updatedCase.barangay,
      address: updatedCase.address,
      location: updatedCase.location,
      status: updatedCase.status,
      formattedAddress: updatedCase.formattedAddress,
    });
  } else {
    res.status(404);
    throw new AppError('Covid Case Record not found', 404);
  }
});

// @desc Auth user & get profile
// @route GET /api/covid/profile
// @access Private

const getCases = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Covid.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const covid = await features.query;
  if (!covid) {
    return next(new AppError('Covid Case Does Not Exist', 404));
  }
  return res.status(200).json(covid);
});

// @desc Delete Case
// @route DELETE /api/covid/:id
// @access Private

const deleteCase = asyncHandler(async (req, res) => {
  const covid = await Covid.findById(req.params.id);
  if (covid) {
    await covid.remove();
    res.json({ message: 'Covid Record Removed' });
  } else {
    res.status(404);
    throw new Error('Covid Record not found');
  }
});

const getCaseId = asyncHandler(async (req, res) => {
  const covid = await Covid.findById(req.params.id);
  if (covid) {
    res.json(covid);
  } else {
    res.status(404);
    throw new Error('Case Record not found');
  }
});

// @desc Update Covid Case
// @route PUT /api/case/:id
// @access Private
const updateCase = asyncHandler(async (req, res) => {
  const covid = await Covid.findById(req.params.id);
  if (covid) {
    covid.caseId = req.body.caseId || covid.caseId;
    covid.age = req.body.age || covid.age;
    covid.gender = req.body.gender || covid.gender;
    covid.municipality = req.body.municipality || covid.municipality;
    covid.barangay = req.body.barangay || covid.barangay;
    covid.address = req.body.address || covid.address;
    covid.status = req.body.status || covid.status;

    const updatedCase = await covid.save();
    res.json({
      _id: updatedCase._id,
      caseId: updatedCase.caseId,
      age: updatedCase.age,
      gender: updatedCase.gender,
      municipality: updatedCase.municipality,
      barangay: updatedCase.barangay,
      address: updatedCase.address,
      location: updatedCase.location,
      status: updatedCase.status,
      formattedAddress: updatedCase.formattedAddress,
    });
  } else {
    res.status(404);
    throw new AppError('Covid Case Record not found', 404);
  }
});

export {
  addCovidCase,
  getCaseProfile,
  updateCaseProfile,
  getCases,
  deleteCase,
  updateCase,
  getCaseId,
};

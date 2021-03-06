import Student from '../models/Student.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';
import ApiFeatures from '../utils/apifeatures.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth Student
// @route POST /api/students/login
// @access Public

const authStudent = asyncHandler(async (req, res, next) => {
  const { studentId } = req.body;
  if (!studentId) {
    return next(new AppError('Please provide your valid Student Id', 400));
  }

  const student = await Student.findOne({ studentId });

  if (!student) {
    return next(new AppError('Invalid Student Id', 401));
  } else {
    res.json({
      _id: student._id,
      studentId: student.studentId,
      name: student.name,
      age: student.age,
      gender: student.gender,
      phone: student.phone,
      landline: student.landline,
      school: student.school,
      course: student.course,
      yearLevel: student.yearLevel,
      street: student.street,
      municipality: student.municipality,
      barangay: student.barangay,
      address: student.address,
      token: generateToken(student._id),
    });
  }
});
// @desc Register New Student
// @route POST /api/students
// @access Public

const registerStudent = asyncHandler(async (req, res, next) => {
  const {
    studentId,
    name,
    age,
    gender,
    phone,
    landline,
    school,
    course,
    yearLevel,
    street,
    municipality,
    barangay,
    address,
  } = req.body;

  const studentExist = await Student.findOne({ studentId });
  if (studentExist) {
    res.status(400);
    throw new Error('Student Record Already Exist');
  }

  const student = await Student.create({
    studentId,
    name,
    age,
    gender,
    phone,
    landline,
    school,
    course,
    yearLevel,
    street,
    municipality,
    barangay,
    address,
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      studentId: student.studentId,
      name: student.name,
      age: student.age,
      gender: student.gender,
      phone: student.phone,
      landline: student.landline,
      school: student.school,
      course: student.course,
      yearLevel: student.yearLevel,
      street: student.street,
      municipality: student.municipality,
      barangay: student.barangay,
      address: student.address,
      location: student.location,
      formattedAddress: student.formattedAddress,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Student Data');
  }
});

// @desc Auth student & get profile
// @route GET /api/students/profile
// @access Private

const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id);
  if (student) {
    res.json({
      _id: student._id,
      studentId: student.studentId,
      name: student.name,
      age: student.age,
      gender: student.gender,
      phone: student.phone,
      landline: student.landline,
      street: student.street,
      school: student.school,
      course: student.course,
      yearLevel: student.yearLevel,
      municipality: student.municipality,
      barangay: student.barangay,
      address: student.address,
      location: student.location,
    });
  } else {
    res.status(404);
    throw new AppError('Student Record not found', 404);
  }
});

// @desc Auth student & update profile
// @route PUT /api/students/profile
// @access Private

const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id);
  if (student) {
    student.studentId = req.body.studentId || student.studentId;
    student.name = req.body.name || student.name;
    student.age = req.body.age || student.age;
    student.gender = req.body.gender || student.gender;
    student.phone = req.body.phone || student.phone;
    student.landline = req.body.landline || student.landline;
    student.school = req.body.school || student.school;
    student.course = req.body.course || student.course;
    student.street = req.body.street || student.street;
    student.municipality = req.body.municipality || student.municipality;
    student.barangay = req.body.barangay || student.barangay;
    student.address = req.body.address || student.address;

    const updatedStudent = await student.save();
    res.json({
      _id: updatedStudent._id,
      studentId: updatedStudent.studentId,
      name: updatedStudent.name,
      age: updatedStudent.age,
      gender: updatedStudent.gender,
      phone: updatedStudent.phone,
      landline: updatedStudent.landline,
      school: updatedStudent.school,
      course: updatedStudent.course,
      yearLevel: updatedStudent.yearLevel,
      street: updatedStudent.street,
      municipality: updatedStudent.municipality,
      barangay: updatedStudent.barangay,
      address: updatedStudent.address,
    });
  } else {
    res.status(404);
    throw new AppError('Student Record not found', 404);
  }
});

// @desc Auth user & get profile
// @route GET /api/students/profile
// @access Private

const getStudents = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.displaySize) || 10;
  const page = Number(req.query.pageNumber) || 1;
  const features = new ApiFeatures(Student.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const students = await Student.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  const count = await Student.countDocuments({ ...keyword });
  const studentSearch = await Student.find({ ...keyword });
  if (!students) {
    return next(new AppError('Student Does Not Exist', 404));
  }
  return res
    .status(200)
    .json({ students, page, pages: Math.ceil(count / pageSize) });
});

// @desc Delete Student
// @route DELETE /api/students/:id
// @access Private

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    await student.remove();
    res.json({ message: 'Student Removed' });
  } else {
    res.status(404);
    throw new Error('Student Record not found');
  }
});

const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error('Student Record not found');
  }
});

// @desc Update Student
// @route PUT /api/students/:id
// @access Private
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    student.studentId = req.body.studentId || student.studentId;
    student.name = req.body.name || student.name;
    student.age = req.body.age || student.age;
    student.gender = req.body.gender || student.gender;
    student.phone = req.body.phone || student.phone;
    student.landline = req.body.landline || student.landline;
    student.school = req.body.school || student.school;
    student.course = req.body.course || student.course;
    student.street = req.body.street || student.street;
    student.municipality = req.body.municipality || student.municipality;
    student.barangay = req.body.barangay || student.barangay;
    student.address = req.body.address || student.address;

    const updatedStudent = await student.save();
    res.json({
      _id: updatedStudent._id,
      studentId: updatedStudent.studentId,
      name: updatedStudent.name,
      age: updatedStudent.age,
      gender: updatedStudent.gender,
      phone: updatedStudent.phone,
      landline: updatedStudent.landline,
      school: updatedStudent.school,
      course: updatedStudent.course,
      yearLevel: updatedStudent.yearLevel,
      street: updatedStudent.street,
      municipality: updatedStudent.municipality,
      barangay: updatedStudent.barangay,
      address: updatedStudent.address,
    });
  }
});

export {
  authStudent,
  getStudentProfile,
  registerStudent,
  updateStudentProfile,
  getStudents,
  deleteStudent,
  getStudentById,
  updateStudent,
};

import Student from '../models/Student.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';
import ApiFeatures from '../utils/apifeatures.js';
import generateToken from '../utils/generateToken.js';

// @desc Register New Employee
// @route POST /api/employees/login
// @access Public

const authStudent = asyncHandler(async (req, res, next) => {
  const { empId } = req.body;
  if (!empId) {
    return next(new AppError('Please provide your Employee Id', 400));
  }

  const employee = await Employee.findOne({ empId });

  if (!employee) {
    return next(new AppError('Invalid empId', 401));
  } else {
    res.json({
      _id: employee._id,
      empId: employee.empId,
      name: employee.name,
      age: employee.age,
      phone: employee.phone,
      department: employee.department,
      municipality: employee.municipality,
      barangay: employee.barangay,
      address: employee.address,
      token: generateToken(employee._id),
    });
  }
});
// @desc Register New Employee
// @route POST /api/employee
// @access Public

const registerEmployee = asyncHandler(async (req, res, next) => {
  const {
    empId,
    name,
    age,
    phone,
    department,
    office,
    municipality,
    barangay,
    address,
  } = req.body;

  const employeeExist = await Employee.findOne({ empId });
  if (employeeExist) {
    res.status(400);
    throw new Error('Employee with that Id Already Exist');
  }

  const employee = await Employee.create({
    empId,
    name,
    age,
    phone,
    department,
    office,
    municipality,
    barangay,
    address,
    token: generateToken(employee._id),
  });

  if (employee) {
    res.status(201).json({
      empId: employee.empId,
      name: employee.name,
      age: employee.age,
      phone: employee.phone,
      department: employee.department,
      office: employee.office,
      municipality: employee.municipality,
      barangay: employee.barangay,
      address: employee.address,
      location: employee.location,
      formattedAddress: employee.formattedAddress,
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @desc Auth user & get profile
// @route GET /api/employees/profile
// @access Private

const getEmployeeProfile = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.employee._id);
  if (employee) {
    res.json({
      _id: employee._id,
      empId: employee.empId,
      name: employee.name,
      age: employee.age,
      phone: employee.phone,
      department: employee.department,
      municipality: employee.municipality,
      barangay: employee.barangay,
      address: employee.address,
    });
  } else {
    res.status(404);
    throw new AppError('Employee not found', 404);
  }
});

// @desc Auth user & get profile
// @route PUT /api/employees/profile
// @access Private

const updateEmployeeProfile = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.employee._id);
  if (employee) {
    employee.empId = req.body.empId || employee.empId;
    employee.name = req.body.name || employee.name;
    employee.age = req.body.age || employee.age;
    employee.phone = req.body.phone || employee.phone;
    employee.department = req.body.department || employee.department;
    employee.municipality = req.body.municipality || employee.municipality;
    employee.barangay = req.body.barangay || employee.barangay;
    employee.address = req.body.address || employee.address;

    const updatedEmployee = await employee.save();
    res.json({
      _id: updatedEmployee._id,
      empId: updatedEmployee.empId,
      name: updatedEmployee.name,
      age: updatedEmployee.age,
      phone: updatedEmployee.phone,
      department: updatedEmployee.department,
      municipality: updatedEmployee.municipality,
      barangay: updatedEmployee.barangay,
      address: updatedEmployee.address,
    });
  } else {
    res.status(404);
    throw new AppError('Employee not found', 404);
  }
});

// @desc Auth user & get profile
// @route GET /api/employee/profile
// @access Private

const getEmployees = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Employee.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const employee = await features.query;
  if (!employee) {
    return next(new AppError('Employee Does Not Exist', 404));
  }
  return res.status(200).json(employee);
});

// @desc Delete User
// @route DELETE /api/employee/:id
// @access Private

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    await employee.remove();
    res.json({ message: 'employee Removed' });
  } else {
    res.status(404);
    throw new Error('employee not found');
  }
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

// @desc Update User
// @route PUT /api/employee/:id
// @access Private
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    employee.empId = req.body.empId || employee.empId;
    employee.name = req.body.name || employee.name;
    employee.age = req.body.age || employee.age;
    employee.phone = req.body.phone || employee.phone;
    employee.department = req.body.department || employee.department;
    employee.municipality = req.body.municipality || employee.municipality;
    employee.barangay = req.body.barangay || employee.barangay;
    employee.address = req.body.address || employee.address;

    const updatedEmployee = await employee.save();
    res.json({
      _id: updatedEmployee._id,
      empId: updatedEmployee.empId,
      name: updatedEmployee.name,
      age: updatedEmployee.age,
      phone: updatedEmployee.phone,
      department: updatedEmployee.department,
      municipality: updatedEmployee.municipality,
      barangay: updatedEmployee.barangay,
      address: updatedEmployee.address,
    });
  }
});

export {
  authStudent,
  getEmployeeProfile,
  registerEmployee,
  updateEmployeeProfile,
  getEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
};

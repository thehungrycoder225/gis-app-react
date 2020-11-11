import express from 'express';
import {
  authEmployee,
  getEmployeeProfile,
  registerEmployee,
  updateEmployeeProfile,
  getEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from '../controllers/employeeController.js';
import {
  protect,
  admin,
  employee,
  protectEmployee,
} from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').post(registerEmployee).get(protect, admin, getEmployees);
router.post('/login', authEmployee);
router
  .route('/profile')
  .get(protectEmployee, getEmployeeProfile)
  .put(protectEmployee, updateEmployeeProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteEmployee)
  .get(protect, protectEmployee, getEmployeeById)
  .put(protect, protectEmployee, updateEmployee);

export default router;

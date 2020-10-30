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
  .get(protect, admin, getEmployeeById)
  .put(protect, admin, updateEmployee);

export default router;

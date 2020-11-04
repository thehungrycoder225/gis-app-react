import express from 'express';
import {
  authStudent,
  getStudentProfile,
  registerStudent,
  updateStudentProfile,
  getStudents,
  deleteStudent,
  getStudentById,
  updateStudent,
} from '../controllers/studentController.js';
import {
  protect,
  admin,
  protectStudent,
} from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').post(registerStudent).get(protect, admin, getStudents);
router.post('/login', authStudent);
router
  .route('/profile')
  .get(protectStudent, getStudentProfile)
  .put(protectStudent, updateStudentProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteStudent)
  .get(protect, admin, getStudentById)
  .put(protect, admin, updateStudent);

export default router;

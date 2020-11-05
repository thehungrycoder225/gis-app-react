import express from 'express';
import { getDepartment } from '../controllers/departmentController.js';
const router = express.Router();

router.get('/', getDepartment);

export default router;

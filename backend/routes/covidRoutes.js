import express from 'express';
import {
  addCovidCase,
  getCases,
  deleteCase,
  updateCase,
  getCaseId,
} from '../controllers/covidController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').post(protect, addCovidCase).get(protect, admin, getCases);
router
  .route('/:id')
  .delete(protect, admin, deleteCase)
  .get(protect, admin, getCaseId)
  .put(protect, admin, updateCase);

export default router;

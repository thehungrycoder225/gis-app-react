import express from 'express';
import {
  addCovidCase,
  getCases,
  deleteCase,
  updateCase,
  getCaseId,
} from '../controllers/covidController.js';
import { protect, admin, client } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').post(protect, client, addCovidCase).get(getCases);
router
  .route('/:id')
  .delete(protect, client, deleteCase)
  .get(protect, client, getCaseId)
  .put(protect, client, updateCase);

export default router;

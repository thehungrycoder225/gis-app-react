import express from 'express';
import AreaController from '../controllers/areaController.js';
const router = express.Router();

router.get('/', AreaController);

export default router;

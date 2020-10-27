import express from 'express';
import { getArea } from '../controllers/areaController.js';
const router = express.Router();

router.get('/', getArea);

export default router;

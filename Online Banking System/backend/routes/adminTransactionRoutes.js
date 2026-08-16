import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getAllTransactions } from '../controllers/transactionController.js';
import { authenticate as authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/all', authMiddleware, authorize('admin'), getAllTransactions);

export default router;

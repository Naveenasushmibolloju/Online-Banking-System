import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createTransfer, getTransactions, getTransaction } from '../controllers/transactionController.js';
import { validate } from '../middleware/validate.js';
import * as validators from '../validators/index.js';

const router = express.Router();

router.post('/transfer', authenticate, validate(validators.transferValidation), createTransfer);
router.get('/', authenticate, getTransactions);
router.get('/:id', authenticate, getTransaction);

export default router;

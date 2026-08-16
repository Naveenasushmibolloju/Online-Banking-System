import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getAccounts,
  getAccount,
  getAccountBalance,
  getAllAccounts,
  getAccountByNumber,
} from '../controllers/accountController.js';

const router = express.Router();

router.get('/', authenticate, getAccounts);
router.get('/all', authenticate, authorize('admin'), getAllAccounts);
router.get('/:id', authenticate, getAccount);
router.get('/number/:accountNumber', authenticate, getAccountByNumber);
router.get('/:id/balance', authenticate, getAccountBalance);

export default router;

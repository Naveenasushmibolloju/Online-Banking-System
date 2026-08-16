import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getAdminDashboard,
  getAllCustomers,
  getCustomer,
  toggleCustomerStatus,
} from '../controllers/adminController.js';
import { getAllAccounts } from '../controllers/accountController.js';
import { getAllTransactions } from '../controllers/transactionController.js';
import { getAllDocuments, reviewDocument } from '../controllers/documentController.js';

const router = express.Router();

router.get('/dashboard', authenticate, authorize('admin'), getAdminDashboard);
router.get('/customers', authenticate, authorize('admin'), getAllCustomers);
router.get('/customers/:id', authenticate, authorize('admin'), getCustomer);
router.put('/customers/:id/toggle-status', authenticate, authorize('admin'), toggleCustomerStatus);
router.get('/accounts', authenticate, authorize('admin'), getAllAccounts);
router.get('/transactions', authenticate, authorize('admin'), getAllTransactions);
router.get('/documents', authenticate, authorize('admin'), getAllDocuments);
router.put('/documents/:id/review', authenticate, authorize('admin'), reviewDocument);

export default router;

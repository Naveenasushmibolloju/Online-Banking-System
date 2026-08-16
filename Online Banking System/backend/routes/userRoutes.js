import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getAllUsers, getUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', authenticate, authorize('admin'), getAllUsers);
router.get('/:id', authenticate, getUser);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;

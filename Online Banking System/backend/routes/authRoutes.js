import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as validators from '../validators/index.js';

const router = express.Router();

router.post('/register', validate(validators.registerValidation), register);
router.post('/login', validate(validators.loginValidation), login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validate(validators.profileValidation), updateProfile);
router.put('/change-password', authenticate, validate(validators.changePasswordValidation), changePassword);

export default router;

import { body } from 'express-validator';

export const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('phone').optional().trim(),
  body('address').optional().trim(),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const profileValidation = [
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
  body('phone').optional().trim(),
  body('address').optional().trim(),
];

export const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
];

export const transferValidation = [
  body('receiverAccountNumber').notEmpty().withMessage('Receiver account number is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('description').optional().trim(),
  body('beneficiaryId').optional().isMongoId().withMessage('Invalid beneficiary ID'),
];

export const beneficiaryValidation = [
  body('name').trim().notEmpty().withMessage('Beneficiary name is required'),
  body('accountNumber').trim().notEmpty().withMessage('Account number is required'),
  body('bankName').optional().trim(),
  body('ifscCode').optional().trim(),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
];

export const documentValidation = [
  body('type').isIn(['profile_image', 'id_card', 'passport', 'drivers_license', 'utility_bill', 'other']).withMessage('Invalid document type'),
];

export const reviewDocumentValidation = [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected'),
  body('rejectionReason').optional().trim(),
];

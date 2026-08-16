import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as validators from '../validators/index.js';
import {
  addBeneficiary,
  getBeneficiaries,
  updateBeneficiary,
  deleteBeneficiary,
} from '../controllers/beneficiaryController.js';

const router = express.Router();

router.post('/', authenticate, validate(validators.beneficiaryValidation), addBeneficiary);
router.get('/', authenticate, getBeneficiaries);
router.put('/:id', authenticate, validate(validators.beneficiaryValidation), updateBeneficiary);
router.delete('/:id', authenticate, deleteBeneficiary);

export default router;

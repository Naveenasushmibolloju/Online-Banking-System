import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as validators from '../validators/index.js';
import {
  uploadDocument,
  getDocuments,
  getAllDocuments,
  reviewDocument,
} from '../controllers/documentController.js';

const router = express.Router();

router.post('/upload', authenticate, validate(validators.documentValidation), uploadDocument);
router.get('/my', authenticate, getDocuments);
router.get('/', authenticate, authorize('admin'), getAllDocuments);
router.put('/:id/review', authenticate, authorize('admin'), validate(validators.reviewDocumentValidation), reviewDocument);

export default router;

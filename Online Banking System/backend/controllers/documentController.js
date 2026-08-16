import asyncHandler from '../utils/asyncHandler.js';
import Document from '../models/Document.js';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${req.user._id}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  const { type } = req.body;
  const document = await Document.create({
    customerId: req.user._id,
    type: type || 'other',
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
  });

  res.status(201).json({ message: 'Document uploaded successfully', document });
});

export const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ customerId: req.user._id });
  res.status(200).json(documents);
});

export const getAllDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find().populate('customerId', 'firstName lastName email');
  res.status(200).json(documents);
});

export const reviewDocument = asyncHandler(async (req, res) => {
  const { status, rejectionReason } = req.body;

  const document = await Document.findById(req.params.id);
  if (!document) {
    return res.status(404).json({ message: 'Document not found' });
  }

  document.status = status;
  document.rejectionReason = rejectionReason || '';
  document.reviewedBy = req.user._id;
  document.reviewedAt = new Date();
  await document.save();

  const user = await User.findById(document.customerId).select('firstName lastName');
  await Notification.create({
    userId: document.customerId,
    title: status === 'approved' ? 'KYC Approved' : 'KYC Rejected',
    message: status === 'approved' ? 'Your KYC document has been approved.' : `Your KYC document was rejected. Reason: ${rejectionReason || 'Not specified'}`,
    type: 'kyc',
    relatedId: document._id,
  });

  res.status(200).json({ message: `Document ${status}`, document });
});

export default upload;

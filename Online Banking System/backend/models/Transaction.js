import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const transactionSchema = new mongoose.Schema({
  reference: {
    type: String,
    unique: true,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  receiverAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0'],
  },
  type: {
    type: String,
    enum: ['transfer', 'deposit', 'withdrawal', 'received', 'payment'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'reversed'],
    default: 'pending',
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  beneficiaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beneficiary',
    default: null,
  },
}, {
  timestamps: true,
});

transactionSchema.pre('save', function (next) {
  if (!this.reference) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    this.reference = `TXN-${dateStr}-${uuidv4().slice(0, 8).toUpperCase()}`;
  }
  next();
});

transactionSchema.index({ reference: 1 });
transactionSchema.index({ senderId: 1, createdAt: -1 });
transactionSchema.index({ receiverId: 1, createdAt: -1 });
transactionSchema.index({ status: 1 });

export default mongoose.model('Transaction', transactionSchema);

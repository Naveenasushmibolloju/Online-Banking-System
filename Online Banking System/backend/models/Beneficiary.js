import mongoose from 'mongoose';

const beneficiarySchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Beneficiary name is required'],
    trim: true,
  },
  accountNumber: {
    type: String,
    required: [true, 'Account number is required'],
    trim: true,
  },
  bankName: {
    type: String,
    trim: true,
    default: '',
  },
  ifscCode: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

beneficiarySchema.index({ customerId: 1, accountNumber: 1 }, { unique: true });

export default mongoose.model('Beneficiary', beneficiarySchema);

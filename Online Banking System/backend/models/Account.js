import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    unique: true,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountType: {
    type: String,
    enum: ['savings', 'checking', 'business'],
    default: 'savings',
  },
  balance: {
    type: Number,
    default: 0,
    min: [0, 'Balance cannot be negative'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'frozen', 'closed'],
    default: 'active',
  },
  currency: {
    type: String,
    default: 'USD',
  },
}, {
  timestamps: true,
});

accountSchema.index({ accountNumber: 1 }, { unique: true });

export default mongoose.model('Account', accountSchema);

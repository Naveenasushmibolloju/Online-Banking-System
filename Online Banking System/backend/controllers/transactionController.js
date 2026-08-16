import asyncHandler from '../utils/asyncHandler.js';
import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';
import Beneficiary from '../models/Beneficiary.js';
import Notification from '../models/Notification.js';
import { generateReference } from '../utils/helpers.js';

export const createTransfer = asyncHandler(async (req, res) => {
  const { receiverAccountNumber, amount, description, beneficiaryId } = req.body;
  const senderId = req.user._id;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }

  const senderAccount = await Account.findOne({ customerId: senderId });
  if (!senderAccount) {
    return res.status(404).json({ message: 'Sender account not found' });
  }

  if (senderAccount.status !== 'active') {
    return res.status(400).json({ message: 'Sender account is not active' });
  }

  if (senderAccount.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  const receiverAccount = await Account.findOne({ accountNumber: receiverAccountNumber });
  if (!receiverAccount) {
    return res.status(404).json({ message: 'Receiver account not found' });
  }

  if (receiverAccount.customerId.toString() === senderId.toString()) {
    return res.status(400).json({ message: 'Cannot transfer to your own account' });
  }

  if (receiverAccount.status !== 'active') {
    return res.status(400).json({ message: 'Receiver account is not active' });
  }

  let beneficiary = null;
  if (beneficiaryId) {
    beneficiary = await Beneficiary.findOne({ _id: beneficiaryId, customerId: senderId });
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
  }

  senderAccount.balance -= amount;
  await senderAccount.save();

  receiverAccount.balance += amount;
  await receiverAccount.save();

  const transaction = await Transaction.create({
    reference: generateReference(),
    senderId,
    receiverId: receiverAccount.customerId,
    senderAccountId: senderAccount._id,
    receiverAccountId: receiverAccount._id,
    amount,
    type: 'transfer',
    status: 'completed',
    description: description || 'Money Transfer',
    beneficiaryId: beneficiary ? beneficiary._id : null,
  });

  await Notification.create([
    {
      userId: senderId,
      title: 'Transfer Successful',
      message: `You sent ${amount} to account ${receiverAccountNumber}`,
      type: 'transfer',
      relatedId: transaction._id,
    },
    {
      userId: receiverAccount.customerId,
      title: 'Money Received',
      message: `You received ${amount} from account ${senderAccount.accountNumber}`,
      type: 'received',
      relatedId: transaction._id,
    },
  ]);

  res.status(201).json({
    message: 'Transfer successful',
    transaction,
  });
});

export const getTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { type, status, search, startDate, endDate, page = 1, limit = 20 } = req.query;

  const query = {
    $or: [
      { senderId: userId },
      { receiverId: userId },
    ],
  };

  if (type) query.type = type;
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { reference: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  const transactions = await Transaction.find(query)
    .populate('senderId', 'firstName lastName')
    .populate('receiverId', 'firstName lastName')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Transaction.countDocuments(query);

  res.status(200).json({ transactions, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

export const getTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)
    .populate('senderId', 'firstName lastName email')
    .populate('receiverId', 'firstName lastName email')
    .populate('beneficiaryId', 'name accountNumber');

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  if (
    transaction.senderId._id.toString() !== req.user._id.toString() &&
    transaction.receiverId._id.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.status(200).json(transaction);
});

export const getAllTransactions = asyncHandler(async (req, res) => {
  const { type, status, search, startDate, endDate, page = 1, limit = 20 } = req.query;

  const query = {};
  if (type) query.type = type;
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { reference: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  const transactions = await Transaction.find(query)
    .populate('senderId', 'firstName lastName email')
    .populate('receiverId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Transaction.countDocuments(query);

  res.status(200).json({ transactions, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

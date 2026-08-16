import asyncHandler from '../utils/asyncHandler.js';
import Account from '../models/Account.js';

export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({ customerId: req.user._id });
  res.status(200).json(accounts);
});

export const getAccount = asyncHandler(async (req, res) => {
  const account = await Account.findOne({ _id: req.params.id, customerId: req.user._id });
  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }
  res.status(200).json(account);
});

export const getAccountBalance = asyncHandler(async (req, res) => {
  const account = await Account.findOne({ _id: req.params.id, customerId: req.user._id });
  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }
  res.status(200).json({ balance: account.balance, currency: account.currency, accountNumber: account.accountNumber });
});

export const getAllAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find().populate('customerId', 'firstName lastName email');
  res.status(200).json(accounts);
});

export const getAccountByNumber = asyncHandler(async (req, res) => {
  const account = await Account.findOne({ accountNumber: req.params.accountNumber });
  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }
  res.status(200).json(account);
});

import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';
import Document from '../models/Document.js';

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const totalCustomers = await User.countDocuments({ role: 'customer' });
  const activeCustomers = await User.countDocuments({ role: 'customer', isActive: true });
  const inactiveCustomers = await User.countDocuments({ role: 'customer', isActive: false });
  const totalAccounts = await Account.countDocuments();
  const totalTransactions = await Transaction.countDocuments();
  const completedTransactions = await Transaction.countDocuments({ status: 'completed' });
  const pendingTransactions = await Transaction.countDocuments({ status: 'pending' });
  const failedTransactions = await Transaction.countDocuments({ status: 'failed' });
  const totalDocuments = await Document.countDocuments();
  const pendingDocuments = await Document.countDocuments({ status: 'pending' });
  const approvedDocuments = await Document.countDocuments({ status: 'approved' });
  const rejectedDocuments = await Document.countDocuments({ status: 'rejected' });

  res.status(200).json({
    totalCustomers,
    activeCustomers,
    inactiveCustomers,
    totalAccounts,
    totalTransactions,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
    totalDocuments,
    pendingDocuments,
    approvedDocuments,
    rejectedDocuments,
  });
});

export const getAllCustomers = asyncHandler(async (req, res) => {
  const { search, status, page = 1, limit = 20 } = req.query;

  const query = { role: 'customer' };
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (status) query.isActive = status === 'active';

  const customers = await User.find(query)
    .select('-password')
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.status(200).json({ customers, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

export const getCustomer = asyncHandler(async (req, res) => {
  const customer = await User.findById(req.params.id).select('-password');
  if (!customer || customer.role !== 'customer') {
    return res.status(404).json({ message: 'Customer not found' });
  }

  const accounts = await Account.find({ customerId: customer._id });
  const recentTransactions = await Transaction.find({
    $or: [{ senderId: customer._id }, { receiverId: customer._id }],
  })
    .sort({ createdAt: -1 })
    .limit(10);

  res.status(200).json({ customer, accounts, recentTransactions });
});

export const toggleCustomerStatus = asyncHandler(async (req, res) => {
  const customer = await User.findById(req.params.id);
  if (!customer || customer.role !== 'customer') {
    return res.status(404).json({ message: 'Customer not found' });
  }

  customer.isActive = !customer.isActive;
  await customer.save();

  res.status(200).json({ message: `Customer ${customer.isActive ? 'activated' : 'deactivated'}`, customer });
});

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';
import Beneficiary from '../models/Beneficiary.js';
import Notification from '../models/Notification.js';
import { generateAccountNumber, generateReference } from '../utils/helpers.js';

dotenv.config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/online-banking');

  await User.deleteMany({});
  await Account.deleteMany({});
  await Transaction.deleteMany({});
  await Beneficiary.deleteMany({});
  await Notification.deleteMany({});

  const admin = await User.create({
    firstName: 'System',
    lastName: 'Admin',
    email: 'admin@example.com',
    password: 'Admin@12345',
    phone: '+1234567890',
    address: 'Admin Office',
    role: 'admin',
    isActive: true,
    kycStatus: 'approved',
  });

  const customer1 = await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'customer@example.com',
    password: 'Customer@12345',
    phone: '+1987654321',
    address: '123 Main Street',
    role: 'customer',
    isActive: true,
    kycStatus: 'approved',
  });

  const customer2 = await User.create({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'Customer@12345',
    phone: '+1555123456',
    address: '456 Oak Avenue',
    role: 'customer',
    isActive: true,
    kycStatus: 'approved',
  });

  const customer3 = await User.create({
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    password: 'Customer@12345',
    phone: '+1555987654',
    address: '789 Pine Road',
    role: 'customer',
    isActive: false,
    kycStatus: 'pending',
  });

  const adminAccount = await Account.create({
    accountNumber: generateAccountNumber(),
    customerId: admin._id,
    accountType: 'checking',
    balance: 0,
    status: 'active',
  });

  const account1 = await Account.create({
    accountNumber: generateAccountNumber(),
    customerId: customer1._id,
    accountType: 'savings',
    balance: 5000.0,
    status: 'active',
  });

  const account2 = await Account.create({
    accountNumber: generateAccountNumber(),
    customerId: customer2._id,
    accountType: 'checking',
    balance: 3200.5,
    status: 'active',
  });

  const account3 = await Account.create({
    accountNumber: generateAccountNumber(),
    customerId: customer3._id,
    accountType: 'savings',
    balance: 1500.0,
    status: 'active',
  });

  const beneficiary1 = await Beneficiary.create({
    customerId: customer1._id,
    name: 'Jane Smith',
    accountNumber: account2.accountNumber,
    bankName: 'Global Bank',
    ifscCode: 'GB001',
    email: 'jane@example.com',
    phone: '+1555123456',
  });

  const beneficiary2 = await Beneficiary.create({
    customerId: customer1._id,
    name: 'Bob Johnson',
    accountNumber: account3.accountNumber,
    bankName: 'City Bank',
    ifscCode: 'CB002',
    email: 'bob@example.com',
    phone: '+1555987654',
  });

  const transaction1 = await Transaction.create({
    reference: generateReference(),
    senderId: customer1._id,
    receiverId: customer2._id,
    senderAccountId: account1._id,
    receiverAccountId: account2._id,
    amount: 500.0,
    type: 'transfer',
    status: 'completed',
    description: 'Monthly payment to Jane',
    beneficiaryId: beneficiary1._id,
  });

  const transaction2 = await Transaction.create({
    reference: generateReference(),
    senderId: customer2._id,
    receiverId: customer1._id,
    senderAccountId: account2._id,
    receiverAccountId: account1._id,
    amount: 200.0,
    type: 'received',
    status: 'completed',
    description: 'Refund from Jane',
  });

  const transaction3 = await Transaction.create({
    reference: generateReference(),
    senderId: customer1._id,
    receiverId: customer1._id,
    senderAccountId: account1._id,
    receiverAccountId: account1._id,
    amount: 1000.0,
    type: 'deposit',
    status: 'completed',
    description: 'Salary deposit',
  });

  const transaction4 = await Transaction.create({
    reference: generateReference(),
    senderId: customer1._id,
    receiverId: customer2._id,
    senderAccountId: account1._id,
    receiverAccountId: account2._id,
    amount: 250.0,
    type: 'transfer',
    status: 'pending',
    description: 'Pending transfer',
  });

  const transaction5 = await Transaction.create({
    reference: generateReference(),
    senderId: customer1._id,
    receiverId: customer3._id,
    senderAccountId: account1._id,
    receiverAccountId: account3._id,
    amount: 100.0,
    type: 'transfer',
    status: 'failed',
    description: 'Failed transfer',
  });

  await Notification.create([
    {
      userId: customer1._id,
      title: 'Welcome to Online Banking',
      message: 'Your account has been successfully created.',
      type: 'account',
      relatedId: account1._id,
    },
    {
      userId: customer1._id,
      title: 'Transfer Successful',
      message: 'You sent $500.00 to Jane Smith',
      type: 'transfer',
      relatedId: transaction1._id,
    },
    {
      userId: customer1._id,
      title: 'Money Received',
      message: 'You received $200.00 from Jane Smith',
      type: 'received',
      relatedId: transaction2._id,
    },
    {
      userId: customer2._id,
      title: 'Money Received',
      message: 'You received $500.00 from John Doe',
      type: 'received',
      relatedId: transaction1._id,
    },
    {
      userId: admin._id,
      title: 'New User Registered',
      message: 'A new customer John Doe has registered.',
      type: 'system',
    },
  ]);

  console.log('Seed data created successfully');
  console.log('Admin: admin@example.com / Admin@12345');
  console.log('Customer: customer@example.com / Customer@12345');
  console.log('Customer 2: jane@example.com / Customer@12345');
  console.log('Customer 3: bob@example.com / Customer@12345');

  await mongoose.disconnect();
  process.exit(0);
};

seedData().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

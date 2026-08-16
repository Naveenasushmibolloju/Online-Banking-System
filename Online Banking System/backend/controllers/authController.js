import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import Account from '../models/Account.js';
import { generateAccountNumber } from '../utils/helpers.js';

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, address } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
    role: 'customer',
  });

  const accountNumber = generateAccountNumber();
  await Account.create({
    accountNumber,
    customerId: user._id,
    accountType: 'savings',
    balance: 0,
    status: 'active',
  });

  const token = user.generateToken();

  const { password: _, ...userWithoutPassword } = user.toObject();

  res.status(201).json({
    message: 'Registration successful',
    user: userWithoutPassword,
    token,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!user.isActive) {
    return res.status(403).json({ message: 'Account is deactivated. Contact support.' });
  }

  const token = user.generateToken();
  const { password: _, ...userWithoutPassword } = user.toObject();

  res.status(200).json({
    message: 'Login successful',
    user: userWithoutPassword,
    token,
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, address } = req.body;
  const user = await User.findById(req.user._id);

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.phone = phone || user.phone;
  user.address = address || user.address;

  await user.save();
  const { password: _, ...userWithoutPassword } = user.toObject();

  res.status(200).json({ message: 'Profile updated', user: userWithoutPassword });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: 'Password changed successfully' });
});

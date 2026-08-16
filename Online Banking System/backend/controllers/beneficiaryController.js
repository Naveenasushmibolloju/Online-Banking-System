import asyncHandler from '../utils/asyncHandler.js';
import Beneficiary from '../models/Beneficiary.js';

export const addBeneficiary = asyncHandler(async (req, res) => {
  const { name, accountNumber, bankName, ifscCode, email, phone } = req.body;

  const existingBeneficiary = await Beneficiary.findOne({
    customerId: req.user._id,
    accountNumber,
  });

  if (existingBeneficiary) {
    return res.status(409).json({ message: 'This beneficiary already exists' });
  }

  const beneficiary = await Beneficiary.create({
    customerId: req.user._id,
    name,
    accountNumber,
    bankName,
    ifscCode,
    email,
    phone,
  });

  res.status(201).json({ message: 'Beneficiary added successfully', beneficiary });
});

export const getBeneficiaries = asyncHandler(async (req, res) => {
  const beneficiaries = await Beneficiary.find({ customerId: req.user._id, isActive: true });
  res.status(200).json(beneficiaries);
});

export const updateBeneficiary = asyncHandler(async (req, res) => {
  const { name, bankName, ifscCode, email, phone } = req.body;

  const beneficiary = await Beneficiary.findOne({ _id: req.params.id, customerId: req.user._id });
  if (!beneficiary) {
    return res.status(404).json({ message: 'Beneficiary not found' });
  }

  beneficiary.name = name || beneficiary.name;
  beneficiary.bankName = bankName || beneficiary.bankName;
  beneficiary.ifscCode = ifscCode || beneficiary.ifscCode;
  beneficiary.email = email || beneficiary.email;
  beneficiary.phone = phone || beneficiary.phone;

  await beneficiary.save();
  res.status(200).json({ message: 'Beneficiary updated', beneficiary });
});

export const deleteBeneficiary = asyncHandler(async (req, res) => {
  const beneficiary = await Beneficiary.findOne({ _id: req.params.id, customerId: req.user._id });
  if (!beneficiary) {
    return res.status(404).json({ message: 'Beneficiary not found' });
  }

  beneficiary.isActive = false;
  await beneficiary.save();

  res.status(200).json({ message: 'Beneficiary deleted' });
});

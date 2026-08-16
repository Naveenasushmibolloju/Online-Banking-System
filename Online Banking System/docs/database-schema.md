# Database Schema Documentation

## Overview

The Online Banking System uses MongoDB with Mongoose ODM. The database consists of 6 main collections: Users, Accounts, Transactions, Beneficiaries, Documents, and Notifications.

## Collections

### 1. Users

Stores customer and admin user information.

```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, minlength: 8, select: false),
  phone: String (optional),
  address: String (optional),
  role: String (enum: ['customer', 'admin'], default: 'customer'),
  profileImage: String (optional, default: null),
  isActive: Boolean (default: true),
  kycStatus: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)

**Validation:**
- Email must be valid format
- Password minimum 8 characters
- First name and last name required

### 2. Accounts

Stores bank account information linked to users.

```javascript
{
  _id: ObjectId,
  accountNumber: String (required, unique),
  customerId: ObjectId (ref: User, required),
  accountType: String (enum: ['savings', 'checking', 'business'], default: 'savings'),
  balance: Number (default: 0, min: 0),
  status: String (enum: ['active', 'inactive', 'frozen', 'closed'], default: 'active'),
  currency: String (default: 'USD'),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `accountNumber` (unique)

**Validation:**
- Account number must be unique
- Balance cannot be negative
- Customer ID must reference a valid user

### 3. Transactions

Records all financial transactions between accounts.

```javascript
{
  _id: ObjectId,
  reference: String (required, unique, auto-generated: TXN-YYYYMMDD-XXXXXXXX),
  senderId: ObjectId (ref: User, required),
  receiverId: ObjectId (ref: User, required),
  senderAccountId: ObjectId (ref: Account, required),
  receiverAccountId: ObjectId (ref: Account, required),
  amount: Number (required, min: 0.01),
  type: String (enum: ['transfer', 'deposit', 'withdrawal', 'received', 'payment'], required),
  status: String (enum: ['pending', 'completed', 'failed', 'reversed'], default: 'pending'),
  description: String (optional, default: ''),
  beneficiaryId: ObjectId (ref: Beneficiary, optional, default: null),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `reference` (unique)
- `senderId + createdAt` (compound)
- `receiverId + createdAt` (compound)
- `status`

**Validation:**
- Amount must be greater than 0.01
- Reference auto-generated in format: TXN-YYYYMMDD-XXXXXXXX
- Sender and receiver must exist
- Sender account must have sufficient balance

### 4. Beneficiaries

Stores saved beneficiary accounts for quick transfers.

```javascript
{
  _id: ObjectId,
  customerId: ObjectId (ref: User, required),
  name: String (required),
  accountNumber: String (required),
  bankName: String (optional, default: ''),
  ifscCode: String (optional, default: ''),
  email: String (optional),
  phone: String (optional),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `customerId + accountNumber` (unique compound)

**Validation:**
- Customer cannot add the same account number twice
- Name and account number are required

### 5. Documents

Stores uploaded KYC documents.

```javascript
{
  _id: ObjectId,
  customerId: ObjectId (ref: User, required),
  type: String (enum: ['profile_image', 'id_card', 'passport', 'drivers_license', 'utility_bill', 'other'], required),
  filename: String (required),
  originalName: String (required),
  mimeType: String (required),
  size: Number (required),
  path: String (required),
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  rejectionReason: String (optional, default: ''),
  reviewedBy: ObjectId (ref: User, optional, default: null),
  reviewedAt: Date (optional, default: null),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `customerId`

**Validation:**
- Allowed file types: image/jpeg, image/png, image/jpg, application/pdf
- Maximum file size: 5MB
- Secure filename generation

### 6. Notifications

Stores user notifications for various events.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  title: String (required),
  message: String (required),
  type: String (enum: ['transfer', 'received', 'kyc', 'account', 'security', 'system'], required),
  isRead: Boolean (default: false),
  relatedId: ObjectId (optional, default: null),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId + createdAt` (compound)

**Validation:**
- Title and message required
- Type must be one of predefined values

## Relationships

```
User (1) ──> (N) Account
User (1) ──> (N) Beneficiary
User (1) ──> (N) Document
User (1) ──> (N) Notification
User (1) ──> (N) Transaction (as sender)
User (1) ──> (N) Transaction (as receiver)

Account (1) ──> (N) Transaction
Beneficiary (1) ──> (N) Transaction
Document (1) ──> (N) Transaction (via relatedId)
```

## Data Integrity

- All ObjectId references use Mongoose population for joins
- MongoDB transactions are used for money transfers to ensure atomicity
- Balance updates and transaction records are consistent
- Duplicate account numbers and transaction references are prevented by unique indexes
- Soft deletion is used for beneficiaries (isActive flag)

## Security Considerations

- Password field uses `select: false` to prevent accidental exposure
- Sensitive operations require JWT authentication
- Role-based access control enforced at middleware level
- File uploads are validated for type and size
- No plaintext passwords stored

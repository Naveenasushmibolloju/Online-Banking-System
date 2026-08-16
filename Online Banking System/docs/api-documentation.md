# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register Customer
```http
POST /auth/register
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

**Response:** 201 Created
```json
{
  "message": "Registration successful",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "customer",
    "kycStatus": "pending"
  },
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```

**Response:** 200 OK
```json
{
  "message": "Login successful",
  "user": { /* user object without password */ },
  "token": "jwt_token_here"
}
```

#### Get Profile
```http
GET /auth/profile
```

**Response:** 200 OK
```json
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "customer"
}
```

#### Update Profile
```http
PUT /auth/profile
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "456 Oak Ave"
}
```

#### Change Password
```http
PUT /auth/change-password
```

**Body:**
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass123"
}
```

### Accounts

#### Get My Accounts
```http
GET /accounts
```

**Response:** 200 OK
```json
[
  {
    "_id": "account_id",
    "accountNumber": "ABC123XYZ456",
    "accountType": "savings",
    "balance": 5000.00,
    "status": "active",
    "currency": "USD"
  }
]
```

#### Get Account Balance
```http
GET /accounts/:id/balance
```

**Response:** 200 OK
```json
{
  "balance": 5000.00,
  "currency": "USD",
  "accountNumber": "ABC123XYZ456"
}
```

### Transactions

#### Create Transfer
```http
POST /transactions/transfer
```

**Body:**
```json
{
  "receiverAccountNumber": "XYZ789ABC123",
  "amount": 100.00,
  "description": "Payment for services",
  "beneficiaryId": "beneficiary_id"
}
```

**Response:** 201 Created
```json
{
  "message": "Transfer successful",
  "transaction": {
    "_id": "transaction_id",
    "reference": "TXN-20260816-ABCD1234",
    "senderId": "sender_user_id",
    "receiverId": "receiver_user_id",
    "amount": 100.00,
    "type": "transfer",
    "status": "completed",
    "description": "Payment for services"
  }
}
```

#### Get Transactions
```http
GET /transactions?page=1&limit=20&type=transfer&status=completed&search=ABC123
```

**Response:** 200 OK
```json
{
  "transactions": [ /* array of transactions */ ],
  "total": 50,
  "page": 1,
  "pages": 3
}
```

#### Get Transaction Details
```http
GET /transactions/:id
```

### Beneficiaries

#### Add Beneficiary
```http
POST /beneficiaries
```

**Body:**
```json
{
  "name": "Jane Smith",
  "accountNumber": "XYZ789ABC123",
  "bankName": "Global Bank",
  "ifscCode": "GB001",
  "email": "jane@example.com",
  "phone": "+1555123456"
}
```

#### Get Beneficiaries
```http
GET /beneficiaries
```

#### Update Beneficiary
```http
PUT /beneficiaries/:id
```

#### Delete Beneficiary
```http
DELETE /beneficiaries/:id
```

### Documents

#### Upload Document
```http
POST /documents/upload
Content-Type: multipart/form-data
```

**Body (form-data):**
- `document`: file (max 5MB, types: jpg, png, pdf)
- `type`: string (profile_image, id_card, passport, drivers_license, utility_bill, other)

#### Get My Documents
```http
GET /documents/my
```

#### Review Document (Admin)
```http
PUT /documents/:id/review
```

**Body:**
```json
{
  "status": "approved",
  "rejectionReason": ""
}
```

### Notifications

#### Get Notifications
```http
GET /notifications?page=1&limit=20&unreadOnly=true
```

#### Mark as Read
```http
PUT /notifications/:id/read
```

#### Mark All as Read
```http
PUT /notifications/read-all
```

#### Delete Notification
```http
DELETE /notifications/:id
```

### Admin Endpoints

#### Admin Dashboard
```http
GET /admin/dashboard
```

**Response:** 200 OK
```json
{
  "totalCustomers": 100,
  "activeCustomers": 85,
  "inactiveCustomers": 15,
  "totalAccounts": 120,
  "totalTransactions": 500,
  "completedTransactions": 450,
  "pendingTransactions": 30,
  "failedTransactions": 20
}
```

#### Get All Customers
```http
GET /admin/customers?page=1&limit=20&search=john&status=active
```

#### Get Customer Details
```http
GET /admin/customers/:id
```

#### Toggle Customer Status
```http
PUT /admin/customers/:id/toggle-status
```

#### Get All Accounts
```http
GET /admin/accounts
```

#### Get All Transactions
```http
GET /admin/transactions?page=1&limit=20&type=transfer&status=completed
```

#### Get All Documents
```http
GET /admin/documents
```

#### Review Document
```http
PUT /admin/documents/:id/review
```

## Error Responses

All errors follow this format:
```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding rate limiting middleware.

## Postman Collection

Import `postman/Online-Banking-System.postman_collection.json` into Postman to test all endpoints.

Set the following environment variables in Postman:
- `baseUrl`: `http://localhost:5000/api`
- `token`: Customer JWT token
- `adminToken`: Admin JWT token

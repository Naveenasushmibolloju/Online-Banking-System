````markdown
# 🏦 Online Banking System

<p align="center">
  <img src="https://img.shields.io/badge/Online%20Banking-System-0A66C2?style=for-the-badge&logo=bank&logoColor=white" alt="Online Banking System">
  <img src="https://img.shields.io/badge/Full--Stack-Web%20Application-6C5CE7?style=for-the-badge" alt="Full Stack">
</p>

<p align="center">
  <strong>A secure, modern and responsive full-stack Online Banking System</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Authentication-Secure-success?style=flat-square">
  <img src="https://img.shields.io/badge/Authorization-RBAC-blue?style=flat-square">
  <img src="https://img.shields.io/badge/API-RESTful-orange?style=flat-square">
  <img src="https://img.shields.io/badge/Database-MongoDB-green?style=flat-square">
  <img src="https://img.shields.io/badge/Responsive-Yes-purple?style=flat-square">
</p>

---

## 🌟 Overview

**Online Banking System** is a full-stack web application developed as a capstone project to demonstrate practical implementation of modern web development concepts.

The application provides a realistic digital banking experience where customers can manage accounts, view balances, transfer money, manage beneficiaries, view transactions, upload KYC documents and receive notifications.

Administrators can manage customers, accounts, transactions and KYC documents through a dedicated role-based dashboard.

> 🔐 **Note:** This project is developed for educational and demonstration purposes. It is not intended for processing real financial transactions or as a production banking platform.

---

## ✨ Key Features

### 👤 Customer Banking

- 🔐 Secure registration and login
- 🚪 Secure logout
- 📊 Personalized banking dashboard
- 💰 Account balance management
- 🏦 Account details
- 💸 Money transfers
- 👥 Beneficiary management
- 📜 Transaction history
- 🔎 Transaction search and filtering
- 📄 Transaction details
- 🔔 Notifications
- 👤 Profile management
- 🔑 Password change
- 📁 KYC document upload
- 📱 Responsive mobile interface

### 👨‍💼 Admin Management

- 📊 Admin dashboard
- 👥 Customer management
- 🔍 Customer search
- 🏦 Account monitoring
- 💳 Transaction monitoring
- 📁 KYC document review
- ✅ KYC approval
- ❌ KYC rejection
- 📈 Banking statistics
- 🔐 Role-based access control

---

# 🛡️ Security Features

The application implements several security-focused practices:

- 🔒 JWT-based authentication
- 🔑 Password hashing with bcrypt
- 🛡️ Protected API routes
- 👮 Role-based authorization
- ✅ Server-side input validation
- 📁 Secure file upload validation
- 🌐 CORS configuration
- 🔐 Environment-based secrets
- 🚫 No plain-text password storage
- 🚫 No hardcoded production credentials
- 🧩 Centralized exception handling
- 🔎 User-specific resource authorization

---

# 💸 Banking Transactions

The transaction module provides realistic transaction functionality.

### Supported Transaction Types

| Transaction | Description |
|---|---|
| 💰 Deposit | Adds funds to an account |
| 💸 Withdrawal | Removes funds from an account |
| 🔄 Transfer | Transfers funds between accounts |
| 📥 Received | Records incoming funds |
| 💳 Payment | Records payment transactions |

### Transaction Status

- 🟡 Pending
- 🟢 Completed
- 🔴 Failed
- 🔵 Reversed

### Transfer Validation

The system validates:

- Amount must be greater than zero
- Sender must have sufficient balance
- Sender cannot transfer to the same account
- Beneficiary must exist
- User must be authorized
- Transaction must be recorded correctly

---

# 🧑‍💻 Technology Stack

## 🎨 Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React.js | User interface |
| ⚡ Vite | Development and build tool |
| 🎨 Tailwind CSS | Responsive styling |
| 🧭 React Router | Client-side routing |
| 📡 Axios | API communication |
| 📝 React Hook Form | Form handling |
| 🎯 React Icons | UI icons |

## ⚙️ Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | Server runtime |
| 🚀 Express.js | REST API framework |
| 🔐 JWT | Authentication |
| 🔒 bcrypt | Password hashing |
| ✅ express-validator | Input validation |
| 📁 Multer | File uploads |
| 🌐 CORS | Cross-origin requests |
| ⚙️ dotenv | Environment configuration |

## 🗄️ Database

| Technology | Purpose |
|---|---|
| 🍃 MongoDB | NoSQL database |
| 🧩 Mongoose | MongoDB object modeling |
| ☁️ MongoDB Atlas | Cloud database deployment |

---

# 🗃️ Database Design

The application uses MongoDB with Mongoose.

### 👤 Users

Stores:

* Name
* Email
* Phone
* Password hash
* Role
* Account status
* Profile information
* Timestamps

### 🏦 Accounts

Stores:

* Account number
* Customer reference
* Account type
* Balance
* Status
* Created date
* Updated date

### 💳 Transactions

Stores:

* Transaction reference
* Sender
* Receiver
* Amount
* Transaction type
* Status
* Description
* Date/time

### 👥 Beneficiaries

Stores:

* Customer reference
* Beneficiary name
* Account number
* Bank information
* Relationship/details

### 📁 Documents

Stores:

* Customer reference
* File information
* Document type
* Verification status
* Upload date

### 🔔 Notifications

Stores:

* User reference
* Notification title
* Message
* Read status
* Timestamp

---


# 🔑 Authentication Flow

```text
Register
   ↓
Validate User Data
   ↓
Hash Password
   ↓
Store User
   ↓
Login
   ↓
Verify Password
   ↓
Generate JWT
   ↓
Authenticated Request
   ↓
Authorization Middleware
   ↓
Access Protected Resource
```

---

# 📱 Responsive Design

The application is designed for:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

Responsive elements include:

* Navigation
* Dashboard cards
* Forms
* Tables
* Transaction pages
* Modals
* File uploads
* Admin panels

---

# 🧪 Testing

The application should be tested across the following areas:

| Test Area              | Status |
| ---------------------- | ------ |
| Registration           | ✅      |
| Login                  | ✅      |
| Logout                 | ✅      |
| Authentication         | ✅      |
| Authorization          | ✅      |
| Customer Dashboard     | ✅      |
| Admin Dashboard        | ✅      |
| Account Management     | ✅      |
| Beneficiary Management | ✅      |
| Money Transfer         | ✅      |
| Transaction History    | ✅      |
| Transaction Details    | ✅      |
| KYC Upload             | ✅      |
| KYC Review             | ✅      |
| Notifications          | ✅      |
| Input Validation       | ✅      |
| Error Handling         | ✅      |
| Responsive UI          | ✅      |

---

### 🏠 Home Page

```text
Add screenshot here
```

### 📊 Customer Dashboard

```text
Add screenshot here
```

### 💸 Money Transfer

```text
Add screenshot here
```

### 📜 Transactions

```text
Add screenshot here
```

### 👨‍💼 Admin Dashboard

```text
Add screenshot here
```

---



# 📚 Documentation

| Document              | Location                    |
| --------------------- | --------------------------- |
| 📖 README             | `README.md`                 |
| 🗄️ Database Schema   | `docs/database-schema.md`   |
| 🔌 API Documentation  | `docs/api-documentation.md` |
| 📮 Postman Collection | `postman/`                  |
| 📑 Project Report     | `docs/project-report.md`    |

---

# 🚀 Future Enhancements

Possible future improvements include:

* 📱 Mobile application
* 🔔 Email notifications
* 📲 SMS notifications
* 🔐 Multi-factor authentication
* 💳 Card management
* 📊 Advanced financial analytics
* 🤖 Fraud detection
* 🔎 Advanced transaction monitoring
* ☁️ Cloud media storage
* 🔒 Additional security controls
* 📈 Financial reports
* 🌍 Multi-language support

---


### Core Concepts Demonstrated

```text
✔ Full Stack Development
✔ RESTful API Development
✔ Database Integration
✔ Authentication
✔ Authorization
✔ Role-Based Access Control
✔ File Upload
✔ Input Validation
✔ Exception Handling
✔ Responsive UI
✔ Clean Architecture
✔ API Testing
✔ Deployment
```

---


# ⭐ Acknowledgement

This project was developed as part of an internship capstone project to apply full-stack development concepts, backend API development, database integration, authentication, authorization, validation, testing and deployment practices.

---

<p align="center">

### 🏦 Online Banking System

**Secure • Responsive • Scalable • Full Stack**

⭐ If you find this project useful, consider giving it a star!

</p>

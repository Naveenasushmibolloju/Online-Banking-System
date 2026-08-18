# 🎓 Online Banking System

<div align="center">

# 🏦 Online Banking System

### 🚀 A Modern Full Stack Web Application for Secure Banking, Accounts, Transactions and Financial Management

<img src="https://readme-typing-svg.demolab.com?font=Poppins&size=28&pause=1000&color=00BFFF&center=true&vCenter=true&width=750&lines=Online+Banking+System;React.js+%7C+Node.js+%7C+Express.js;MongoDB+%7C+REST+API;Responsive+Banking+Dashboard;Secure+Authentication;Role-Based+Access+Control;Professional+Full+Stack+Project" />

---

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React.js](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

# 📖 Project Overview

The **Online Banking System** is a professional full-stack web application developed to provide a secure and user-friendly digital banking experience. It enables customers to manage their accounts, view balances, transfer money, manage beneficiaries, track transactions, upload KYC documents, and receive notifications.

The application also provides administrators with a dedicated dashboard to manage customers, monitor accounts and transactions, review KYC documents, and maintain banking operations through role-based access control.

The system follows a modern client-server architecture using **React.js** for the frontend, **Node.js & Express.js** for the backend, and **MongoDB** for database management. RESTful APIs enable secure and efficient communication between the frontend and backend.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

- Secure User Registration
- Secure Login
- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Access Control
- Customer Authorization
- Admin Authorization
- Token-Based Session Management
- Secure Logout
- Password Change

---

## 👤 Customer Management

- Customer Profile
- View Account Details
- Account Balance
- Account Status
- Update Profile
- Profile Image Upload
- Change Password
- Secure Customer Dashboard
- Personal Banking Information

---

## 💰 Account Management

- View Account
- Account Number
- Account Type
- Account Balance
- Account Status
- Account Information
- Account Activity
- Customer-Specific Account Access

---

## 💸 Money Transfer

- Transfer Money
- Select Beneficiary
- Enter Transfer Amount
- Transaction Reference
- Transaction Description
- Balance Validation
- Sufficient Balance Validation
- Same Account Transfer Prevention
- Transaction Status
- Secure Transfer Processing

---

## 👥 Beneficiary Management

- Add Beneficiary
- View Beneficiaries
- Edit Beneficiary
- Delete Beneficiary
- Beneficiary Account Details
- Beneficiary Validation
- Select Beneficiary During Transfer

---

## 📊 Transaction Management

- Transaction History
- Transaction Details
- Deposit Transactions
- Withdrawal Transactions
- Transfer Transactions
- Received Transactions
- Payment Transactions
- Transaction Reference
- Transaction Status
- Transaction Date and Time
- Transaction Search
- Transaction Filtering
- Amount Information

---

## 📁 KYC & Document Management

- Upload KYC Documents
- Profile Image Upload
- Identity Document Upload
- File Type Validation
- File Size Validation
- Secure File Handling
- Document Status
- Admin Document Review
- KYC Approval
- KYC Rejection

---

## 🔔 Notification Management

- Transfer Notifications
- Successful Transaction Notifications
- Failed Transaction Notifications
- Received Money Notifications
- KYC Notifications
- Account Status Notifications
- Notification History
- Read/Unread Notifications

---

## 👨‍💼 Admin Management

- Admin Login
- Admin Dashboard
- Customer Management
- Customer Search
- Customer Details
- Account Monitoring
- Transaction Monitoring
- KYC Document Review
- Approve KYC
- Reject KYC
- System Statistics
- Banking Activity Monitoring
- Role-Based Admin Access

---

## 📈 Dashboard

- Total Customers
- Total Accounts
- Total Transactions
- Completed Transactions
- Pending Transactions
- Failed Transactions
- KYC Statistics
- Account Balance
- Recent Transactions
- Quick Actions
- Banking Statistics
- Interactive Dashboard Cards

---

## 🔍 Search & Filter

- Search by Customer Name
- Search by Email
- Search by Account Number
- Search Transactions
- Filter by Transaction Type
- Filter by Transaction Status
- Filter by Date
- Filter by Account Status
- Customer Filtering
- Transaction Filtering

---

## 🎨 User Interface

- Modern Banking Dashboard
- Professional UI Design
- Responsive Layout
- Sidebar Navigation
- Top Navigation Bar
- Beautiful Dashboard Cards
- Interactive Tables
- Banking Forms
- Form Validation
- Loading States
- Error States
- Success Notifications
- Toast Notifications
- Confirmation Dialogs
- Empty States
- 404 Error Page
- Mobile Friendly Design

---

# 🚀 Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- React Icons

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt
- Express Validator
- Multer
- CORS
- dotenv

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

### Version Control & Deployment

- Git
- GitHub
- Render
- MongoDB Atlas

---

# 🎯 Project Objectives

- Digitize traditional banking operations.
- Provide a secure online banking platform.
- Enable customers to manage their accounts.
- Enable secure money transfers.
- Simplify beneficiary management.
- Maintain transaction history.
- Provide KYC document management.
- Implement role-based access control.
- Improve banking accessibility through responsive design.
- Provide administrators with centralized banking management.
- Demonstrate real-world full-stack development practices.

---

# 🛡️ Security Features

- Password Hashing
- JWT Authentication
- Protected API Routes
- Role-Based Authorization
- Input Validation
- Backend Validation
- Secure File Validation
- Environment Variables
- CORS Configuration
- Centralized Error Handling
- Unauthorized Access Prevention
- Customer Data Protection
- No Plain-Text Password Storage
- No Hardcoded Production Secrets

---

# 🔌 RESTful API

The application uses RESTful APIs for communication between the frontend and backend.

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile
PUT    /api/auth/change-password

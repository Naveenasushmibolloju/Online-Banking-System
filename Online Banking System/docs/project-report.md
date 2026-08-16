# Online Banking System - Project Report

## 1. Title Page

**Online Banking System**
**Task 5: Capstone Project**

A Complete Full-Stack Web Application

**Technologies:** React, Node.js, Express, MongoDB, Tailwind CSS

---

## 2. Certificate/Declaration

This is to certify that the project entitled "Online Banking System" is a genuine work carried out by the student under the guidance of their mentor. The project has not been submitted to any other institution for the award of any degree or diploma.

---

## 3. Acknowledgement

I would like to express my special thanks of gratitude to my mentor and institution for providing me with the opportunity to work on this capstone project. This project has been a great learning experience in full-stack development, database design, and security implementation.

---

## 4. Abstract

The Online Banking System is a comprehensive web-based banking solution that enables customers to manage their finances securely from anywhere. The system provides features including account management, money transfers, beneficiary management, transaction history, KYC document upload, and an admin panel for system management. Built with modern web technologies, the application ensures security through JWT authentication, bcrypt password hashing, and role-based access control. The system is designed with clean architecture principles, ensuring maintainability and scalability.

---

## 5. Introduction

Online banking has become an essential service in the modern financial industry. This project aims to build a fully functional online banking system that simulates real-world banking operations. The system allows customers to perform banking operations such as checking balances, transferring money, managing beneficiaries, and uploading verification documents. Administrators can manage customers, review transactions, and approve KYC documents.

---

## 6. Problem Statement

Traditional banking requires physical visits for many operations. There is a need for a secure, accessible, and user-friendly online platform that allows customers to perform banking operations remotely while ensuring security and data integrity.

---

## 7. Objectives

- Build a secure online banking platform
- Implement user authentication and authorization
- Enable money transfers between accounts
- Provide transaction history and reporting
- Implement beneficiary management
- Support KYC document upload and review
- Create an admin management panel
- Ensure responsive design across all devices

---

## 8. Existing System

Traditional banking systems rely on physical branches and manual processes. Online banking systems exist but often lack modern features, responsive design, or comprehensive security measures.

---

## 9. Proposed System

A modern web-based banking system with:
- RESTful API architecture
- JWT-based authentication
- Real-time transaction processing
- Responsive UI with Tailwind CSS
- Comprehensive admin panel
- Document management system

---

## 10. Scope

The system covers:
- Customer registration and authentication
- Account management
- Money transfers
- Transaction history
- Beneficiary management
- KYC document handling
- Admin management features
- Notification system

---

## 11. Technologies Used

**Frontend:** React.js, Vite, Tailwind CSS, React Router DOM, Axios, React Hook Form, React Icons, Recharts

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, express-validator, Multer

**Tools:** Git, npm, Postman

---

## 12. System Requirements

**Software:**
- Node.js v16+
- MongoDB v4.4+
- Modern web browser

**Hardware:**
- Minimum 4GB RAM
- 2GB free disk space

---

## 13. System Architecture

The application follows a three-tier architecture:
1. **Frontend Layer:** React SPA with component-based architecture
2. **API Layer:** Express.js REST API with middleware for auth, validation, and error handling
3. **Data Layer:** MongoDB with Mongoose ODM

---

## 14. Module Description

### Authentication Module
Handles user registration, login, JWT token generation, and password management.

### Account Module
Manages bank accounts, balances, and account details.

### Transaction Module
Handles money transfers, transaction history, and transaction details.

### Beneficiary Module
Manages saved beneficiaries for quick transfers.

### Document Module
Handles KYC document uploads and admin review process.

### Notification Module
Manages user notifications for various events.

### Admin Module
Provides administrative features for customer and system management.

---

## 15. Database Design

See [database-schema.md](database-schema.md) for complete schema documentation.

### Collections:
1. Users - Customer and admin accounts
2. Accounts - Bank account information
3. Transactions - Financial transaction records
4. Beneficiaries - Saved transfer recipients
5. Documents - KYC document records
6. Notifications - User notifications

---

## 16. ER/Data Relationship Explanation

- One User can have multiple Accounts
- One User can have multiple Beneficiaries
- One User can have multiple Documents
- One User can have multiple Notifications
- One User can be sender or receiver in multiple Transactions
- One Account can be involved in multiple Transactions
- One Beneficiary can be referenced in multiple Transactions

---

## 17. API Design

See [api-documentation.md](api-documentation.md) for complete API documentation.

The API follows RESTful conventions with:
- Resource-based URLs
- HTTP method semantics
- Consistent response formats
- Proper status codes

---

## 18. Authentication & Authorization

- JWT-based authentication with 7-day expiration
- Passwords hashed with bcrypt (12 rounds)
- Role-based access control (customer/admin)
- Protected routes on both frontend and backend
- Token stored in localStorage with Axios interceptors

---

## 19. Security

- Password hashing with bcrypt
- JWT authentication
- Role-based authorization
- Input validation on all endpoints
- Secure file upload validation
- CORS configuration
- No secrets in frontend code
- Environment variables for sensitive data

---

## 20. User Interface

Modern, responsive banking UI built with Tailwind CSS featuring:
- Professional dashboard layouts
- Clean forms with validation
- Responsive tables
- Status badges
- Loading states
- Error states
- Mobile-friendly navigation

---

## 21. Implementation

The project was implemented following clean architecture principles:
- Separation of concerns (controllers, routes, models, middleware)
- Reusable components and services
- Consistent error handling
- Input validation at multiple layers

---

## 22. Testing

Manual testing performed for:
- User registration and login
- Authentication flow
- Money transfers
- Balance validation
- Beneficiary CRUD
- Document upload
- Admin features
- Responsive design

---

## 23. Test Cases

| Feature | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| Registration | Valid input | User created, account created | PASS |
| Login | Valid credentials | Token returned | PASS |
| Login | Invalid credentials | Error message | PASS |
| Transfer | Sufficient balance | Transfer successful | PASS |
| Transfer | Insufficient balance | Error message | PASS |
| Transfer | Own account | Error message | PASS |
| Beneficiary | Add new | Created successfully | PASS |
| Document | Upload valid file | Upload successful | PASS |
| Document | Upload invalid type | Error message | PASS |
| Admin | View dashboard | Stats displayed | PASS |

---

## 24. Results

The application successfully implements all required features:
- Complete authentication system
- Functional money transfers with balance validation
- Transaction history with filtering
- Beneficiary management
- KYC document handling
- Admin management panel
- Responsive UI

---

## 25. Screenshots

(Screenshots to be added during demonstration)

---

## 26. Advantages

- Secure authentication and authorization
- Real-time transaction processing
- Responsive design for all devices
- Clean and maintainable codebase
- Comprehensive admin features
- Document management system

---

## 27. Limitations

- No real email verification
- No SMS notifications
- No real payment gateway integration
- MongoDB required for data persistence

---

## 28. Future Enhancements

- Email and SMS notifications
- Two-factor authentication
- Account statements PDF generation
- Bill payment integration
- Mobile app (React Native)
- Real-time chat support
- Advanced analytics dashboard
- Multi-currency support

---

## 29. Conclusion

The Online Banking System successfully demonstrates a complete full-stack web application with secure authentication, real-time transactions, and comprehensive banking features. The project showcases proficiency in React, Node.js, Express, and MongoDB while following best practices for security, architecture, and user experience.

---

## 30. References

- React Documentation: https://react.dev/
- Express.js: https://expressjs.com/
- MongoDB: https://www.mongodb.com/
- Mongoose: https://mongoosejs.com/
- Tailwind CSS: https://tailwindcss.com/
- JWT: https://jwt.io/

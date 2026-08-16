# Online Banking System

A complete, production-ready Online Banking System built with React, Node.js, Express, and MongoDB. This capstone project implements secure authentication, real-time transactions, beneficiary management, KYC document handling, and comprehensive admin management features.

## Features

### Customer Features
- Secure registration and login with JWT authentication
- Dashboard with account balance, recent transactions, and notifications
- Account details and balance viewing
- Money transfer to beneficiaries with real-time validation
- Beneficiary management (add, edit, delete)
- Complete transaction history with search and filtering
- Transaction details view
- KYC document upload and status tracking
- Notifications for transfers and account activities
- Profile management
- Password change
- Settings page

### Admin Features
- Admin dashboard with system statistics
- Customer management and search
- Account overview
- Transaction monitoring
- KYC document review and approval/rejection
- System activity monitoring

### Technical Features
- RESTful API with Express.js
- MongoDB with Mongoose ODM
- JWT-based authentication and role-based authorization
- Secure password hashing with bcrypt
- Input validation with express-validator
- File upload with Multer
- Centralized error handling
- Responsive UI with Tailwind CSS
- Protected routes and API endpoints
- MongoDB transactions for safe money transfers
- Unique transaction references

## Technology Stack

### Frontend
- React.js 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- React Icons
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- express-validator
- Multer
- CORS
- dotenv

## Project Structure

```
online-banking-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── admin/
│   │   ├── layouts/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── docs/
│   ├── database-schema.md
│   ├── api-documentation.md
│   └── project-report.md
├── postman/
│   └── Online-Banking-System.postman_collection.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/online-banking-system.git
cd online-banking-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/online-banking
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

## Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if installed as service)
net start MongoDB

# macOS
brew services start mongodb/brew/mongodb-community

# Linux
sudo systemctl start mongod
```

### Seed Database (Optional)
```bash
cd backend
npm run seed
```

This creates demo accounts:
- **Admin**: admin@example.com / Admin@12345
- **Customer**: customer@example.com / Customer@12345
- **Customer 2**: jane@example.com / Customer@12345
- **Customer 3**: bob@example.com / Customer@12345

### Start Backend
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

## API Documentation

See [docs/api-documentation.md](docs/api-documentation.md) for complete API documentation.

## Database Schema

See [docs/database-schema.md](docs/database-schema.md) for database schema documentation.

## Testing

The application has been tested for:
- User registration and login
- JWT authentication and authorization
- Money transfers with balance validation
- Beneficiary CRUD operations
- Transaction history and filtering
- KYC document upload and review
- Admin dashboard and customer management
- Responsive design across devices

## Deployment

### Backend Deployment (Render)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set `VITE_API_URL` to your backend URL

### MongoDB Atlas
1. Create a MongoDB Atlas cluster
2. Update `MONGO_URI` in backend environment variables
3. Configure IP whitelist and database user

## Security

- Passwords are hashed with bcrypt (12 rounds)
- JWT tokens for authentication
- Role-based access control
- Input validation on all endpoints
- Secure file upload validation
- CORS configuration
- No sensitive data in frontend source code
- Environment variables for secrets

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | Admin@12345 |
| Customer | customer@example.com | Customer@12345 |

## License

This project is created for educational purposes as a capstone project.

## Author

Built as a complete internship capstone project demonstrating full-stack development skills.

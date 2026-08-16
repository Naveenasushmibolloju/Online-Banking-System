# Render Deployment Guide - Online Banking System

## Prerequisites

1. **GitHub Account** - Your code must be pushed to a GitHub repository
2. **Render Account** - Sign up at https://render.com
3. **MongoDB Atlas Account** - Sign up at https://www.mongodb.com/atlas/database

---

## Step 1: Prepare Your Code

### 1.1 Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Online Banking System"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/online-banking-system.git
git branch -M main
git push -u origin main
```

### 1.2 Verify Repository Structure

Your GitHub repository should look like this:
```
online-banking-system/
├── backend/
│   ├── render.yaml
│   ├── package.json
│   ├── server.js
│   ├── app.js
│   ├── .env.example
│   └── ...
├── frontend/
│   ├── render.yaml
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   └── ...
├── .gitignore
└── README.md
```

---

## Step 2: Set Up MongoDB Atlas

### 2.1 Create a Cluster

1. Go to https://cloud.mongodb.com/
2. Sign up or log in
3. Click **"Create a new project"** → name it `online-banking`
4. Click **"Build a database"**
5. Choose **Shared** (Free tier)
6. Select a provider and region closest to you
7. Name your cluster `online-banking-cluster`
8. Click **"Create"**

### 2.2 Create Database User

1. Go to **Database Access** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username: `admin` (or your preferred username)
5. Enter a strong password (save this!)
6. Grant **"Read and write to any database"** permission
7. Click **"Add User"**

### 2.3 Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 2.4 Get Connection String

1. Go to **Database** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"**
4. Select **Node.js** and version **5.5 or later**
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `online-banking`

Example:
```
mongodb+srv://admin:YourPassword@online-banking-cluster.xxxxx.mongodb.net/online-banking?retryWrites=true&w=majority
```

---

## Step 3: Deploy Backend to Render

### 3.1 Create New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Authorize Render to access your GitHub
5. Select your `online-banking-system` repository

### 3.2 Configure Backend Service

**Name:** `online-banking-backend`

**Region:** Choose closest to you (e.g., Ohio, Frankfurt, Singapore)

**Branch:** `main` (or your default branch)

**Runtime:** Node.js

**Build Command:**
```bash
cd backend && npm install
```

**Start Command:**
```bash
cd backend && npm start
```

**Plan:** Free

### 3.3 Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGO_URI` | `mongodb+srv://admin:YourPassword@online-banking-cluster.xxxxx.mongodb.net/online-banking?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production-12345` |
| `JWT_EXPIRE` | `7d` |
| `FRONTEND_URL` | `https://online-banking-frontend.onrender.com` |

**Important:**
- Replace `YourPassword` with your actual MongoDB password
- Replace `online-banking-cluster.xxxxx.mongodb.net` with your actual Atlas cluster URL
- Use a strong, unique JWT secret

### 3.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Your backend URL will be: `https://online-banking-backend.onrender.com`

### 3.5 Verify Backend

Visit: `https://online-banking-backend.onrender.com/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Step 4: Deploy Frontend to Render

### 4.1 Create New Static Site

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Select your `online-banking-system` repository

### 4.2 Configure Frontend Site

**Name:** `online-banking-frontend`

**Branch:** `main` (or your default branch)

**Build Command:**
```bash
cd frontend && npm install && npm run build
```

**Publish Directory:**
```
frontend/dist
```

### 4.3 Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://online-banking-backend.onrender.com/api` |

**Important:** Use your actual backend URL from Step 3.4

### 4.4 Deploy

1. Click **"Create Static Site"**
2. Wait for deployment to complete (3-5 minutes)
3. Your frontend URL will be: `https://online-banking-frontend.onrender.com`

---

## Step 5: Update Backend CORS

After deploying the frontend:

1. Go to your **Backend** service on Render
2. Click **"Environment"** in the left sidebar
3. Update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://online-banking-frontend.onrender.com
   ```
4. Click **"Save Changes"**
5. Render will automatically redeploy your backend

---

## Step 6: Seed Database

### 6.1 Access Render Shell

1. Go to your **Backend** service on Render
2. Click **"Shell"** in the left sidebar
3. This opens a terminal connected to your backend

### 6.2 Run Seed Script

In the Render shell, run:
```bash
cd backend && npm run seed
```

You should see:
```
Seed data created successfully
Admin: admin@example.com / Admin@12345
Customer: customer@example.com / Customer@12345
Customer 2: jane@example.com / Customer@12345
Customer 3: bob@example.com / Customer@12345
```

---

## Step 7: Test Your Application

### 7.1 Access Frontend

Visit: `https://online-banking-frontend.onrender.com`

### 7.2 Test Login

**Admin Account:**
- Email: `admin@example.com`
- Password: `Admin@12345`

**Customer Account:**
- Email: `customer@example.com`
- Password: `Customer@12345`

### 7.3 Test Features

1. **Register** a new account
2. **Login** with demo credentials
3. **View Dashboard** - should show balance, transactions, notifications
4. **Transfer Money** - test with beneficiary accounts
5. **View Transactions** - check transaction history
6. **Upload Documents** - test KYC upload
7. **Admin Panel** - login as admin and check customer management

---

## Step 8: Custom Domain (Optional)

### 8.1 Add Custom Domain

1. Go to your **Frontend** or **Backend** service on Render
2. Click **"Settings"**
3. Scroll to **"Custom Domains"**
4. Click **"Add Custom Domain"**
5. Enter your domain (e.g., `bank.yourdomain.com`)
6. Follow Render's instructions to update your DNS records

### 8.2 Update CORS

If you add a custom domain, remember to update `FRONTEND_URL` in your backend environment variables.

---

## Troubleshooting

### Backend won't start

**Check logs:**
1. Go to your backend service on Render
2. Click **"Logs"**
3. Look for error messages

**Common issues:**
- **MongoDB connection failed:** Check your MONGO_URI is correct
- **Port error:** Ensure PORT is set to `10000`
- **JWT errors:** Ensure JWT_SECRET is set

### Frontend shows blank page

**Check browser console (F12):**
1. Look for API errors
2. Verify VITE_API_URL is set correctly
3. Check CORS errors

**Fix:**
- Update `VITE_API_URL` to point to your backend URL
- Redeploy frontend

### CORS errors

**Solution:**
1. Update `FRONTEND_URL` in backend environment variables
2. Redeploy backend

### MongoDB connection timeout

**Solution:**
1. Verify MongoDB Atlas cluster is running
2. Check IP whitelist includes `0.0.0.0/0`
3. Verify database user credentials
4. Check connection string format

---

## Environment Variables Reference

### Backend (Render Web Service)

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | Yes | Set to `10000` |
| `MONGO_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Strong random string for JWT |
| `JWT_EXPIRE` | Yes | Token expiration (e.g., `7d`) |
| `FRONTEND_URL` | Yes | Your frontend URL |

### Frontend (Render Static Site)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Your backend API URL |

---

## Post-Deployment Checklist

- [ ] Backend health check returns 200 OK
- [ ] Frontend loads without errors
- [ ] Admin login works (`admin@example.com` / `Admin@12345`)
- [ ] Customer login works (`customer@example.com` / `Customer@12345`)
- [ ] Dashboard loads with data
- [ ] Transfer money works
- [ ] Transactions history loads
- [ ] Beneficiaries can be added
- [ ] Documents can be uploaded
- [ ] Admin can view customers
- [ ] Admin can approve/reject documents
- [ ] No CORS errors in browser console
- [ ] Mobile responsive design works

---

## Important Notes

1. **Free Tier Limits:**
   - Backend: 512 MB RAM, 100 GB bandwidth/month
   - Frontend: 100 GB bandwidth/month
   - Services sleep after 15 minutes of inactivity

2. **Database:**
   - MongoDB Atlas free tier: 512 MB storage
   - Consider upgrading for production use

3. **Security:**
   - Change JWT_SECRET to a strong random string
   - Use strong MongoDB passwords
   - Enable IP whitelist in production

4. **Updates:**
   - Push to GitHub → Render auto-deploys
   - Or click **"Manual Deploy"** → **"Deploy latest commit"**

5. **Monitoring:**
   - Check Render dashboard for logs and metrics
   - Set up email notifications for deployment failures

---

## Support

If you encounter issues:
1. Check Render logs for error messages
2. Verify all environment variables are set
3. Test API endpoints directly using Postman
4. Check MongoDB Atlas connection

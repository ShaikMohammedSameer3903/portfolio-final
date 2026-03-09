# Setup Instructions

## Quick Start Guide

### Step 1: Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### Step 2: Configure Backend

The `.env` file has been created with your password. The current settings are:

```
PORT=3000
JWT_SECRET=your-secret-key-change-in-production-use-a-random-string-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Shaiksameer/3909
```

**Important**: Change `JWT_SECRET` to a random string for production!

### Step 3: Start Both Servers

You need to run **TWO terminals**:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

### Step 4: Access Your Portfolio

- **Frontend**: Open `http://localhost:5173` in your browser
- **Backend API**: Running at `http://localhost:3000`
- **Admin Login**: Click the lock icon (🔒) in the top-right corner

### Admin Credentials

- **Email**: `admin@example.com`
- **Password**: `Shaiksameer/3909`

## Troubleshooting

### Error: "ECONNREFUSED 127.0.0.1:3000"

**Solution**: Start the backend server first! The frontend tries to connect to the backend for data. If the backend isn't running, the frontend will use fallback data (which is fine for viewing, but you won't be able to use the admin dashboard).

### Error: "Cannot find module"

**Solution**: Make sure you ran `npm install` in both frontend and backend directories.

### Admin Login Not Working

**Solution**: 
1. Make sure the backend is running
2. Check that `.env` file exists in the backend directory
3. Verify the password in `.env` matches what you're entering

## Production Deployment

For production:
1. Change `JWT_SECRET` to a strong random string (at least 32 characters)
2. Update `ADMIN_PASSWORD` to something secure
3. Set environment variables on your hosting platform (Vercel, Render, etc.)


# Quick Start Guide

## ✅ Issues Fixed

1. ✅ Admin password set to: `Shaiksameer/3909`
2. ✅ Backend connection errors handled gracefully
3. ✅ Frontend will work even if backend is not running (uses fallback data)

## 🚀 How to Run

### **IMPORTANT**: You need TWO terminals!

### Terminal 1: Start Backend

```bash
cd backend
npm install
npm run dev
```

You should see:
```
Server running on port 3000
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

## 🔐 Admin Login

1. Open `http://localhost:5173` in your browser
2. Click the **lock icon (🔒)** in the top-right corner
3. Login with:
   - **Email**: `admin@example.com`
   - **Password**: `Shaiksameer/3909`

## ⚠️ Common Issues

### "ECONNREFUSED" Errors

**Solution**: These errors are normal if the backend isn't running. The frontend will use fallback data, so the site will still work. To remove the errors, start the backend server (Terminal 1).

### Admin Dashboard Not Working

**Solution**: Make sure the backend is running! The admin dashboard requires the backend to be active.

### Login Fails

**Solution**: 
1. Check that backend is running
2. Verify `.env` file exists in `backend` folder
3. Password should be: `Shaiksameer/3909`

## 📝 Current Configuration

- **Backend Port**: 3000
- **Frontend Port**: 5173
- **Admin Email**: admin@example.com
- **Admin Password**: Shaiksameer/3909

The `.env` file has been created automatically in the `backend` folder with your password.


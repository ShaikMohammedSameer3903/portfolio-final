# How to Fix the 500 Internal Server Error

## The Problem

The 500 error occurs because the backend server is not running or there's an issue with the backend code.

## Solution

### Step 1: Make sure backend dependencies are installed

```bash
cd backend
npm install
```

### Step 2: Start the backend server

Open a **NEW terminal** and run:

```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 3000
Health check: http://localhost:3000/health
```

### Step 3: Verify backend is working

Open your browser and go to: `http://localhost:3000/health`

You should see:
```json
{"status":"ok","timestamp":"..."}
```

### Step 4: Test the API endpoint

Go to: `http://localhost:3000/api/public/profile`

You should see your profile data in JSON format.

## What's Been Fixed

1. ✅ **Skills updated** - Now matches your resume:
   - Programming: C, Java
   - Web: HTML, CSS, JavaScript, React.js, Vite, Spring Boot, Node.js
   - DevOps: AWS, Docker, Jenkins, Git
   - Database: SQL, MySQL
   - OS: Linux, Windows
   - Tools: Power BI, LaTeX

2. ✅ **Projects updated** - Now matches your resume:
   - ApnaRide (March 2025 - Present) with detailed description
   - Online Shopping Application (February 2025 - March 2025) with detailed description

3. ✅ **Error handling improved** - Backend routes now have try-catch blocks to prevent crashes

4. ✅ **Better error messages** - More descriptive error responses

## If Errors Persist

1. **Check backend terminal** - Look for any error messages
2. **Check .env file** - Make sure it exists in `backend` folder with correct password
3. **Restart backend** - Stop (Ctrl+C) and restart the backend server
4. **Check port** - Make sure port 3000 is not being used by another application

## Quick Test

After starting the backend, test these URLs:
- `http://localhost:3000/health` - Should return `{"status":"ok"...}`
- `http://localhost:3000/api/public/profile` - Should return profile data
- `http://localhost:3000/api/public/skills` - Should return skills array
- `http://localhost:3000/api/public/projects` - Should return projects array


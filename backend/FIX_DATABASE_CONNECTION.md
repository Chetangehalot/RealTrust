# Fix Database Connection - Step by Step Guide

## Problem
Data is showing in admin panel but not saving to MongoDB Atlas database.

## Solution Steps

### Step 1: Verify Your .env File

1. Open `backend/.env` file
2. Make sure it has this format:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/RealTrust?retryWrites=true&w=majority
PORT=5000
```

**CRITICAL:** The database name `/RealTrust` must be in the connection string BEFORE the `?`

### Step 2: Verify Database Name

Run this command to check:

```powershell
cd backend
npm run verify-db
```

It should show: `✅ Database name is correct: RealTrust`

### Step 3: Test Database Connection

Run this to test if you can connect and save:

```powershell
cd backend
npm run test-save
```

This will:
- Connect to MongoDB
- Save a test subscription
- Verify it was saved
- Show the database name
- Clean up the test data

### Step 4: Restart Your Server

**IMPORTANT:** After updating `.env`, you MUST restart the server:

1. Stop the current server (Ctrl+C)
2. Start it again:

```powershell
cd backend
npm start
```

### Step 5: Check Server Startup Logs

When the server starts, you should see:

```
🔄 Connecting to MongoDB...
📍 Connection String: mongodb+srv://username:****@cluster...
✅ MongoDB Connected: ...
📊 Database Name: RealTrust
🔗 Connection State: Connected
🚀 Server is running on port 5000
📊 Database: RealTrust
✅ Ready to accept requests
```

**If you see "Database Name: RealTrust" - you're good!**

### Step 6: Test Adding Data

1. Add a subscription from the website or admin panel
2. **Watch the server console** - you should see:

```
📧 Subscription request received: email@example.com
💾 Saving subscription to database...
🔍 Database connection state: Connected
🔍 Database name: RealTrust
✅ Subscription saved successfully!
   - ID: 65f1234567890abcdef12345
   - Email: email@example.com
✅ Verification: Subscription exists in database
```

### Step 7: Verify in MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click on your cluster
3. Click "Browse Collections"
4. **Make sure you select the "RealTrust" database** (not "test" or any other)
5. Check the collections:
   - `subscriptions`
   - `projects`
   - `clients`
   - `contacts`

## Common Issues

### Issue 1: Database name is wrong

**Symptom:** Server shows different database name

**Fix:** Update `.env` file - make sure connection string has `/RealTrust` before the `?`

### Issue 2: Connection fails

**Symptom:** Server shows "Error connecting to MongoDB"

**Fix:**
- Check username and password in connection string
- Verify IP is whitelisted in MongoDB Atlas Network Access
- Check internet connection

### Issue 3: Data not saving

**Symptom:** No errors but data doesn't appear in database

**Fix:**
- Check server console for error messages
- Verify database name is "RealTrust"
- Make sure server shows "Database: RealTrust" on startup
- Check if you're looking at the correct database in MongoDB Atlas

### Issue 4: Server starts but database not connected

**Symptom:** Server runs but API returns "Database not connected"

**Fix:**
- Check `.env` file exists and has MONGODB_URI
- Restart server after updating `.env`
- Check MongoDB Atlas cluster is running

## Verification Checklist

- [ ] `.env` file exists in `backend/` folder
- [ ] `MONGODB_URI` includes `/RealTrust` before the `?`
- [ ] Server shows "Database Name: RealTrust" on startup
- [ ] Server shows "Connection State: Connected"
- [ ] Test save script works (`npm run test-save`)
- [ ] When adding data, server console shows "✅ Saved successfully"
- [ ] Data appears in MongoDB Atlas under "RealTrust" database

## Still Not Working?

1. **Check server console** for any error messages
2. **Run test scripts:**
   ```powershell
   npm run verify-db    # Check database name
   npm run test-save    # Test saving
   npm run test-db      # Check all collections
   ```
3. **Share the server console output** - it will show exactly what's happening


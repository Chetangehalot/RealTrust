# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for your portfolio website.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account (if you don't have one)
3. Create a new organization (or use existing)

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose the **FREE** (M0) tier
3. Select your preferred cloud provider and region
4. Give your cluster a name (e.g., "PortfolioCluster")
5. Click "Create"

## Step 3: Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username and generate a secure password
5. **Save the password** - you'll need it for the connection string
6. Set user privileges to "Atlas admin" or "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note:** For production, restrict to specific IPs
4. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as the driver
5. Copy the connection string
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## Step 6: Configure Environment Variables

1. In the `backend` folder, create a `.env` file (copy from `.env.example`)
2. Replace the connection string with your actual MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/RealTrust?retryWrites=true&w=majority
PORT=5000
```

**Important:**
- Replace `your-username` with your database username
- Replace `your-password` with your database password
- Replace `cluster0.xxxxx` with your actual cluster name
- **The database name must be `RealTrust`** (case-sensitive)

## Step 7: Start the Server

1. Make sure you're in the `backend` directory
2. Run: `npm start`
3. You should see: "MongoDB Connected: ..." in the console

## Troubleshooting

### Connection Error
- Verify your username and password are correct
- Check that your IP address is whitelisted in Network Access
- Ensure the connection string includes the database name

### Authentication Failed
- Make sure you've created a database user
- Verify the username and password in the connection string

### Timeout Issues
- Check your internet connection
- Verify the cluster is running in MongoDB Atlas dashboard

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- For production, use environment variables provided by your hosting platform
- Restrict IP access to only necessary IPs in production


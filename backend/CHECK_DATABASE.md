# How to Verify Data is Being Saved

## Step 1: Check Your .env File

Make sure your `.env` file in the `backend` folder has the correct database name:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/RealTrust?retryWrites=true&w=majority
```

**Important:** The database name must be `RealTrust` (case-sensitive) in the connection string.

## Step 2: Restart Your Server

After updating the `.env` file, restart your backend server:

```powershell
cd backend
npm start
```

You should see:
```
MongoDB Connected: ...
Database Name: RealTrust
```

## Step 3: Check Server Logs

When you add data (subscription, project, client, contact), you should see logs like:

- For subscriptions: `📧 Subscription request received: email@example.com`
- For projects: `📁 Creating project: Project Name`
- For clients: `👥 Creating client: Client Name`
- For contacts: `📧 Contact form submission received: ...`

If you see `✅ Saved successfully`, the data is being saved to the database.

## Step 4: Verify in MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click on your cluster
3. Click "Browse Collections"
4. Make sure you're viewing the **RealTrust** database
5. Check the collections:
   - `subscriptions`
   - `projects`
   - `clients`
   - `contacts`

## Step 5: Test Database Connection

Run the test script to see current data:

```powershell
cd backend
npm run test-db
```

## Troubleshooting

### Data not saving?

1. **Check server console** - Look for error messages
2. **Verify database name** - Must be exactly `RealTrust` in connection string
3. **Check MongoDB connection** - Server should show "MongoDB Connected"
4. **Verify .env file** - Make sure MONGODB_URI is correct
5. **Check network access** - Your IP must be whitelisted in MongoDB Atlas

### Subscription shows in admin panel but not in database?

- The admin panel might be showing cached data
- Check the server logs when adding subscription
- Verify the API response includes the saved subscription ID
- Refresh the admin panel after adding data

### Database name is different?

If you see a different database name when running `npm run test-db`, update your `.env` file connection string to include `/RealTrust` before the `?` in the connection string.


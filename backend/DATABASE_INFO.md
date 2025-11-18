# Database Collections Information

## Collections Created

Your MongoDB Atlas database now has the following collections:

### 1. **projects**
Stores all project information.
- `name` (String, required) - Project name
- `description` (String, required) - Project description
- `image` (String, optional) - Path to project image
- `createdAt` (Date, auto) - Creation timestamp
- `updatedAt` (Date, auto) - Last update timestamp

### 2. **clients**
Stores all client/testimonial information.
- `name` (String, required) - Client name
- `description` (String, required) - Client testimonial/description
- `designation` (String, required) - Client designation (e.g., CEO, Developer)
- `image` (String, optional) - Path to client image
- `createdAt` (Date, auto) - Creation timestamp
- `updatedAt` (Date, auto) - Last update timestamp

### 3. **contacts**
Stores all contact form submissions.
- `fullName` (String, required) - Full name of the submitter
- `email` (String, required) - Email address
- `mobileNumber` (String, required) - Mobile number
- `city` (String, required) - City name
- `createdAt` (Date, auto) - Submission timestamp
- `updatedAt` (Date, auto) - Last update timestamp

### 4. **subscriptions**
Stores all newsletter subscription emails.
- `email` (String, required, unique) - Subscriber email (lowercase, trimmed)
- `createdAt` (Date, auto) - Subscription timestamp
- `updatedAt` (Date, auto) - Last update timestamp

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project (with image upload)
- `DELETE /api/projects/:id` - Delete a project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create a new client (with image upload)
- `DELETE /api/clients/:id` - Delete a client

### Contact Forms
- `GET /api/contact` - Get all contact form submissions
- `POST /api/contact` - Submit a new contact form

### Subscriptions
- `GET /api/subscribe` - Get all subscriptions
- `POST /api/subscribe` - Subscribe to newsletter

### Database Status
- `GET /api/database/status` - Get database connection status and collection counts

## Testing Database Connection

Run the test script to verify your database connection:

```powershell
cd backend
npm run test-db
```

Or directly:
```powershell
node test-db.js
```

## Viewing Data in MongoDB Atlas

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Go to your cluster
3. Click "Browse Collections"
4. Select your database
5. View all collections and their documents

## Notes

- Images are stored in the `uploads/` folder on the server
- Image paths are stored in the database (e.g., `/uploads/image-123.jpg`)
- All data is automatically timestamped with `createdAt` and `updatedAt`
- Email addresses in subscriptions are stored in lowercase and trimmed
- Duplicate email subscriptions are prevented


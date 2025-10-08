# MongoDB Atlas Connection Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign In"
3. Create an account or sign in with Google/GitHub

## Step 2: Create a Cluster
1. After logging in, click "Build a Database"
2. Choose the FREE tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Click "Create Cluster"

## Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose authentication method: Username and Password
4. Create a username (e.g., `pankajnarwade258_db_user`)
5. Create a strong password (or auto-generate)
6. Set user privileges to "Read and write to any database"
7. Click "Add User"

## Step 4: Whitelist IP Address
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Options:
   - Add your current IP address
   - Allow access from anywhere: `0.0.0.0/0` (for development only)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Driver: Node.js
5. Select Version: 4.1 or later
6. Copy the connection string

Example connection string:
```
mongodb+srv://pankajnarwade258_db_user:<password>@videos.8wr8puk.mongodb.net/?retryWrites=true&w=majority
```

## Step 6: Configure Your Application

1. Create a `.env` file in your project root:
```bash
MONGODB_URI=mongodb+srv://username:<password>@cluster.mongodb.net/elearning?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

2. Replace the following in the connection string:
   - `username` - Your database username
   - `<password>` - Your actual password
   - `cluster` - Your cluster name
   - `elearning` - Your database name

## Step 7: Test Connection

Run the following commands:

```bash
# Install dependencies
npm install

# Seed the database with sample videos
node backend/seedDatabase.js -i

# Start the server
npm start
```

## Connection String Format Explained

```
mongodb+srv://[username]:[password]@[cluster-url]/[database]?[options]
```

- **username**: Your database user
- **password**: Your user's password (URL encoded if contains special characters)
- **cluster-url**: Your cluster hostname
- **database**: Database name (e.g., elearning)
- **options**: Connection options like retryWrites=true

## Common Issues and Solutions

### Issue 1: Authentication Failed
- Verify username and password are correct
- Ensure password is URL encoded if it contains special characters
- Check that user has correct privileges

### Issue 2: Connection Timeout
- Verify IP address is whitelisted
- Check your internet connection
- Try allowing access from anywhere: 0.0.0.0/0

### Issue 3: Database Not Found
- Database will be created automatically when you insert first document
- Ensure database name is specified in connection string

## Security Best Practices

1. **Never commit `.env` file to version control**
   - Add `.env` to `.gitignore`

2. **Use strong passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, and symbols

3. **Restrict IP access**
   - Use specific IP addresses in production
   - Avoid 0.0.0.0/0 in production

4. **Use environment variables**
   - Never hardcode credentials
   - Use different credentials for dev/prod

## Database Schema

The application uses the following collection:

### videos Collection
```javascript
{
  _id: ObjectId,
  title: String,
  url: String,
  description: String,
  category: String,
  duration: String,
  instructor: String,
  views: Number,
  likes: Number,
  createdAt: Date,
  updatedAt: Date,
  __v: Number
}
```

## Monitoring Your Database

1. Go to MongoDB Atlas Dashboard
2. Click on your cluster
3. View metrics:
   - Database size
   - Number of documents
   - Network I/O
   - Connections

## Backup and Recovery

MongoDB Atlas automatically backs up your data:
- Continuous backups for M10+ clusters
- Snapshot backups for all clusters
- Point-in-time recovery available

## Useful MongoDB Queries

Connect using MongoDB Shell:
```bash
mongosh "mongodb+srv://videos.8wr8puk.mongodb.net/elearning" --apiVersion 1 --username pankajnarwade258_db_user
```

Common queries:
```javascript
// Count all videos
db.videos.countDocuments()

// Find videos by category
db.videos.find({ category: "Python" })

// Get all categories
db.videos.distinct("category")

// Find most viewed videos
db.videos.find().sort({ views: -1 }).limit(5)

// Update video views
db.videos.updateOne(
  { _id: ObjectId("...") },
  { $inc: { views: 1 } }
)
```

## Support Resources

- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB University: https://university.mongodb.com/
- Community Forums: https://www.mongodb.com/community/forums/
- Stack Overflow: https://stackoverflow.com/questions/tagged/mongodb

---

**Note**: This guide is based on the connection details visible in your screenshot. Make sure to use your actual credentials when setting up the connection.

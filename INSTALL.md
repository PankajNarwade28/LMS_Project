# 🚀 INSTALLATION INSTRUCTIONS

## Prerequisites Check

Before you begin, ensure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ npm (comes with Node.js)
- ✅ MongoDB Atlas account (free tier is fine)
- ✅ Internet connection
- ✅ Web browser (Chrome, Firefox, Edge, Safari)
- ✅ Text editor (VS Code recommended)

## Step-by-Step Installation

### Step 1: Navigate to Project Directory

Open PowerShell or Command Prompt:

```powershell
cd c:\MCA\SYMCA\LPIII\LMS_Project
```

### Step 2: Install Node.js Dependencies

```powershell
npm install
```

**Expected Output**:
```
added 150 packages in 30s
```

**What this installs**:
- Express.js (web framework)
- Mongoose (MongoDB driver)
- CORS (cross-origin support)
- dotenv (environment variables)
- body-parser (request parsing)

### Step 3: Configure MongoDB Connection

#### 3.1 Create .env file

```powershell
copy .env.example .env
```

#### 3.2 Edit .env file

Open `.env` in any text editor and update:

```env
MONGODB_URI=mongodb+srv://pankajnarwade258_db_user:YOUR_PASSWORD_HERE@videos.8wr8puk.mongodb.net/elearning?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

**Replace**:
- `YOUR_PASSWORD_HERE` with your actual MongoDB password

#### 3.3 Verify Connection String Format

Your connection string should look like:
```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?options
```

**Example**:
```
mongodb+srv://pankajnarwade258_db_user:MyP@ssw0rd123@videos.8wr8puk.mongodb.net/elearning?retryWrites=true&w=majority
```

### Step 4: Set Up MongoDB Atlas

If you haven't already:

1. **Go to**: https://cloud.mongodb.com/
2. **Sign in** with your credentials
3. **Verify**:
   - Cluster is created
   - Database user exists
   - IP address is whitelisted (0.0.0.0/0 for development)

**See**: `MONGODB_SETUP.md` for detailed instructions

### Step 5: Seed the Database

Import sample video data:

```powershell
node backend/seedDatabase.js -i
```

**Expected Output**:
```
🗑️  Existing videos deleted
✅ Sample videos imported successfully
📊 Total videos imported: 10
```

**Alternative command**:
```powershell
npm run seed
```

### Step 6: Start the Server

```powershell
npm start
```

**Expected Output**:
```
==================================================
🚀 Server is running on port 3000
📱 Local: http://localhost:3000
🌐 API: http://localhost:3000/api
📚 Frontend: http://localhost:3000
==================================================
✅ MongoDB Connected Successfully!
📍 Host: videos-shard-00-01.8wr8puk.mongodb.net
📊 Database: elearning
🔗 Connection State: Connected
🟢 Mongoose connected to MongoDB Atlas
```

### Step 7: Test the Application

#### 7.1 Open in Browser

Navigate to: **http://localhost:3000**

You should see:
- ✅ EduLearn homepage
- ✅ Statistics showing 10 videos
- ✅ Category filters
- ✅ Video grid with 10 courses

#### 7.2 Test API Endpoints

Open new PowerShell window:

```powershell
# Test API health
curl http://localhost:3000/api

# Get all videos
curl http://localhost:3000/api/videos

# Get categories
curl http://localhost:3000/api/videos/categories/all

# Search videos
curl http://localhost:3000/api/videos/search?q=python
```

### Step 8: Verify Everything Works

✅ **Checklist**:
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Frontend loads in browser
- [ ] Statistics show correct numbers
- [ ] Videos display in grid
- [ ] Category filters work
- [ ] Search functionality works
- [ ] Clicking video shows details
- [ ] Like button increments count

## Common Issues and Solutions

### Issue 1: "npm is not recognized"

**Solution**: Install Node.js from https://nodejs.org/

### Issue 2: "ECONNREFUSED" or MongoDB connection error

**Possible causes**:
- ❌ Wrong password in .env
- ❌ IP not whitelisted
- ❌ Internet connection issue
- ❌ Cluster suspended

**Solutions**:
1. Check password is correct
2. Verify IP whitelist includes 0.0.0.0/0
3. Check internet connection
4. Login to MongoDB Atlas and verify cluster is running

### Issue 3: "Port 3000 is already in use"

**Solution**: Change port in .env:
```env
PORT=3001
```

Or kill the process using port 3000:
```powershell
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Issue 4: Videos not loading

**Solutions**:
1. Verify database was seeded:
   ```powershell
   node backend/seedDatabase.js -i
   ```

2. Check MongoDB Atlas:
   - Go to Browse Collections
   - Verify `elearning` database exists
   - Verify `videos` collection has 10 documents

3. Check browser console for errors (F12)

### Issue 5: "Cannot find module"

**Solution**: Reinstall dependencies:
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

## Development Mode

For auto-restart on file changes:

```powershell
npm run dev
```

This requires nodemon (already in package.json):
```powershell
npm install -g nodemon
```

## Stopping the Server

Press `Ctrl + C` in the terminal where server is running

## Project URLs

| Resource | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| API Root | http://localhost:3000/api |
| All Videos | http://localhost:3000/api/videos |
| Search | http://localhost:3000/api/videos/search?q=query |
| Categories | http://localhost:3000/api/videos/categories/all |

## Database Management

### View Data in MongoDB Atlas

1. Go to https://cloud.mongodb.com/
2. Click "Browse Collections"
3. Select `elearning` database
4. View `videos` collection

### Reseed Database

To clear and reload sample data:

```powershell
# Delete all videos
node backend/seedDatabase.js -d

# Import fresh data
node backend/seedDatabase.js -i
```

### Add More Videos

Edit `backend/data/sampleVideos.json` and add new entries, then:

```powershell
node backend/seedDatabase.js -i
```

## Next Steps

Once everything is working:

1. ✅ Explore the frontend
2. ✅ Test all API endpoints
3. ✅ Try searching and filtering
4. ✅ View video details
5. ✅ Like some videos
6. ✅ Check MongoDB Atlas to see data changes

## Getting Help

If you encounter issues:

1. **Check logs**: Server terminal shows detailed errors
2. **Browser console**: Press F12 to see frontend errors
3. **MongoDB Atlas**: Check cluster status and logs
4. **Documentation**: Read MONGODB_SETUP.md and QUICKSTART.md
5. **Test API**: Use curl or Postman to test endpoints

## File Locations Reference

```
LMS_Project/
├── .env                    ← Configure this
├── package.json            ← Dependencies
├── backend/
│   ├── server.js          ← Start point
│   ├── config/db.js       ← Connection
│   └── data/              ← Sample data
└── frontend/
    └── index.html         ← Open in browser
```

## Success Indicators

You'll know it's working when:

✅ Server logs show "MongoDB Connected Successfully"
✅ Browser shows EduLearn homepage
✅ Statistics show "10 Video Courses"
✅ Video cards display with titles and descriptions
✅ Clicking a video shows detailed modal
✅ Search finds relevant videos
✅ Category filters work correctly

## Environment Variables Explained

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://user:pass@host/db?options

# Server port (default: 3000)
PORT=3000

# Environment (development or production)
NODE_ENV=development
```

**Important**: Never commit `.env` file to Git (it's in .gitignore)

## Quick Commands Reference

```powershell
# Install dependencies
npm install

# Seed database
npm run seed

# Start server
npm start

# Development mode (auto-restart)
npm run dev

# Stop server
Ctrl + C
```

---

## 🎉 Congratulations!

If you've made it here, your Learning Management System should be up and running!

**Access it at**: http://localhost:3000

Enjoy exploring the video courses! 📚🎓

# Learning Management System - Complete File Structure

## Directory Tree

```
LMS_Project/
│
├── README.md                      # Main project documentation
├── QUICKSTART.md                  # Quick setup guide
├── MONGODB_SETUP.md               # Detailed MongoDB Atlas setup
├── DATABASE_SCHEMA.md             # Database structure documentation
├── package.json                   # Node.js dependencies and scripts
├── .gitignore                     # Git ignore rules
├── .env.example                   # Environment variables template
├── .env                           # Environment variables (create this)
│
├── images/                        # Images and screenshots
│   ├── README.md                  # Connection image documentation
│   └── mongodb-connection.png     # (Place your screenshot here)
│
├── backend/                       # Backend server code
│   ├── server.js                  # Main server entry point
│   ├── seedDatabase.js            # Database seeding script
│   │
│   ├── config/                    # Configuration files
│   │   └── db.js                  # MongoDB connection setup
│   │
│   ├── models/                    # Mongoose schemas
│   │   └── Video.js               # Video model definition
│   │
│   ├── controllers/               # Business logic
│   │   └── videoController.js     # Video CRUD operations
│   │
│   ├── routes/                    # API routes
│   │   └── videoRoutes.js         # Video endpoints
│   │
│   └── data/                      # Sample data
│       └── sampleVideos.json      # Initial video data
│
└── frontend/                      # Frontend web application
    ├── index.html                 # Main HTML page
    │
    ├── css/                       # Stylesheets
    │   └── style.css              # Main styles
    │
    └── js/                        # JavaScript files
        └── app.js                 # Frontend logic
```

## File Descriptions

### Root Level Files

#### README.md
- Main project documentation
- Features overview
- Setup instructions
- API endpoints reference
- Technology stack

#### QUICKSTART.md
- Step-by-step setup guide
- Installation commands
- Project structure explanation
- API examples
- Troubleshooting tips

#### MONGODB_SETUP.md
- MongoDB Atlas account creation
- Cluster setup
- User creation
- Network configuration
- Connection string format
- Security best practices

#### DATABASE_SCHEMA.md
- Collection structure
- Field definitions
- Indexes
- Sample documents
- Query examples
- Performance tips

#### package.json
```json
{
  "name": "learning-management-system",
  "version": "1.0.0",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js",
    "seed": "node backend/seedDatabase.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2"
  }
}
```

#### .gitignore
- node_modules/
- .env
- *.log
- .DS_Store
- .vscode/

#### .env.example
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3000
NODE_ENV=development
```

### Backend Files

#### backend/server.js (276 lines)
**Purpose**: Main Express.js application
- Server initialization
- Middleware setup
- Route mounting
- Error handling
- Server startup

**Key Components**:
```javascript
const express = require('express');
const connectDB = require('./config/db');
const videoRoutes = require('./routes/videoRoutes');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Routes
app.use('/api/videos', videoRoutes);

// Start server
app.listen(PORT);
```

#### backend/config/db.js (44 lines)
**Purpose**: MongoDB connection management
- Connect to MongoDB Atlas
- Connection event handlers
- Error handling
- Graceful shutdown

**Exports**: `connectDB()` function

#### backend/models/Video.js (70 lines)
**Purpose**: Mongoose schema definition
- Field validation
- Data types
- Default values
- Indexes
- Virtual properties

**Schema Fields**:
- title (String, required)
- url (String, required, validated)
- description (String, required)
- category (String, enum)
- duration (String)
- instructor (String)
- views (Number)
- likes (Number)
- createdAt (Date)

#### backend/controllers/videoController.js (221 lines)
**Purpose**: Business logic for video operations

**Functions**:
- `getAllVideos()` - Fetch all videos
- `getVideoById()` - Get single video
- `getVideosByCategory()` - Filter by category
- `searchVideos()` - Search functionality
- `createVideo()` - Add new video
- `updateVideo()` - Modify video
- `deleteVideo()` - Remove video
- `getAllCategories()` - Get distinct categories
- `likeVideo()` - Increment likes

#### backend/routes/videoRoutes.js (35 lines)
**Purpose**: API endpoint definitions

**Routes**:
```
GET    /api/videos
GET    /api/videos/:id
GET    /api/videos/category/:category
GET    /api/videos/search?q=query
GET    /api/videos/categories/all
POST   /api/videos
PUT    /api/videos/:id
DELETE /api/videos/:id
POST   /api/videos/:id/like
```

#### backend/data/sampleVideos.json (122 lines)
**Purpose**: Initial data for seeding

**Contains**: 10 sample videos with:
- Python tutorials
- JavaScript courses
- React tutorials
- Web development
- C programming
- Node.js
- Machine Learning
- MongoDB
- Data Science

#### backend/seedDatabase.js (47 lines)
**Purpose**: Database seeding utility

**Commands**:
```bash
node seedDatabase.js -i  # Import data
node seedDatabase.js -d  # Delete data
```

### Frontend Files

#### frontend/index.html (117 lines)
**Purpose**: Main web interface

**Sections**:
1. Header with navigation
2. Hero section with search
3. Statistics cards
4. Category filters
5. Video grid
6. Video details modal
7. Footer

**External Libraries**:
- Font Awesome 6.4.0 (icons)

#### frontend/css/style.css (645 lines)
**Purpose**: Complete styling

**Sections**:
- Reset and base styles
- Header and navigation
- Hero section
- Statistics cards
- Category filters
- Video cards
- Modal styles
- Footer
- Responsive design

**CSS Variables**:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --dark-bg: #0f172a;
  --light-bg: #f8fafc;
}
```

#### frontend/js/app.js (314 lines)
**Purpose**: Frontend application logic

**Features**:
- API communication
- Dynamic content rendering
- Search functionality
- Category filtering
- Sorting options
- Modal management
- Event handling

**Key Functions**:
```javascript
loadVideos()              // Fetch all videos
loadCategories()          // Load category filters
filterByCategory()        // Filter videos
handleSearch()            // Search videos
handleSort()              // Sort videos
showVideoDetails()        // Display modal
likeVideo()              // Like functionality
```

### Images Directory

#### images/README.md
- Documentation for the MongoDB connection screenshot
- Explanation of connection string components
- Usage instructions
- Security notes

#### images/mongodb-connection.png (you need to add this)
- Screenshot from MongoDB Atlas
- Shows connection setup interface
- Your actual connection details

## File Statistics

### Code Files
- **Total Files**: 15
- **Backend Files**: 7
- **Frontend Files**: 3
- **Documentation Files**: 5

### Lines of Code (Approximate)
- **Backend JavaScript**: ~650 lines
- **Frontend JavaScript**: ~320 lines
- **HTML**: ~120 lines
- **CSS**: ~650 lines
- **JSON**: ~150 lines
- **Documentation**: ~1,500 lines
- **Total**: ~3,390 lines

### File Sizes (Approximate)
- **Backend**: ~25 KB
- **Frontend**: ~30 KB
- **Documentation**: ~50 KB
- **Total**: ~105 KB (without node_modules)

## Dependencies

### Production Dependencies (5)
1. **express**: ^4.18.2 (Web framework)
2. **mongoose**: ^7.5.0 (MongoDB ODM)
3. **dotenv**: ^16.3.1 (Environment variables)
4. **cors**: ^2.8.5 (CORS middleware)
5. **body-parser**: ^1.20.2 (Request body parsing)

### Development Dependencies (1)
1. **nodemon**: ^3.0.1 (Auto-restart server)

### Frontend Dependencies (CDN)
1. **Font Awesome**: 6.4.0 (Icons)

## How Files Interact

```
User Browser
    ↓
index.html (loads)
    ↓
style.css (styling) + app.js (logic)
    ↓
Fetch API requests to localhost:3000/api
    ↓
server.js (receives request)
    ↓
videoRoutes.js (routes to controller)
    ↓
videoController.js (business logic)
    ↓
Video.js (Mongoose model)
    ↓
db.js (connection)
    ↓
MongoDB Atlas (database)
    ↓
Response back to browser
    ↓
app.js updates UI
```

## Setup Checklist

- [ ] Clone/download project
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Update MongoDB connection string
- [ ] Add your MongoDB password
- [ ] Save screenshot to `images/mongodb-connection.png`
- [ ] Run `npm run seed` to populate database
- [ ] Run `npm start` to start server
- [ ] Open http://localhost:3000 in browser
- [ ] Test API endpoints
- [ ] Verify data loads correctly

## Maintenance Files

Files you may need to update:
- `.env` - When credentials change
- `sampleVideos.json` - To add more sample data
- `package.json` - To update dependencies
- `README.md` - To document new features

Files you should never edit directly in production:
- `node_modules/` - Managed by npm
- `.git/` - Managed by Git

---

**Note**: This project is fully functional and ready to use. Just follow the QUICKSTART.md guide to set it up!

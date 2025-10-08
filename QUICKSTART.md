# Quick Start Guide - Learning Management System

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd c:\MCA\SYMCA\LPIII\LMS_Project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

Edit `.env` file with your MongoDB connection details:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/elearning?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

### 4. Seed Database with Sample Videos
```bash
node backend/seedDatabase.js -i
```

or use npm script:
```bash
npm run seed
```

### 5. Start the Server
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### 6. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **All Videos**: http://localhost:3000/api/videos

## Project Structure Explained

```
LMS_Project/
│
├── backend/                      # Backend server code
│   ├── config/
│   │   └── db.js                # MongoDB connection configuration
│   │
│   ├── models/
│   │   └── Video.js             # Mongoose schema for videos
│   │
│   ├── controllers/
│   │   └── videoController.js   # Business logic for video operations
│   │
│   ├── routes/
│   │   └── videoRoutes.js       # API route definitions
│   │
│   ├── data/
│   │   └── sampleVideos.json    # Sample video data for seeding
│   │
│   ├── seedDatabase.js          # Script to populate database
│   └── server.js                # Main server entry point
│
├── frontend/                     # Frontend web interface
│   ├── index.html               # Main HTML page
│   ├── css/
│   │   └── style.css            # Styling
│   └── js/
│       └── app.js               # Frontend JavaScript
│
├── .env                         # Environment variables (create this)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
└── MONGODB_SETUP.md            # MongoDB setup guide
```

## API Endpoints

### Videos

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/videos` | Get all videos |
| GET | `/api/videos/:id` | Get single video by ID |
| GET | `/api/videos/category/:category` | Get videos by category |
| GET | `/api/videos/search?q=query` | Search videos |
| POST | `/api/videos` | Create new video |
| PUT | `/api/videos/:id` | Update video |
| DELETE | `/api/videos/:id` | Delete video |
| POST | `/api/videos/:id/like` | Like a video |
| GET | `/api/videos/categories/all` | Get all categories |

### Example API Requests

**Get all videos:**
```bash
curl http://localhost:3000/api/videos
```

**Search videos:**
```bash
curl http://localhost:3000/api/videos/search?q=python
```

**Get videos by category:**
```bash
curl http://localhost:3000/api/videos/category/Python
```

**Create new video:**
```bash
curl -X POST http://localhost:3000/api/videos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced Python Programming",
    "url": "https://youtu.be/example",
    "description": "Deep dive into Python",
    "category": "Python",
    "duration": "5:30:00"
  }'
```

## Database Management

### Seed Database
```bash
node backend/seedDatabase.js -i
# or
node backend/seedDatabase.js --import
```

### Clear Database
```bash
node backend/seedDatabase.js -d
# or
node backend/seedDatabase.js --delete
```

## Features

### 1. Browse Videos
- View all available video courses
- Filter by category
- Sort by newest, oldest, title, or views
- Responsive grid layout

### 2. Search Functionality
- Search videos by title, description, or category
- Real-time search results
- Highlighted search terms

### 3. Category Filtering
- Dynamic category buttons
- Filter courses by technology/topic
- Multiple categories supported

### 4. Video Details
- Click any video card to view details
- See description, duration, instructor
- Track views and likes
- Direct YouTube link

### 5. Statistics Dashboard
- Total video count
- Category count
- User engagement metrics

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern features
- **JavaScript (ES6+)** - Interactivity
- **Font Awesome** - Icons
- **Fetch API** - HTTP requests

## Development Tips

### Hot Reload (Development Mode)
```bash
npm install -g nodemon
npm run dev
```

### View Database in MongoDB Compass
1. Download MongoDB Compass
2. Connect using your connection string
3. Browse collections and documents

### Debug Mode
Add to `.env`:
```
NODE_ENV=development
DEBUG=true
```

## Troubleshooting

### Port Already in Use
Change port in `.env`:
```
PORT=3001
```

### MongoDB Connection Error
- Check connection string in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure password is URL encoded

### Videos Not Loading
- Check if database is seeded
- Verify API is running
- Check browser console for errors

## Adding More Videos

### Method 1: Through API
Use POST request to `/api/videos`

### Method 2: Direct Database
Add to `backend/data/sampleVideos.json` and re-seed

### Method 3: MongoDB Atlas UI
1. Go to Collections
2. Click "Insert Document"
3. Add video data

## Deployment Considerations

### Environment Variables
Set these in production:
- `MONGODB_URI` - Production database
- `NODE_ENV=production`
- `PORT` - Server port

### Security
- Enable authentication
- Use HTTPS
- Implement rate limiting
- Add input validation
- Set up CORS properly

### Hosting Options
- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas (already cloud-hosted)

## Next Steps

1. Add user authentication
2. Implement video playlists
3. Add comments and ratings
4. Create admin dashboard
5. Add video upload functionality
6. Implement progress tracking
7. Add certificates

## Support

For issues or questions:
1. Check the documentation
2. Review MongoDB Atlas setup guide
3. Check API endpoint responses
4. Verify environment variables

---

**Happy Learning! 🎓**

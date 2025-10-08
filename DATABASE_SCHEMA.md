# Database Tables and Schema Documentation

## Collection: videos

This is the main collection that stores all video course information in MongoDB Atlas.

### Table Structure

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| _id | ObjectId | Yes | Auto | Unique identifier (MongoDB generated) |
| title | String | Yes | - | Video course title (max 200 chars) |
| url | String | Yes | - | YouTube video URL |
| description | String | Yes | - | Detailed course description (max 1000 chars) |
| category | String | Yes | - | Course category (enum) |
| duration | String | No | 'N/A' | Video duration (e.g., "4:26:52") |
| instructor | String | No | 'N/A' | Instructor/channel name |
| thumbnail | String | No | '' | Thumbnail image URL |
| views | Number | No | 0 | Number of times video was viewed |
| likes | Number | No | 0 | Number of likes |
| createdAt | Date | Yes | Date.now() | Record creation timestamp |
| updatedAt | Date | Yes | Date.now() | Last update timestamp |
| __v | Number | Yes | 0 | Version key (Mongoose) |

### Category Enum Values

The `category` field accepts only the following values:
- Python
- JavaScript
- React
- Web Development
- C Programming
- Data Science
- Machine Learning
- Node.js
- Database
- Other

### Indexes

For optimal query performance, the following indexes are created:

1. **Category Index**: `{ category: 1 }`
   - Speeds up filtering by category

2. **Text Search Index**: `{ title: 'text', description: 'text' }`
   - Enables full-text search on title and description

### Sample Document

```json
{
  "_id": {
    "$oid": "68e51e0081aac8cd19d2b3b5"
  },
  "title": "Complete Python Tutorial for Beginners",
  "url": "https://youtu.be/yRpLlJmRo2w?si=BSsvH-SNIL9n1TAE",
  "description": "Learn Python programming from basics to advanced concepts with practical examples",
  "category": "Python",
  "duration": "4:26:52",
  "instructor": "Programming with Mosh",
  "thumbnail": "",
  "views": 125,
  "likes": 45,
  "createdAt": {
    "$date": "2025-10-07T14:04:48.771Z"
  },
  "updatedAt": {
    "$date": "2025-10-08T10:30:15.234Z"
  },
  "__v": 0
}
```

## Database Statistics

### Current Data (Sample)
- **Total Videos**: 10
- **Categories**: 8
- **Average Duration**: 8 hours
- **Total Views**: 0 (initial)
- **Total Likes**: 0 (initial)

### Storage Information
- **Database Name**: elearning
- **Collection Name**: videos
- **Estimated Size**: ~5KB (with sample data)
- **Index Size**: ~1KB

## Relationships and References

Currently, the schema is flat (no relationships). Future enhancements could include:

### Potential Related Collections

1. **users**
   - _id
   - username
   - email
   - enrolledCourses (references videos)
   - watchHistory (references videos)

2. **comments**
   - _id
   - videoId (references videos._id)
   - userId (references users._id)
   - text
   - createdAt

3. **playlists**
   - _id
   - name
   - description
   - videoIds (array of video references)
   - userId (references users._id)

4. **progress**
   - _id
   - userId (references users._id)
   - videoId (references videos._id)
   - percentComplete
   - lastWatched

## Validation Rules

### URL Validation
- Must be a valid YouTube URL
- Regex pattern: `/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/`

### Title Validation
- Required field
- Maximum 200 characters
- Trimmed (whitespace removed)

### Description Validation
- Required field
- Maximum 1000 characters
- Trimmed (whitespace removed)

### Category Validation
- Must be one of the enum values
- Case-sensitive

## Query Examples

### Find All Videos
```javascript
db.videos.find()
```

### Find by Category
```javascript
db.videos.find({ category: "Python" })
```

### Search by Title (Text Search)
```javascript
db.videos.find(
  { $text: { $search: "javascript tutorial" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

### Get Most Viewed Videos
```javascript
db.videos.find().sort({ views: -1 }).limit(10)
```

### Count Videos per Category
```javascript
db.videos.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

### Update Views Count
```javascript
db.videos.updateOne(
  { _id: ObjectId("68e51e0081aac8cd19d2b3b5") },
  { $inc: { views: 1 } }
)
```

### Add New Video
```javascript
db.videos.insertOne({
  title: "Node.js Complete Course",
  url: "https://youtu.be/example",
  description: "Learn Node.js from scratch",
  category: "Node.js",
  duration: "8:00:00",
  instructor: "Traversy Media",
  createdAt: new Date()
})
```

## MongoDB Atlas Connection Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Atlas Cloud                       │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Cluster: videos.8wr8puk.mongodb.net              │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │  Database: elearning                     │     │    │
│  │  │                                           │     │    │
│  │  │  ┌────────────────────────────────┐      │     │    │
│  │  │  │  Collection: videos            │      │     │    │
│  │  │  │                                 │      │     │    │
│  │  │  │  Documents:                     │      │     │    │
│  │  │  │  - Python Tutorial              │      │     │    │
│  │  │  │  - JavaScript Course            │      │     │    │
│  │  │  │  - React Tutorial               │      │     │    │
│  │  │  │  - Web Development              │      │     │    │
│  │  │  │  - ... and more                 │      │     │    │
│  │  │  └────────────────────────────────┘      │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                          ▲
                          │
                          │ mongoose connection
                          │
┌─────────────────────────┴─────────────────────────┐
│         Node.js Application (Backend)              │
│                                                    │
│  Connection String:                                │
│  mongodb+srv://user:pass@videos.8wr8puk           │
│  .mongodb.net/elearning                           │
│                                                    │
│  ┌──────────────────────────────────────────┐    │
│  │  Express.js Server (Port 3000)           │    │
│  │                                           │    │
│  │  Routes:                                  │    │
│  │  - GET  /api/videos                      │    │
│  │  - GET  /api/videos/:id                  │    │
│  │  - GET  /api/videos/category/:category   │    │
│  │  - GET  /api/videos/search?q=query       │    │
│  │  - POST /api/videos                      │    │
│  │  - PUT  /api/videos/:id                  │    │
│  │  - DELETE /api/videos/:id                │    │
│  │  - POST /api/videos/:id/like             │    │
│  └──────────────────────────────────────────┘    │
└────────────────────────────────────────────────────┘
                          ▲
                          │
                          │ HTTP/Fetch API
                          │
┌─────────────────────────┴─────────────────────────┐
│         Frontend (HTML/CSS/JavaScript)             │
│                                                    │
│  ┌──────────────────────────────────────────┐    │
│  │  User Interface Components                │    │
│  │  - Video Grid                             │    │
│  │  - Category Filters                       │    │
│  │  - Search Bar                             │    │
│  │  - Video Details Modal                    │    │
│  │  - Statistics Dashboard                   │    │
│  └──────────────────────────────────────────┘    │
└────────────────────────────────────────────────────┘
```

## Performance Considerations

### Indexing Strategy
1. **Category Index**: Fast category filtering
2. **Text Index**: Efficient full-text search
3. **Compound Index (future)**: For complex queries

### Query Optimization
- Use projections to return only needed fields
- Limit result sets with `.limit()`
- Use pagination for large datasets
- Cache frequently accessed data

### Best Practices
1. Always use indexes for filtered queries
2. Avoid full collection scans
3. Use aggregation pipeline for complex operations
4. Monitor slow queries in Atlas
5. Set up appropriate read/write concerns

## Backup and Recovery

MongoDB Atlas provides:
- **Continuous Backup**: Incremental backups every 6 hours
- **Snapshot Backup**: Point-in-time recovery
- **Automated Restore**: One-click recovery
- **Download Backups**: Export data as needed

## Monitoring

Track these metrics in MongoDB Atlas:
1. **Operations**: Reads, writes per second
2. **Memory Usage**: RAM utilization
3. **Network**: Data transfer
4. **Connections**: Active connections count
5. **Query Performance**: Slow query log

---

For the complete MongoDB Atlas connection setup, see the screenshot in `images/mongodb-connection.png` and refer to `MONGODB_SETUP.md`.

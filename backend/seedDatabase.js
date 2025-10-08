const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const Video = require('./models/Video');

// Read sample videos
const videos = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'sampleVideos.json'), 'utf-8')
);

// Import data into database
const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Video.deleteMany();
    console.log('🗑️  Existing videos deleted');
    
    // Insert sample videos
    await Video.insertMany(videos);
    console.log('✅ Sample videos imported successfully');
    console.log(`📊 Total videos imported: ${videos.length}`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Delete all data from database
const deleteData = async () => {
  try {
    await connectDB();
    await Video.deleteMany();
    console.log('🗑️  All videos deleted successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-i' || process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '-d' || process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please use one of the following options:');
  console.log('  node seedDatabase.js -i  or  --import  (to import data)');
  console.log('  node seedDatabase.js -d  or  --delete  (to delete data)');
  process.exit();
}

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a video title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  url: {
    type: String,
    required: [true, 'Please provide a video URL'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(v);
      },
      message: 'Please provide a valid YouTube URL'
    }
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: [
      'Python',
      'JavaScript',
      'React',
      'Web Development',
      'C Programming',
      'Data Science',
      'Machine Learning',
      'Node.js',
      'Database',
      'Other'
    ]
  },
  duration: {
    type: String,
    default: 'N/A'
  },
  instructor: {
    type: String,
    default: 'N/A'
  },
  thumbnail: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  versionKey: '__v'
});

// Index for faster queries
videoSchema.index({ category: 1 });
videoSchema.index({ title: 'text', description: 'text' });

// Virtual for formatted date
videoSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

module.exports = mongoose.model('Video', videoSchema);

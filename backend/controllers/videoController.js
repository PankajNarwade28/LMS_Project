const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching videos',
      error: error.message
    });
  }
};

// @desc    Get single video by ID
// @route   GET /api/videos/:id
// @access  Public
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Increment views
    video.views += 1;
    await video.save();
    
    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching video',
      error: error.message
    });
  }
};

// @desc    Get videos by category
// @route   GET /api/videos/category/:category
// @access  Public
exports.getVideosByCategory = async (req, res) => {
  try {
    const videos = await Video.find({ 
      category: req.params.category 
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: videos.length,
      category: req.params.category,
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching videos by category',
      error: error.message
    });
  }
};

// @desc    Search videos
// @route   GET /api/videos/search?q=query
// @access  Public
exports.searchVideos = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    
    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const videos = await Video.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: videos.length,
      searchQuery: searchQuery,
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching videos',
      error: error.message
    });
  }
};

// @desc    Create new video
// @route   POST /api/videos
// @access  Public (should be Private/Admin in production)
exports.createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: video
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating video',
      error: error.message
    });
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Public (should be Private/Admin in production)
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating video',
      error: error.message
    });
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Public (should be Private/Admin in production)
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Video deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting video',
      error: error.message
    });
  }
};

// @desc    Get all categories
// @route   GET /api/videos/categories/all
// @access  Public
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Video.distinct('category');
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// @desc    Like a video
// @route   POST /api/videos/:id/like
// @access  Public
exports.likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    video.likes += 1;
    await video.save();
    
    res.status(200).json({
      success: true,
      message: 'Video liked',
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error liking video',
      error: error.message
    });
  }
};

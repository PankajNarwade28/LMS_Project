const express = require('express');
const router = express.Router();
const {
  getAllVideos,
  getVideoById,
  getVideosByCategory,
  searchVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  getAllCategories,
  likeVideo
} = require('../controllers/videoController');

// Get all categories
router.get('/categories/all', getAllCategories);

// Search videos
router.get('/search', searchVideos);

// Get videos by category (must be before /:id route)
router.get('/category/:category', getVideosByCategory);

// Like a video
router.post('/:id/like', likeVideo);

// CRUD operations
router.route('/')
  .get(getAllVideos)
  .post(createVideo);

router.route('/:id')
  .get(getVideoById)
  .put(updateVideo)
  .delete(deleteVideo);

module.exports = router;

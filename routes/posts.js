// Posts routes - Defines blog post endpoints
// Routes: get all posts, get single post, create, update, delete

const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');
const { validatePost, validatePostUpdate } = require('../middleware/validation');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes (require authentication)
router.post('/', protect, authorize('author', 'admin'), validatePost, createPost);
router.put('/:id', protect, validatePostUpdate, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;

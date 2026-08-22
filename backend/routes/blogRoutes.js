const express = require('express');
const { body } = require('express-validator');
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('featuredImage'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  validate,
  createBlog
);

router.put('/:id', protect, adminOnly, upload.single('featuredImage'), updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

module.exports = router;

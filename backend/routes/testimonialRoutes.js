const express = require('express');
const { body } = require('express-validator');
const {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  toggleTestimonialStatus,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  validate,
  createTestimonial
);

router.put('/:id', protect, adminOnly, upload.single('image'), updateTestimonial);
router.patch('/:id/toggle-status', protect, adminOnly, toggleTestimonialStatus);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

module.exports = router;

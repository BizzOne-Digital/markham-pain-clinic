const express = require('express');
const { body } = require('express-validator');
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { enquiryLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post(
  '/',
  enquiryLimiter,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('type').optional().isIn(['contact', 'appointment']),
  ],
  validate,
  createEnquiry
);

router.get('/', protect, adminOnly, getEnquiries);
router.get('/:id', protect, adminOnly, getEnquiryById);
router.put('/:id/status', protect, adminOnly, updateEnquiryStatus);
router.delete('/:id', protect, adminOnly, deleteEnquiry);

module.exports = router;

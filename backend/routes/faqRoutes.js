const express = require('express');
const { body } = require('express-validator');
const { getFaqs, createFaq, updateFaq, deleteFaq, reorderFaqs } = require('../controllers/faqController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getFaqs);

router.post(
  '/',
  protect,
  adminOnly,
  [
    body('question').notEmpty().withMessage('Question is required'),
    body('answer').notEmpty().withMessage('Answer is required'),
  ],
  validate,
  createFaq
);

router.put('/reorder', protect, adminOnly, reorderFaqs);
router.put('/:id', protect, adminOnly, updateFaq);
router.delete('/:id', protect, adminOnly, deleteFaq);

module.exports = router;

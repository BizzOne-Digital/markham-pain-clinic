const express = require('express');
const { body } = require('express-validator');
const {
  getStatistics,
  createStatistic,
  updateStatistic,
  deleteStatistic,
} = require('../controllers/statisticController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getStatistics);

router.post(
  '/',
  protect,
  adminOnly,
  [
    body('label').notEmpty().withMessage('Label is required'),
    body('value').isNumeric().withMessage('Value must be numeric'),
  ],
  validate,
  createStatistic
);

router.put('/:id', protect, adminOnly, updateStatistic);
router.delete('/:id', protect, adminOnly, deleteStatistic);

module.exports = router;

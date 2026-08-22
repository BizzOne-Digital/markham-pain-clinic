const express = require('express');
const { body } = require('express-validator');
const {
  getConditions,
  getConditionBySlug,
  createCondition,
  updateCondition,
  deleteCondition,
} = require('../controllers/conditionController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getConditions);
router.get('/:slug', getConditionBySlug);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [body('name').notEmpty().withMessage('Name is required')],
  validate,
  createCondition
);

router.put('/:id', protect, adminOnly, upload.single('image'), updateCondition);
router.delete('/:id', protect, adminOnly, deleteCondition);

module.exports = router;

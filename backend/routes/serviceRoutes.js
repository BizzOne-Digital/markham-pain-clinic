const express = require('express');
const { body } = require('express-validator');
const {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  reorderServices,
} = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [body('title').notEmpty().withMessage('Title is required')],
  validate,
  createService
);

router.put('/reorder', protect, adminOnly, reorderServices);
router.put('/:id', protect, adminOnly, upload.single('image'), updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;

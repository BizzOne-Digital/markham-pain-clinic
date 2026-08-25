const express = require('express');
const { body } = require('express-validator');
const {
  getSocialServices,
  getSocialServiceBySlug,
  createSocialService,
  updateSocialService,
  deleteSocialService,
} = require('../controllers/socialServiceController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getSocialServices);
router.get('/:slug', getSocialServiceBySlug);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [body('name').notEmpty().withMessage('Name is required')],
  validate,
  createSocialService
);

router.put('/:id', protect, adminOnly, upload.single('image'), updateSocialService);
router.delete('/:id', protect, adminOnly, deleteSocialService);

module.exports = router;

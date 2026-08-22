const express = require('express');
const { getHomepage, updateHomepage } = require('../controllers/homepageController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getHomepage);
router.put(
  '/',
  protect,
  adminOnly,
  upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'aboutImage', maxCount: 1 },
  ]),
  updateHomepage
);

module.exports = router;

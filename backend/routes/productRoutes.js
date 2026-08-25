const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [body('name').notEmpty().withMessage('Name is required')],
  validate,
  createProduct
);

router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;

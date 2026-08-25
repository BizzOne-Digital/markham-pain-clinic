const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/slugify');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getProducts = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'active' };
  const products = await Product.find(filter).sort({ order: 1, createdAt: -1 });
  return success(res, 200, products);
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) throw new ApiError(404, 'Product not found');
  return success(res, 200, product);
});

const createProduct = asyncHandler(async (req, res) => {
  const slug = await generateUniqueSlug(Product, req.body.slug || req.body.name);

  let image = {};
  if (req.file) {
    image = await uploadImage(req.file.buffer, 'markham-pain-clinic/products');
  }

  const product = await Product.create({ ...req.body, slug, image });
  return success(res, 201, product, 'Product created successfully');
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  if (req.body.name && req.body.name !== product.name && !req.body.slug) {
    req.body.slug = await generateUniqueSlug(Product, req.body.name, product._id);
  } else if (req.body.slug) {
    req.body.slug = await generateUniqueSlug(Product, req.body.slug, product._id);
  }

  if (req.file) {
    const newImage = await uploadImage(req.file.buffer, 'markham-pain-clinic/products');
    if (product.image?.public_id) await deleteImage(product.image.public_id);
    req.body.image = newImage;
  }

  Object.assign(product, req.body);
  await product.save();
  return success(res, 200, product, 'Product updated successfully');
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  if (product.image?.public_id) await deleteImage(product.image.public_id);
  await product.deleteOne();
  return success(res, 200, null, 'Product deleted successfully');
});

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};

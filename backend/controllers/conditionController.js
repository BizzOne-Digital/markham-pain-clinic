const Condition = require('../models/Condition');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/slugify');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getConditions = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'active' };
  const conditions = await Condition.find(filter).sort({ order: 1, createdAt: -1 });
  return success(res, 200, conditions);
});

const getConditionBySlug = asyncHandler(async (req, res) => {
  const condition = await Condition.findOne({ slug: req.params.slug });
  if (!condition) throw new ApiError(404, 'Condition not found');
  return success(res, 200, condition);
});

const createCondition = asyncHandler(async (req, res) => {
  const slug = await generateUniqueSlug(Condition, req.body.slug || req.body.name);

  let image = {};
  if (req.file) {
    image = await uploadImage(req.file.buffer, 'markham-pain-clinic/conditions');
  }

  const condition = await Condition.create({ ...req.body, slug, image });
  return success(res, 201, condition, 'Condition created successfully');
});

const updateCondition = asyncHandler(async (req, res) => {
  const condition = await Condition.findById(req.params.id);
  if (!condition) throw new ApiError(404, 'Condition not found');

  if (req.body.name && req.body.name !== condition.name && !req.body.slug) {
    req.body.slug = await generateUniqueSlug(Condition, req.body.name, condition._id);
  } else if (req.body.slug) {
    req.body.slug = await generateUniqueSlug(Condition, req.body.slug, condition._id);
  }

  if (req.file) {
    const newImage = await uploadImage(req.file.buffer, 'markham-pain-clinic/conditions');
    if (condition.image?.public_id) await deleteImage(condition.image.public_id);
    req.body.image = newImage;
  }

  Object.assign(condition, req.body);
  await condition.save();
  return success(res, 200, condition, 'Condition updated successfully');
});

const deleteCondition = asyncHandler(async (req, res) => {
  const condition = await Condition.findById(req.params.id);
  if (!condition) throw new ApiError(404, 'Condition not found');

  if (condition.image?.public_id) await deleteImage(condition.image.public_id);
  await condition.deleteOne();
  return success(res, 200, null, 'Condition deleted successfully');
});

module.exports = {
  getConditions,
  getConditionBySlug,
  createCondition,
  updateCondition,
  deleteCondition,
};

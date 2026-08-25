const SocialService = require('../models/SocialService');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/slugify');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getSocialServices = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'active' };
  const items = await SocialService.find(filter).sort({ order: 1, createdAt: -1 });
  return success(res, 200, items);
});

const getSocialServiceBySlug = asyncHandler(async (req, res) => {
  const item = await SocialService.findOne({ slug: req.params.slug });
  if (!item) throw new ApiError(404, 'Social service not found');
  return success(res, 200, item);
});

const createSocialService = asyncHandler(async (req, res) => {
  const slug = await generateUniqueSlug(SocialService, req.body.slug || req.body.name);

  let image = {};
  if (req.file) {
    image = await uploadImage(req.file.buffer, 'markham-pain-clinic/social-services');
  }

  const item = await SocialService.create({ ...req.body, slug, image });
  return success(res, 201, item, 'Social service created successfully');
});

const updateSocialService = asyncHandler(async (req, res) => {
  const item = await SocialService.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Social service not found');

  if (req.body.name && req.body.name !== item.name && !req.body.slug) {
    req.body.slug = await generateUniqueSlug(SocialService, req.body.name, item._id);
  } else if (req.body.slug) {
    req.body.slug = await generateUniqueSlug(SocialService, req.body.slug, item._id);
  }

  if (req.file) {
    const newImage = await uploadImage(req.file.buffer, 'markham-pain-clinic/social-services');
    if (item.image?.public_id) await deleteImage(item.image.public_id);
    req.body.image = newImage;
  }

  Object.assign(item, req.body);
  await item.save();
  return success(res, 200, item, 'Social service updated successfully');
});

const deleteSocialService = asyncHandler(async (req, res) => {
  const item = await SocialService.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Social service not found');

  if (item.image?.public_id) await deleteImage(item.image.public_id);
  await item.deleteOne();
  return success(res, 200, null, 'Social service deleted successfully');
});

module.exports = {
  getSocialServices,
  getSocialServiceBySlug,
  createSocialService,
  updateSocialService,
  deleteSocialService,
};

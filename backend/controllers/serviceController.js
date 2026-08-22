const Service = require('../models/Service');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/slugify');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getServices = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'active' };
  const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
  return success(res, 200, services);
});

const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) throw new ApiError(404, 'Service not found');
  return success(res, 200, service);
});

const createService = asyncHandler(async (req, res) => {
  const slug = req.body.slug
    ? await generateUniqueSlug(Service, req.body.slug)
    : await generateUniqueSlug(Service, req.body.title);

  let image = {};
  if (req.file) {
    image = await uploadImage(req.file.buffer, 'markham-pain-clinic/services');
  }

  const service = await Service.create({ ...req.body, slug, image });
  return success(res, 201, service, 'Service created successfully');
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');

  if (req.body.title && req.body.title !== service.title && !req.body.slug) {
    req.body.slug = await generateUniqueSlug(Service, req.body.title, service._id);
  } else if (req.body.slug) {
    req.body.slug = await generateUniqueSlug(Service, req.body.slug, service._id);
  }

  if (req.file) {
    const newImage = await uploadImage(req.file.buffer, 'markham-pain-clinic/services');
    if (service.image?.public_id) await deleteImage(service.image.public_id);
    req.body.image = newImage;
  }

  Object.assign(service, req.body);
  await service.save();
  return success(res, 200, service, 'Service updated successfully');
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');

  if (service.image?.public_id) await deleteImage(service.image.public_id);
  await service.deleteOne();
  return success(res, 200, null, 'Service deleted successfully');
});

const reorderServices = asyncHandler(async (req, res) => {
  const { order } = req.body; // [{ id, order }, ...]
  if (!Array.isArray(order)) throw new ApiError(400, 'order must be an array');

  await Promise.all(
    order.map((item) => Service.findByIdAndUpdate(item.id, { order: item.order }))
  );

  const services = await Service.find().sort({ order: 1 });
  return success(res, 200, services, 'Services reordered successfully');
});

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  reorderServices,
};

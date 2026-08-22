const Testimonial = require('../models/Testimonial');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getTestimonials = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'published' };
  const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
  return success(res, 200, testimonials);
});

const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Testimonial not found');
  return success(res, 200, testimonial);
});

const createTestimonial = asyncHandler(async (req, res) => {
  let image = {};
  if (req.file) {
    image = await uploadImage(req.file.buffer, 'markham-pain-clinic/testimonials');
  }
  const testimonial = await Testimonial.create({ ...req.body, image });
  return success(res, 201, testimonial, 'Testimonial created successfully');
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Testimonial not found');

  if (req.file) {
    const newImage = await uploadImage(req.file.buffer, 'markham-pain-clinic/testimonials');
    if (testimonial.image?.public_id) await deleteImage(testimonial.image.public_id);
    req.body.image = newImage;
  }

  Object.assign(testimonial, req.body);
  await testimonial.save();
  return success(res, 200, testimonial, 'Testimonial updated successfully');
});

const toggleTestimonialStatus = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Testimonial not found');

  testimonial.status = testimonial.status === 'published' ? 'unpublished' : 'published';
  await testimonial.save();
  return success(res, 200, testimonial, 'Testimonial status updated');
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Testimonial not found');

  if (testimonial.image?.public_id) await deleteImage(testimonial.image.public_id);
  await testimonial.deleteOne();
  return success(res, 200, null, 'Testimonial deleted successfully');
});

module.exports = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  toggleTestimonialStatus,
  deleteTestimonial,
};

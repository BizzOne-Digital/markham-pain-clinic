const FAQ = require('../models/FAQ');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');

const getFaqs = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'active' };
  const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: -1 });
  return success(res, 200, faqs);
});

const createFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.create(req.body);
  return success(res, 201, faq, 'FAQ created successfully');
});

const updateFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!faq) throw new ApiError(404, 'FAQ not found');
  return success(res, 200, faq, 'FAQ updated successfully');
});

const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) throw new ApiError(404, 'FAQ not found');
  return success(res, 200, null, 'FAQ deleted successfully');
});

const reorderFaqs = asyncHandler(async (req, res) => {
  const { order } = req.body;
  if (!Array.isArray(order)) throw new ApiError(400, 'order must be an array');

  await Promise.all(order.map((item) => FAQ.findByIdAndUpdate(item.id, { order: item.order })));

  const faqs = await FAQ.find().sort({ order: 1 });
  return success(res, 200, faqs, 'FAQs reordered successfully');
});

module.exports = { getFaqs, createFaq, updateFaq, deleteFaq, reorderFaqs };

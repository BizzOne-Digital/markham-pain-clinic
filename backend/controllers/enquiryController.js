const Enquiry = require('../models/Enquiry');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');
const { sendEnquiryNotification, sendEnquiryConfirmation } = require('../services/emailService');

const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.create(req.body);

  try {
    await Promise.all([sendEnquiryNotification(enquiry), sendEnquiryConfirmation(enquiry)]);
  } catch (error) {
    console.error(`Enquiry email failed for ${enquiry._id}: ${error.message}`);
  }

  return success(res, 201, enquiry, 'Enquiry submitted successfully');
});

const getEnquiries = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.type) filter.type = req.query.type;

  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
  return success(res, 200, enquiries);
});

const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  return success(res, 200, enquiry);
});

const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  return success(res, 200, enquiry, 'Enquiry status updated');
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  return success(res, 200, null, 'Enquiry deleted successfully');
});

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
};

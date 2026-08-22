const Service = require('../models/Service');
const TeamMember = require('../models/TeamMember');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');
const Enquiry = require('../models/Enquiry');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

const getDashboardOverview = asyncHandler(async (req, res) => {
  const [servicesCount, teamCount, testimonialsCount, blogsCount, enquiriesCount, newEnquiriesCount, recentEnquiries] =
    await Promise.all([
      Service.countDocuments(),
      TeamMember.countDocuments(),
      Testimonial.countDocuments(),
      Blog.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
    ]);

  return success(res, 200, {
    counts: {
      services: servicesCount,
      team: teamCount,
      testimonials: testimonialsCount,
      blogs: blogsCount,
      enquiries: enquiriesCount,
      newEnquiries: newEnquiriesCount,
    },
    recentEnquiries,
  });
});

module.exports = { getDashboardOverview };

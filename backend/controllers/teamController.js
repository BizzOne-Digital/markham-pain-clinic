const TeamMember = require('../models/TeamMember');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/slugify');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getTeamMembers = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'active' };
  const members = await TeamMember.find(filter).sort({ order: 1, createdAt: -1 });
  return success(res, 200, members);
});

const getTeamMemberBySlug = asyncHandler(async (req, res) => {
  const member = await TeamMember.findOne({ slug: req.params.slug });
  if (!member) throw new ApiError(404, 'Team member not found');
  return success(res, 200, member);
});

const createTeamMember = asyncHandler(async (req, res) => {
  const slug = await generateUniqueSlug(TeamMember, req.body.slug || req.body.name);

  let image = {};
  if (req.file) {
    image = await uploadImage(req.file.buffer, 'markham-pain-clinic/team');
  }

  const member = await TeamMember.create({ ...req.body, slug, image });
  return success(res, 201, member, 'Team member created successfully');
});

const updateTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);
  if (!member) throw new ApiError(404, 'Team member not found');

  if (req.body.name && req.body.name !== member.name && !req.body.slug) {
    req.body.slug = await generateUniqueSlug(TeamMember, req.body.name, member._id);
  } else if (req.body.slug) {
    req.body.slug = await generateUniqueSlug(TeamMember, req.body.slug, member._id);
  }

  if (req.file) {
    const newImage = await uploadImage(req.file.buffer, 'markham-pain-clinic/team');
    if (member.image?.public_id) await deleteImage(member.image.public_id);
    req.body.image = newImage;
  }

  Object.assign(member, req.body);
  await member.save();
  return success(res, 200, member, 'Team member updated successfully');
});

const deleteTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);
  if (!member) throw new ApiError(404, 'Team member not found');

  if (member.image?.public_id) await deleteImage(member.image.public_id);
  await member.deleteOne();
  return success(res, 200, null, 'Team member deleted successfully');
});

module.exports = {
  getTeamMembers,
  getTeamMemberBySlug,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};

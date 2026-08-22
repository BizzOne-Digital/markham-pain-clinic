const WebsiteSettings = require('../models/WebsiteSettings');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getSingletonSettings = async () => {
  let settings = await WebsiteSettings.findOne();
  if (!settings) settings = await WebsiteSettings.create({});
  return settings;
};

const getSettings = asyncHandler(async (req, res) => {
  const settings = await getSingletonSettings();
  return success(res, 200, settings);
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getSingletonSettings();

  if (req.body.openingHours && typeof req.body.openingHours === 'string') {
    req.body.openingHours = JSON.parse(req.body.openingHours);
  }

  if (req.files?.logo?.[0]) {
    const newLogo = await uploadImage(req.files.logo[0].buffer, 'markham-pain-clinic/settings');
    if (settings.logo?.public_id) await deleteImage(settings.logo.public_id);
    req.body.logo = newLogo;
  }

  if (req.files?.favicon?.[0]) {
    const newFavicon = await uploadImage(
      req.files.favicon[0].buffer,
      'markham-pain-clinic/settings'
    );
    if (settings.favicon?.public_id) await deleteImage(settings.favicon.public_id);
    req.body.favicon = newFavicon;
  }

  Object.assign(settings, req.body);
  await settings.save();
  return success(res, 200, settings, 'Settings updated successfully');
});

module.exports = { getSettings, updateSettings };

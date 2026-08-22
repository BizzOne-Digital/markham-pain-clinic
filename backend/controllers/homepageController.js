const Homepage = require('../models/Homepage');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getSingletonHomepage = async () => {
  let homepage = await Homepage.findOne();
  if (!homepage) homepage = await Homepage.create({});
  return homepage;
};

const getHomepage = asyncHandler(async (req, res) => {
  const homepage = await getSingletonHomepage();
  return success(res, 200, homepage);
});

const updateHomepage = asyncHandler(async (req, res) => {
  const homepage = await getSingletonHomepage();
  const body = { ...req.body };

  ['hero', 'about', 'featureCards', 'treatmentSteps', 'sectionVisibility'].forEach((key) => {
    if (body[key] && typeof body[key] === 'string') {
      body[key] = JSON.parse(body[key]);
    }
  });

  if (req.files?.heroImage?.[0]) {
    const newImage = await uploadImage(
      req.files.heroImage[0].buffer,
      'markham-pain-clinic/homepage'
    );
    if (homepage.hero?.image?.public_id) await deleteImage(homepage.hero.image.public_id);
    body.hero = { ...(body.hero || homepage.hero.toObject()), image: newImage };
  }

  if (req.files?.aboutImage?.[0]) {
    const newImage = await uploadImage(
      req.files.aboutImage[0].buffer,
      'markham-pain-clinic/homepage'
    );
    if (homepage.about?.image?.public_id) await deleteImage(homepage.about.image.public_id);
    body.about = { ...(body.about || homepage.about.toObject()), image: newImage };
  }

  Object.assign(homepage, body);
  await homepage.save();
  return success(res, 200, homepage, 'Homepage updated successfully');
});

module.exports = { getHomepage, updateHomepage };

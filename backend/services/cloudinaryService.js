const cloudinary = require('../config/cloudinary');

const uploadImage = (fileBuffer, folder = 'markham-pain-clinic') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

const deleteImage = async (publicId) => {
  if (!publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Cloudinary delete failed for ${publicId}: ${error.message}`);
    return null;
  }
};

module.exports = { uploadImage, deleteImage };

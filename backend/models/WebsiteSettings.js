const mongoose = require('mongoose');

const websiteSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Markham Pain Clinic' },
    logo: {
      secure_url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    favicon: {
      secure_url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    facebookUrl: { type: String, default: '' },
    openingHours: [
      {
        day: { type: String },
        hours: { type: String },
      },
    ],
    footerText: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WebsiteSettings', websiteSettingsSchema);

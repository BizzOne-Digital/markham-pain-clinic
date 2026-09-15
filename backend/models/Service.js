const mongoose = require('mongoose');

const detailBlockSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    shortDescription: { type: String, trim: true },
    description: { type: String, trim: true },
    whatIsIt: { type: String, trim: true },
    icon: { type: String, trim: true },
    image: {
      secure_url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    benefits: [{ type: String, trim: true }],
    whoCanBenefit: [{ type: String, trim: true }],
    conditionsTreated: [{ type: String, trim: true }],
    treatmentProcess: [{ type: String, trim: true }],
    howItWorks: { type: [detailBlockSchema], default: [] },
    whyChooseUs: { type: [detailBlockSchema], default: [] },
    closingText: { type: String, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);

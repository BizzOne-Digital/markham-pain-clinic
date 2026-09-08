const mongoose = require('mongoose');

const detailBlockSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, trim: true },
    price: { type: String, trim: true, default: '' },
    image: {
      secure_url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

    // Detail page content
    intro: { type: String, trim: true },
    whatIsIt: { type: String, trim: true },
    keyFeatures: { type: [detailBlockSchema], default: [] },
    whoCanBenefit: { type: [detailBlockSchema], default: [] },
    commonUses: { type: [detailBlockSchema], default: [] },
    benefits: { type: [String], default: [] },
    whyChooseUs: { type: [detailBlockSchema], default: [] },
    closingText: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

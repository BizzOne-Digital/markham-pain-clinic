const mongoose = require('mongoose');

const detailBlockSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false }
);

const conditionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, trim: true },
    icon: { type: String, trim: true },
    image: {
      secure_url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

    // Detail page content
    intro: { type: String, trim: true },
    whatIsIt: { type: String, trim: true },
    symptoms: { type: [String], default: [] },
    symptomsDetails: { type: [detailBlockSchema], default: [] },
    causes: { type: [String], default: [] },
    causesDetails: { type: [detailBlockSchema], default: [] },
    treatmentApproach: { type: String, trim: true },
    treatmentDetails: { type: [detailBlockSchema], default: [] },
    benefits: { type: [String], default: [] },
    practicalTips: { type: [String], default: [] },
    practicalTipsDetails: { type: [detailBlockSchema], default: [] },
    whenToSeekHelp: { type: String, trim: true },
    whyChooseUs: { type: [detailBlockSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Condition', conditionSchema);

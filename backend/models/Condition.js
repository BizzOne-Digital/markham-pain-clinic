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
    causes: { type: [String], default: [] },
    treatmentApproach: { type: String, trim: true },
    benefits: { type: [String], default: [] },
    practicalTips: { type: [String], default: [] },
    whenToSeekHelp: { type: String, trim: true },
    whyChooseUs: { type: [detailBlockSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Condition', conditionSchema);

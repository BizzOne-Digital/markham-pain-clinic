const mongoose = require('mongoose');

const featureCardSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    icon: String,
  },
  { _id: false }
);

const treatmentStepSchema = new mongoose.Schema(
  {
    stepNumber: Number,
    title: String,
    description: String,
  },
  { _id: false }
);

const homepageSchema = new mongoose.Schema(
  {
    hero: {
      headline: { type: String, default: '' },
      subheading: { type: String, default: '' },
      image: {
        secure_url: { type: String, default: '' },
        public_id: { type: String, default: '' },
      },
      ctaText: { type: String, default: 'Book an Appointment' },
      ctaUrl: { type: String, default: '/contact' },
    },
    welcomeText: { type: String, default: '' },
    about: {
      text: { type: String, default: '' },
      image: {
        secure_url: { type: String, default: '' },
        public_id: { type: String, default: '' },
      },
    },
    featureCards: [featureCardSchema],
    treatmentSteps: [treatmentStepSchema],
    sectionVisibility: {
      hero: { type: Boolean, default: true },
      about: { type: Boolean, default: true },
      services: { type: Boolean, default: true },
      team: { type: Boolean, default: true },
      testimonials: { type: Boolean, default: true },
      blogs: { type: Boolean, default: true },
      faqs: { type: Boolean, default: true },
      stats: { type: Boolean, default: true },
      conditions: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Homepage', homepageSchema);

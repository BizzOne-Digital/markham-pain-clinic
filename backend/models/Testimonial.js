const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true },
    serviceCategory: { type: String, trim: true, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: {
      secure_url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    status: { type: String, enum: ['published', 'unpublished'], default: 'unpublished' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);

const mongoose = require('mongoose');

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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Condition', conditionSchema);

const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: Number, required: true },
    suffix: { type: String, trim: true, default: '' },
    icon: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Statistic', statisticSchema);

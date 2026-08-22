const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    designation: { type: String, required: true, trim: true },
    specialization: { type: String, trim: true, default: '' },
    bio: { type: String, trim: true },
    qualifications: [{ type: String, trim: true }],
    expertise: [{ type: String, trim: true }],
    philosophy: { type: String, trim: true, default: '' },
    image: {
      secure_url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    socialLinks: {
      linkedin: { type: String, trim: true, default: '' },
      instagram: { type: String, trim: true, default: '' },
      facebook: { type: String, trim: true, default: '' },
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);

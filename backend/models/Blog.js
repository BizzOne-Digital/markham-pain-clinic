const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    excerpt: { type: String, trim: true },
    content: { type: String, required: true },
    featuredImage: {
      secure_url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    categories: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    author: { type: String, trim: true, default: 'Markham Pain Clinic' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

blogSchema.pre('save', function setPublishedAt(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);

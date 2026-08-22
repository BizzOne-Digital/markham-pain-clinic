const Blog = require('../models/Blog');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, success } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/slugify');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');

const getBlogs = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'published' };
  if (req.query.category) filter.categories = req.query.category;

  const blogs = await Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 });
  return success(res, 200, blogs);
});

const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) throw new ApiError(404, 'Blog not found');
  return success(res, 200, blog);
});

const createBlog = asyncHandler(async (req, res) => {
  const slug = await generateUniqueSlug(Blog, req.body.slug || req.body.title);

  let featuredImage = {};
  if (req.file) {
    featuredImage = await uploadImage(req.file.buffer, 'markham-pain-clinic/blogs');
  }

  if (req.body.categories && typeof req.body.categories === 'string') {
    req.body.categories = req.body.categories.split(',').map((c) => c.trim());
  }
  if (req.body.tags && typeof req.body.tags === 'string') {
    req.body.tags = req.body.tags.split(',').map((t) => t.trim());
  }

  const blog = await Blog.create({ ...req.body, slug, featuredImage });
  return success(res, 201, blog, 'Blog created successfully');
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, 'Blog not found');

  if (req.body.title && req.body.title !== blog.title && !req.body.slug) {
    req.body.slug = await generateUniqueSlug(Blog, req.body.title, blog._id);
  } else if (req.body.slug) {
    req.body.slug = await generateUniqueSlug(Blog, req.body.slug, blog._id);
  }

  if (req.body.categories && typeof req.body.categories === 'string') {
    req.body.categories = req.body.categories.split(',').map((c) => c.trim());
  }
  if (req.body.tags && typeof req.body.tags === 'string') {
    req.body.tags = req.body.tags.split(',').map((t) => t.trim());
  }

  if (req.file) {
    const newImage = await uploadImage(req.file.buffer, 'markham-pain-clinic/blogs');
    if (blog.featuredImage?.public_id) await deleteImage(blog.featuredImage.public_id);
    req.body.featuredImage = newImage;
  }

  Object.assign(blog, req.body);
  await blog.save();
  return success(res, 200, blog, 'Blog updated successfully');
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, 'Blog not found');

  if (blog.featuredImage?.public_id) await deleteImage(blog.featuredImage.public_id);
  await blog.deleteOne();
  return success(res, 200, null, 'Blog deleted successfully');
});

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };

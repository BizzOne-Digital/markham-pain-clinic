const slugify = require('slugify');

const makeSlug = (text) =>
  slugify(text, { lower: true, strict: true, trim: true });

const generateUniqueSlug = async (Model, text, currentId = null) => {
  const base = makeSlug(text);
  let slug = base;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (currentId) query._id = { $ne: currentId };
    const existing = await Model.findOne(query);
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter += 1;
  }
};

module.exports = { makeSlug, generateUniqueSlug };

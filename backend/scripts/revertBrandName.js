// Replaces "Remarkable Physiotherapy" with "Markham Pain Clinic" across every
// string field (including nested arrays/objects) in every collection that
// could hold client-facing copy. Contact details (address/phone/email) are
// left untouched per instruction.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');
const Condition = require('../models/Condition');
const Product = require('../models/Product');
const TeamMember = require('../models/TeamMember');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const Blog = require('../models/Blog');

const FROM = 'Remarkable Physiotherapy';
const TO = 'Markham Pain Clinic';

function deepReplace(value) {
  if (typeof value === 'string') {
    return value.split(FROM).join(TO);
  }
  if (Array.isArray(value)) {
    return value.map(deepReplace);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = deepReplace(v);
    }
    return out;
  }
  return value;
}

function containsBrand(value) {
  if (typeof value === 'string') return value.includes(FROM);
  if (Array.isArray(value)) return value.some(containsBrand);
  if (value && typeof value === 'object') return Object.values(value).some(containsBrand);
  return false;
}

async function fixCollection(Model, name) {
  const docs = await Model.find({});
  let changed = 0;
  for (const doc of docs) {
    const obj = doc.toObject();
    const { _id, __v, createdAt, updatedAt, ...rest } = obj;
    if (containsBrand(rest)) {
      const fixed = deepReplace(rest);
      await Model.updateOne({ _id: doc._id }, { $set: fixed });
      changed++;
    }
  }
  console.log(`${name}: updated ${changed}/${docs.length} documents`);
}

async function run() {
  await connectDB();
  await fixCollection(Service, 'Service');
  await fixCollection(Condition, 'Condition');
  await fixCollection(Product, 'Product');
  await fixCollection(TeamMember, 'TeamMember');
  await fixCollection(Testimonial, 'Testimonial');
  await fixCollection(FAQ, 'FAQ');
  await fixCollection(Blog, 'Blog');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Renames conditions to match the "<Condition> Treatment in Markham" /
// "<Condition> in Markham" naming shown in the live site's Conditions nav.
require('dotenv').config();
const connectDB = require('../config/db');
const Condition = require('../models/Condition');

const NAMES = {
  'wsib-injuries': 'WSIB Injuries Treatment in Markham',
  'motor-vehicle-accident-injuries': 'Motor Vehicle Accident Injuries Treatment in Markham',
  'fibromyalgia-treatment': 'Fibromyalgia Treatment in Markham',
  'dizziness-treatment': 'Dizziness Treatment in Markham',
  'chronic-pain': 'Chronic Pain Treatment in Markham',
  'balance-disorder': 'Balance Disorder Treatment in Markham',
  'hand-pain': 'Hand Pain Treatment in Markham',
  'elbow-pain': 'Elbow Pain Treatment in Markham',
  'ankle-pain': 'Ankle Pain Treatment in Markham',
  'dance-injuries': 'Dance Injuries Treatment in Markham',
  'hip-pain': 'Hip Pain Treatment in Markham',
  'sciatica-pain': 'Sciatica Pain Treatment in Markham',
  'headaches': 'Headaches Treatment in Markham',
  'vertigo': 'Vertigo Treatment in Markham',
  'concussions': 'Concussions Treatment in Markham',
  'gait-disorders': 'Gait Disorders Treatment in Markham',
  'arthritis-treatment': 'Arthritis Treatment in Markham',
  'wrist-pain': 'Wrist Pain Treatment in Markham',
  'shoulder-pain': 'Shoulder Pain Treatment in Markham',
  'foot-pain': 'Foot Pain Treatment in Markham',
  'knee-pain': 'Knee Pain Treatment in Markham',
  'neck-pain': 'Neck Pain Treatment in Markham',
  'back-pain': 'Back Pain Treatment in Markham',
};

async function run() {
  await connectDB();
  let updated = 0;
  for (const [slug, name] of Object.entries(NAMES)) {
    const res = await Condition.updateOne({ slug }, { $set: { name } });
    if (res.matchedCount) updated++;
    else console.log('No condition found for slug:', slug);
  }
  console.log(`Updated names for ${updated}/${Object.keys(NAMES).length} conditions`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

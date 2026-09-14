// Restores the original uploaded service images (recovered from Cloudinary
// after an earlier script accidentally wiped the Service collection).
// Matches each recovered image to a service by visual content since the
// original DB link between image and service was lost.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const MAPPING = [
  { slug: 'vestibular-therapy', public_id: 'markham-pain-clinic/services/akwx4mxji89lqeznqxhs', ext: 'jpg' },
  { slug: 'trigger-point-release', public_id: 'markham-pain-clinic/services/aprfymplf4ctd3ppvyyt', ext: 'webp' },
  { slug: 'chiropractic-care', public_id: 'markham-pain-clinic/services/auxsehd76nr8kksoz2ew', ext: 'png' },
  { slug: 'dry-needling', public_id: 'markham-pain-clinic/services/cljdzljju11z0hdogg0p', ext: 'webp' },
  { slug: 'manual-therapy', public_id: 'markham-pain-clinic/services/czvykmwdfhjfwb2mwzbr', ext: 'webp' },
  { slug: 'acupuncture', public_id: 'markham-pain-clinic/services/ejvuuew38g8ne3d8ev30', ext: 'png' },
  { slug: 'dancer-rehabilitation', public_id: 'markham-pain-clinic/services/fbjdv3auzegsumb7ziyu', ext: 'webp' },
  { slug: 'deep-tissue-massage', public_id: 'markham-pain-clinic/services/gza1fo2h6ley51vxyduy', ext: 'webp' },
  { slug: 'psychological-services', public_id: 'markham-pain-clinic/services/ircj6pqk064e0bejbde2', ext: 'jpg' },
  { slug: 'physiotherapy', public_id: 'markham-pain-clinic/services/jtqfajaq2l610yz9ndqp', ext: 'png' },
  { slug: 'therapeutic-exercise', public_id: 'markham-pain-clinic/services/jvgmwx5mm1apgi59jk92', ext: 'png' },
  { slug: 'mckenzie-method', public_id: 'markham-pain-clinic/services/ldxkempn09pwqlnx0etq', ext: 'webp' },
  { slug: 'relaxation-method', public_id: 'markham-pain-clinic/services/mixdbzsbetsaihyj7wgm', ext: 'jpg' },
  { slug: 'cupping-therapy', public_id: 'markham-pain-clinic/services/nqylbjxrs7tbe0ejlfdt', ext: 'webp' },
  { slug: 'massage-therapy', public_id: 'markham-pain-clinic/services/nramrc7xf6d4mugfhofs', ext: 'webp' },
  { slug: 'soft-tissue-release', public_id: 'markham-pain-clinic/services/pojln7vcrwucrdqkq9ao', ext: 'png' },
  { slug: 'spinal-manipulation-adjustment', public_id: 'markham-pain-clinic/services/tmilj7weih177nebbcfq', ext: 'webp' },
  { slug: 'return-to-work-play', public_id: 'markham-pain-clinic/services/umhvumidzfekyzey9f7u', ext: 'webp' },
  { slug: 'myofascial-release', public_id: 'markham-pain-clinic/services/vian6moukyjgvthytfaw', ext: 'webp' },
  { slug: 'electrotherapeutic-modalities', public_id: 'markham-pain-clinic/services/ycky5cj8stbvg6cjohoe', ext: 'jpg' },
];

const VERSION = {
  'markham-pain-clinic/services/akwx4mxji89lqeznqxhs': 1788647127,
  'markham-pain-clinic/services/aprfymplf4ctd3ppvyyt': 1787753461,
  'markham-pain-clinic/services/auxsehd76nr8kksoz2ew': 1787410991,
  'markham-pain-clinic/services/cljdzljju11z0hdogg0p': 1787753336,
  'markham-pain-clinic/services/czvykmwdfhjfwb2mwzbr': 1787753560,
  'markham-pain-clinic/services/ejvuuew38g8ne3d8ev30': 1787410978,
  'markham-pain-clinic/services/fbjdv3auzegsumb7ziyu': 1787753543,
  'markham-pain-clinic/services/gza1fo2h6ley51vxyduy': 1787753702,
  'markham-pain-clinic/services/ircj6pqk064e0bejbde2': 1788647195,
  'markham-pain-clinic/services/jtqfajaq2l610yz9ndqp': 1787410954,
  'markham-pain-clinic/services/jvgmwx5mm1apgi59jk92': 1787411005,
  'markham-pain-clinic/services/ldxkempn09pwqlnx0etq': 1787753283,
  'markham-pain-clinic/services/mixdbzsbetsaihyj7wgm': 1788647182,
  'markham-pain-clinic/services/nqylbjxrs7tbe0ejlfdt': 1787753310,
  'markham-pain-clinic/services/nramrc7xf6d4mugfhofs': 1787753263,
  'markham-pain-clinic/services/pojln7vcrwucrdqkq9ao': 1787411016,
  'markham-pain-clinic/services/tmilj7weih177nebbcfq': 1787753384,
  'markham-pain-clinic/services/umhvumidzfekyzey9f7u': 1787753636,
  'markham-pain-clinic/services/vian6moukyjgvthytfaw': 1787753669,
  'markham-pain-clinic/services/ycky5cj8stbvg6cjohoe': 1788647067,
};

async function run() {
  await connectDB();
  let updated = 0;
  for (const m of MAPPING) {
    const secure_url = `https://res.cloudinary.com/difmil8wj/image/upload/v${VERSION[m.public_id]}/${m.public_id}.${m.ext}`;
    const res = await Service.updateOne({ slug: m.slug }, { $set: { image: { secure_url, public_id: m.public_id } } });
    if (res.matchedCount) updated++;
    else console.log('No service found for slug:', m.slug);
  }
  console.log(`Updated images for ${updated}/${MAPPING.length} services`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

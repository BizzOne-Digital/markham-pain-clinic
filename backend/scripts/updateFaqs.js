// Replaces FAQ entries with the real Q&A from remarkablephysio.com.
require('dotenv').config();
const connectDB = require('../config/db');
const FAQ = require('../models/FAQ');

const FAQS = [
  { question: 'What conditions do you treat?', answer: 'We address a wide range of issues, including sports injuries, post-surgical recovery, chronic discomfort, and mobility challenges.' },
  { question: 'How do I know which therapy is right for me?', answer: 'Our team evaluates your condition and recommends a therapy plan suited to your needs and goals.' },
  { question: 'Do I need a doctor’s referral?', answer: 'Most patients can book directly with us, though certain insurance plans may require a referral.' },
  { question: 'How long is a typical session?', answer: 'Sessions usually last between 45 to 60 minutes, depending on your treatment plan.' },
  { question: 'Will therapy be painful?', answer: 'Some treatments may cause mild discomfort, but we focus on safe techniques to support gradual improvement.' },
  { question: 'How many sessions will I need?', answer: 'The number of sessions depends on your condition, recovery goals, and progress during treatment.' },
  { question: 'Do you provide at-home exercises?', answer: 'Yes, we give practical exercises you can follow at home to support ongoing improvement.' },
  { question: 'Is your clinic equipped with modern therapy tools?', answer: 'Yes, we use advanced equipment and techniques to enhance assessment, treatment, and recovery outcomes.' },
  { question: 'Can children or seniors receive therapy here?', answer: 'Absolutely. We work with patients of all ages and tailor care to individual needs.' },
  { question: 'How do I book an appointment?', answer: 'You can call our clinic, use our online booking system, or contact us through our website form.' },
];

async function run() {
  await connectDB();
  await FAQ.deleteMany({});
  for (let i = 0; i < FAQS.length; i++) {
    await FAQ.create({ ...FAQS[i], order: i + 1 });
  }
  console.log(`FAQ: replaced with ${FAQS.length} real questions`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

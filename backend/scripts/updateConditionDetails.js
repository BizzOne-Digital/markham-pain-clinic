// Adds full detail-page content for conditions, matching remarkablephysio.com.
require('dotenv').config();
const connectDB = require('../config/db');
const Condition = require('../models/Condition');

const DETAILS = [
  {
    slug: 'vertigo',
    intro: 'Vertigo can feel unsettling and disruptive, often making even simple daily activities difficult. If you’re experiencing spinning sensations, dizziness, or balance issues, seeking professional care can make a meaningful difference. At Remarkable Physiotherapy in Markham, we focus on identifying the cause of vertigo and helping you restore stability and confidence in your movements.',
    whatIsIt: 'Vertigo is not just a general feeling of dizziness; it is a specific sensation that you or your surroundings are spinning or moving when there is no actual motion. This condition is commonly linked to issues within the inner ear or the vestibular system, which plays a key role in maintaining balance.',
    symptoms: ['A spinning or whirling sensation', 'Loss of balance or unsteadiness', 'Nausea or vomiting', 'Difficulty focusing or visual disturbances', 'Headaches or pressure in the head', 'Ringing in the ears (tinnitus)'],
    causes: ['Benign Paroxysmal Positional Vertigo (BPPV)', 'Vestibular Neuritis', 'Meniere’s Disease', 'Head injuries', 'Migraines', 'Inner ear infections', 'Age-related balance decline'],
    treatmentApproach: 'Physiotherapy plays a significant role in managing vertigo by addressing the underlying cause and improving the body’s balance system. At Remarkable Physiotherapy, we use vestibular rehabilitation to retrain the brain and body to process balance signals correctly, canalith repositioning techniques to guide displaced particles in the inner ear back to their proper location (for conditions like BPPV), balance and coordination training to strengthen the body’s ability to maintain stability, and gaze stabilization exercises to improve visual focus during head movements.',
    benefits: ['Thorough assessment of balance, coordination and vestibular function', 'Individualized care plan based on your specific condition and goals', 'Ongoing support with progress monitored closely'],
    practicalTips: ['Seek evaluation if vertigo episodes are recurring', 'Get assessed if symptoms interfere with daily activities', 'Don’t wait if you experience nausea or difficulty walking', 'Seek care if there is no improvement over time'],
    whyChooseUs: [
      { title: 'Focus on Root Cause', description: 'Rather than addressing only symptoms, we aim to identify and manage the underlying cause of your vertigo.' },
      { title: 'Evidence-Based Methods', description: 'Our approach is grounded in proven techniques that are widely used for vestibular conditions.' },
      { title: 'Patient-Centered Care', description: 'We take the time to listen to your concerns and adapt your care plan based on your progress and feedback.' },
      { title: 'Convenient Markham Location', description: 'Our clinic is easily accessible, making it simple for residents of Markham to receive consistent care.' },
    ],
    whenToSeekHelp: 'If you experience frequent dizziness, balance problems, or sudden episodes of spinning sensations, it is important to seek professional evaluation. Early care can help prevent worsening symptoms and reduce the risk of falls or injury. If you’re in Markham and dealing with vertigo, contact Remarkable Physiotherapy today. Book your appointment and take the first step toward steady, confident movement.',
  },
  {
    slug: 'back-pain',
    intro: 'Back pain is one of the most common physical complaints affecting people of all ages in Markham. Whether it comes from long hours at a desk, physically demanding work, sports activities, or sudden injury, it can interfere with daily life and limit movement. At Remarkable Physiotherapy, we focus on identifying the root cause of back pain and helping you return to normal function with structured care.',
    whatIsIt: 'Back pain can occur anywhere along the spine, from the neck down to the lower back. Most cases involve the lower back, also known as the lumbar region, as it supports much of the body’s weight and movement. Common types include acute back pain (lasting a few days to a few weeks, often from strain or injury), chronic back pain (persisting more than three months and possibly involving deeper structural issues), mechanical back pain (related to muscles, joints, or discs), and radicular pain (caused by nerve irritation, often felt as shooting pain down the leg).',
    symptoms: ['Pain that persists for several days without improvement', 'Difficulty bending, twisting, or standing upright', 'Pain radiating into the legs or arms', 'Numbness or tingling sensations', 'Stiffness after rest or in the morning'],
    causes: ['Poor posture while sitting or standing', 'Prolonged screen time without breaks', 'Improper lifting techniques', 'Weak core muscles', 'Sedentary lifestyle', 'Muscle or ligament strain', 'Herniated or bulging discs', 'Degenerative disc changes', 'Sciatica', 'Spinal joint dysfunction'],
    treatmentApproach: 'Our clinic in Markham uses a structured approach that focuses on restoring movement, reducing discomfort, and improving overall function. This begins with a thorough assessment of your posture, mobility, strength, and movement patterns, followed by hands-on techniques to improve joint mobility and reduce muscle tension. Targeted exercise programs include strength and stability training for the core muscles that support the spine, flexibility and mobility work to reduce stiffness, and movement re-education for safe daily activities such as sitting, lifting, and walking. You will also receive education on posture, workstation setup, and activity modification.',
    benefits: ['Reduced discomfort during movement and rest', 'Improved flexibility and strength', 'Better posture and body mechanics', 'Increased ability to perform daily tasks', 'Lower risk of recurring issues'],
    practicalTips: ['Don’t wait for pain to resolve on its own if it’s ongoing or worsening', 'Starting physiotherapy early can help prevent the condition from worsening', 'Early treatment can reduce downtime from work or daily activities', 'Early treatment can improve recovery speed'],
    whyChooseUs: [
      { title: 'Individual Attention', description: 'Every session is centred around your progress, ensuring your needs are addressed at each stage.' },
      { title: 'Evidence-Based Methods', description: 'We use proven techniques backed by research to support your recovery.' },
      { title: 'Supportive Environment', description: 'Our clinic provides a welcoming and motivating space where you can focus on improving your physical health.' },
      { title: 'Focus on Lasting Results', description: 'We work to correct the underlying cause rather than just manage symptoms.' },
    ],
    whenToSeekHelp: 'Back pain should not control how you live your life. If you are experiencing back pain or noticing early signs, now is the time to take action. Book an appointment with our team or contact us today to begin your journey toward improved movement and a more active lifestyle. Related reading: Physiotherapy for Low Back Pain in Markham — if symptoms are affecting work, sleep, walking, or daily movement, you can also book an assessment with Remarkable Physiotherapy.',
  },
];

async function run() {
  await connectDB();
  let updated = 0;
  for (const d of DETAILS) {
    const { slug, ...fields } = d;
    const res = await Condition.updateOne({ slug }, { $set: fields });
    if (res.matchedCount) updated++;
    else console.log('No condition found for slug:', slug);
  }
  console.log(`Updated detail content for ${updated}/${DETAILS.length} conditions`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

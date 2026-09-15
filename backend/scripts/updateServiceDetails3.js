// Third and final batch of full detail-page content, matching remarkablephysio.com.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const DETAILS = [
  {
    slug: 'psychological-services',
    description:
      'Mental and emotional health play a major role in how you move, think, and live each day. At Remarkable Physiotherapy, Psychological Services are available to support individuals facing stress, emotional strain, or challenges linked to injury and recovery, provided by a trained psychologist in a confidential setting focused on practical strategies and measurable progress.',
    benefits: ['Improved ability to recognize and manage stress triggers', 'Better sleep patterns', 'Improved focus and workplace resilience', 'Stronger coping strategies during rehabilitation'],
    whoCanBenefit: ['People experiencing ongoing stress, anxiety or low mood', 'Those with injury-related emotional challenges (MVA, chronic pain, recovery stress)', 'People facing workplace stress or burnout', 'Anyone with sleep, relationship or family concerns'],
    conditionsTreated: ['Stress, anxiety and depression', 'Injury-related emotional challenges', 'Workplace stress and burnout', 'Sleep issues', 'Relationship and family concerns', 'Coping with pain and rehabilitation'],
    treatmentProcess: ['Initial consultation to understand concerns and history', 'Goal setting for realistic, meaningful outcomes', 'Ongoing sessions applying cognitive and behavioural strategies', 'Progress tracking and adjustment'],
  },
  {
    slug: 'mckenzie-method',
    description:
      'If you are dealing with ongoing back, neck, or joint discomfort, finding the right approach can make a significant difference in how you move and function each day. The McKenzie method (Mechanical Diagnosis and Therapy) is a globally recognized system used at Remarkable Physiotherapy to identify the root cause of pain through movement-based assessment, rather than simply addressing symptoms.',
    benefits: ['Targeted care based on detailed assessment', 'Active participation in your own recovery', 'Reduced dependence on ongoing clinic visits', 'Focus on long-term control of your condition'],
    whoCanBenefit: ['People whose pain changes with movement or posture', 'Those who prefer an active, self-management approach', 'Anyone wanting to learn to manage their condition independently'],
    conditionsTreated: ['Lower back pain', 'Neck stiffness', 'Disc-related conditions', 'Sciatica', 'Shoulder and knee discomfort', 'Repetitive strain injuries'],
    treatmentProcess: ['Detailed assessment including movement testing', 'Classification of your condition based on response to movement', 'Repeated movements and sustained positions to centralize pain', 'Self-management training for long-term control'],
  },
  {
    slug: 'deep-tissue-massage',
    description:
      'If persistent muscle tightness or stiffness is interfering with your daily routine, deep tissue massage can play a key role in restoring movement and easing discomfort. At Remarkable Physiotherapy in Markham, this service uses slow, controlled pressure to target deeper muscle layers, improve circulation, and break down adhesions that restrict movement.',
    benefits: ['Reduced muscle tightness', 'Improved mobility', 'Support for injury recovery', 'Stress reduction'],
    whoCanBenefit: ['Office workers with neck and shoulder tightness', 'Athletes managing muscle fatigue', 'People with physically demanding jobs', 'Anyone recovering from minor strains'],
    conditionsTreated: ['Chronic muscle tightness', 'Limited mobility', 'Postural strain from desk work', 'Old injuries affecting movement'],
    treatmentProcess: ['Initial assessment of concerns and lifestyle', 'Focused treatment with controlled pressure on specific muscle groups', 'Aftercare guidance on hydration and gentle movement'],
  },
  {
    slug: 'soft-tissue-release',
    description:
      'Soft tissue release is a hands-on technique used to address tight muscles, restricted movement, and discomfort caused by everyday strain, sports activity, or prolonged sitting. At Remarkable Physiotherapy, targeted pressure and stretching techniques are applied to muscles, ligaments and fascia to break down restrictions and restore natural movement patterns.',
    benefits: ['Reduced muscle tension', 'Improved flexibility', 'Enhanced recovery', 'Better posture'],
    whoCanBenefit: ['Office workers experiencing stiffness from prolonged sitting', 'Athletes dealing with muscle fatigue or strain', 'Individuals recovering from minor injuries'],
    conditionsTreated: ['Muscle tightness and stiffness', 'Sports-related strains', 'Neck and shoulder tension', 'Lower back discomfort', 'Postural issues from desk work'],
    treatmentProcess: ['Initial assessment of movement, posture and concerns', 'Hands-on soft tissue release on affected areas', 'Movement-based support with guided stretches'],
  },
  {
    slug: 'relaxation-method',
    description:
      'Finding time to unwind has become increasingly difficult in a fast-paced city. Ongoing stress, physical tension, and mental fatigue can gradually affect how your body feels and performs. At Remarkable Physiotherapy, our relaxation method uses controlled breathing, light manual techniques, guided muscle release, and posture awareness to calm both the body and mind.',
    benefits: ['Reduced muscle tension', 'Supported mental calmness', 'Improved sleep patterns', 'Easier daily function'],
    whoCanBenefit: ['People who spend long hours sitting at a desk', 'Those feeling constant muscle tightness', 'Anyone under work or personal stress', 'People with difficulty sleeping'],
    conditionsTreated: ['Muscle tension from stress', 'Sleep disruption', 'General fatigue and mental strain'],
    treatmentProcess: ['Initial assessment of tension and lifestyle', 'Guided breathing and relaxation techniques', 'Post-session advice for at-home practice'],
  },
];

async function run() {
  await connectDB();
  let updated = 0;
  for (const d of DETAILS) {
    const { slug, ...fields } = d;
    const res = await Service.updateOne({ slug }, { $set: fields });
    if (res.matchedCount) updated++;
    else console.log('No service found for slug:', slug);
  }
  console.log(`Updated detail content for ${updated}/${DETAILS.length} services`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

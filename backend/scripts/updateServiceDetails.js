// Adds full detail-page content (description, benefits, who can benefit,
// conditions treated, treatment process) for services where the client
// provided the real page copy from remarkablephysio.com.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const DETAILS = [
  {
    slug: 'physiotherapy',
    description:
      'Living with discomfort, stiffness, or limited movement can affect every part of your routine. At Remarkable Physiotherapy, the focus is on helping you move with ease, restore strength, and return to the activities that matter to you. Physiotherapy is a hands-on, movement-based approach that supports recovery, mobility, and physical function. It looks at how your body moves and identifies areas that need attention, such as weak muscles, tight joints, or poor posture habits.',
    benefits: ['Improved mobility', 'Increased strength', 'Reduced risk of re-injury', 'Better posture and alignment'],
    whoCanBenefit: ['Office workers with posture-related strain', 'Active individuals wanting better performance and recovery', 'Older adults maintaining mobility and independence'],
    conditionsTreated: ['Back and neck discomfort', 'Shoulder, knee and hip concerns', 'Muscle strains and ligament sprains', 'Sports-related and workplace injuries', 'Post-surgical rehabilitation', 'Arthritis-related stiffness'],
    treatmentProcess: ['Assessment and planning', 'Hands-on manual therapy techniques', 'Exercise and movement training', 'Progress tracking and adjustment'],
  },
  {
    slug: 'chiropractic-care',
    description:
      'Chiropractic Care focuses on the relationship between the spine, joints, and the nervous system. When alignment issues occur, they can affect how your body moves and feels during daily activities. At Remarkable Physiotherapy in Markham, our approach centers on improving mobility, easing discomfort, and supporting your body’s natural function through hands-on techniques and targeted care.',
    benefits: ['Improved mobility', 'Reduced muscle tension', 'Better posture', 'Support for active lifestyles'],
    whoCanBenefit: ['Office workers with neck, shoulder or lower back stiffness', 'Athletes and active individuals with joint restrictions', 'Anyone wanting smoother, more efficient everyday movement'],
    conditionsTreated: ['Back discomfort and stiffness', 'Neck pain and reduced mobility', 'Tension headaches', 'Shoulder and upper back tightness', 'Hip and knee joint discomfort', 'Postural strain from desk work'],
    treatmentProcess: ['Initial assessment of posture and joint movement', 'Spinal adjustments and joint mobilization', 'Soft tissue work and stretching techniques', 'Ongoing exercise and posture support'],
  },
  {
    slug: 'massage-therapy',
    description:
      'When daily stress, muscle tension, or physical strain begin to interfere with your routine, Massage Therapy can play a valuable role in restoring balance. At Remarkable Physiotherapy, this service focuses on easing tight muscles, improving circulation, and supporting overall physical function in a calm and professional setting. Techniques include deep tissue, relaxation, sports, therapeutic, and hot stone massage, each matched to your condition.',
    benefits: ['Improved blood flow and muscle function', 'Reduced muscle tension', 'Stress and relaxation benefits', 'Support for active lifestyles'],
    whoCanBenefit: ['People with neck and shoulder tension', 'Those with muscle soreness from workouts', 'Anyone with postural strain from desk work', 'People experiencing stress-related tension'],
    conditionsTreated: ['Neck and shoulder tension', 'Lower back discomfort', 'Muscle soreness from workouts', 'Postural strain from desk work', 'Headaches linked to muscle tightness', 'Joint stiffness affecting movement'],
    treatmentProcess: ['Initial assessment of concerns and routine', 'Treatment session with techniques suited to your condition', 'Post-session advice on stretches and posture'],
  },
  {
    slug: 'acupuncture',
    description:
      'Acupuncture is a time-tested therapy that aims to restore balance in the body by stimulating specific points with fine needles. At Remarkable Physiotherapy in Markham, this method is integrated into modern care plans to support recovery, improve movement, and address a wide range of physical concerns, often alongside other physiotherapy techniques.',
    benefits: ['Improved circulation', 'Reduced muscle tightness', 'Enhanced nerve function', 'Support for the body’s natural recovery processes'],
    whoCanBenefit: ['People with musculoskeletal concerns like neck, back or joint discomfort', 'Athletes recovering from overuse injuries or fatigue', 'Those with stress and tension, including headaches and jaw tightness', 'People with long-standing or chronic discomfort'],
    conditionsTreated: ['Neck and back discomfort', 'Shoulder stiffness', 'Knee and joint issues', 'Muscle strains and tension', 'Headaches and migraines', 'Overuse and sports-related injuries'],
    treatmentProcess: ['Initial assessment of symptoms and lifestyle', 'Fine, sterile needles placed at targeted points', 'Needles left in place for 15–30 minutes', 'Review of response and progress over sessions'],
  },
  {
    slug: 'manual-therapy',
    description:
      'Manual therapy is a hands-on approach used by physiotherapists to assess and treat muscles, joints, and soft tissues. It involves skilled movements such as joint mobilization, soft-tissue work, stretching, and manipulation techniques to improve movement and reduce discomfort. At Remarkable Physiotherapy in Markham, manual therapy addresses everything from everyday aches to more complex musculoskeletal issues.',
    benefits: ['Improved mobility', 'Reduced muscle tension', 'Enhanced circulation', 'Faster recovery'],
    whoCanBenefit: ['Office workers with stiffness and reduced range of motion', 'Athletes recovering from strains or injuries', 'Anyone dealing with repetitive strain from daily activities'],
    conditionsTreated: ['Neck and back discomfort', 'Shoulder injuries', 'Sports-related strains', 'Joint stiffness', 'Postural issues', 'Workplace-related strain injuries'],
    treatmentProcess: ['Initial assessment of movement, posture and concerns', 'Hands-on treatment with joint mobilization and soft tissue work', 'Guided exercises to support progress between sessions'],
  },
  {
    slug: 'cupping-therapy',
    description:
      'Cupping therapy is a hands-on technique that uses suction cups placed on the skin to create a gentle vacuum effect. This method helps stimulate blood flow, ease muscle tightness, and support the body’s natural recovery process. At Remarkable Physiotherapy in Markham, cupping therapy is used as part of a structured care plan to address various musculoskeletal concerns.',
    benefits: ['Improved circulation', 'Reduced muscle tension', 'Enhanced mobility', 'Relaxation effect'],
    whoCanBenefit: ['People with tight or restricted muscles in the back, shoulders or neck', 'Athletes recovering after intense physical activity', 'Those with postural discomfort from desk work', 'Individuals with ongoing chronic aches'],
    conditionsTreated: ['Muscle tightness and stiffness', 'Sports-related strain', 'Postural discomfort', 'Chronic aches'],
    treatmentProcess: ['Initial assessment to confirm suitability', 'Application of cups with suction via pump or heat', '10–20 minute session, stationary or moving cups', 'Aftercare guidance for temporary skin marks'],
  },
  {
    slug: 'dry-needling',
    description:
      'If you’re dealing with persistent muscle tightness or movement limitations, dry needling can support recovery and improve how your body functions. At Remarkable Physiotherapy in Markham, thin, sterile needles are inserted into trigger points within muscles to release tension, improve circulation, and encourage normal muscle function, always combined with movement training and manual therapy.',
    benefits: ['Reduced muscle tightness', 'Improved blood flow to the affected area', 'Support for natural tissue repair', 'Restored range of motion'],
    whoCanBenefit: ['Active individuals and athletes managing muscle strain', 'People with repetitive movement injuries', 'Those with headaches linked to muscle tightness'],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Sports-related strain', 'Repetitive movement injuries', 'Headaches linked to muscle tightness', 'Hip or leg stiffness'],
    treatmentProcess: ['Initial assessment of movement, posture and muscle condition', 'Dry needling combined with other techniques as needed', 'Ongoing monitoring and home exercise guidance'],
  },
  {
    slug: 'spinal-manipulation-adjustment',
    description:
      'Spinal manipulation/adjustment is a hands-on approach focused on improving the mobility of the spine and supporting overall musculoskeletal function. At Remarkable Physiotherapy in Markham, this service addresses stiffness, restricted movement, and discomfort that may arise from daily strain, injuries, or long periods of inactivity, using controlled, precise movements applied to specific spinal joints.',
    benefits: ['Improved mobility', 'Reduced muscle tension', 'Better posture', 'Support for active lifestyles'],
    whoCanBenefit: ['People with back discomfort or neck stiffness', 'Those with tension-related headaches', 'People recovering from sports incidents, workplace strain or minor accidents'],
    conditionsTreated: ['Back discomfort', 'Neck stiffness', 'Tension headaches', 'Poor posture', 'Limited range of motion', 'Muscle tightness'],
    treatmentProcess: ['Initial assessment of history, posture and movement', 'Gentle, controlled adjustments to specific joints', 'Review of response and posture guidance between visits'],
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

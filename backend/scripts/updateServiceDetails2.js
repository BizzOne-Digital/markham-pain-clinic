// Second batch of full detail-page content, matching remarkablephysio.com.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const DETAILS = [
  {
    slug: 'electrotherapeutic-modalities',
    description:
      'Electrotherapeutic modalities are widely used in physiotherapy to support recovery, reduce discomfort, and improve muscle and nerve function. At Remarkable Physiotherapy we use advanced electrotherapy techniques — including TENS, EMS, interferential current therapy, ultrasound and laser therapy — as part of a structured treatment plan to help individuals return to daily activities with confidence.',
    benefits: ['Non-invasive and safe', 'Can be combined with exercise and manual techniques', 'Helps activate muscles that are difficult to engage', 'Supports faster return to daily activities'],
    whoCanBenefit: ['People with ongoing muscle or joint discomfort', 'Those recovering from an injury or surgery', 'People with reduced muscle strength or activation', 'Anyone wanting to improve mobility and function'],
    conditionsTreated: ['Back and neck discomfort', 'Sports-related injuries', 'Joint conditions such as arthritis', 'Muscle strains and ligament sprains', 'Post-surgical rehabilitation', 'Nerve-related conditions like sciatica'],
    treatmentProcess: ['Assessment of symptoms and movement patterns', 'Electrodes or applicators placed on the skin', '10–30 minute session with adjusted intensity', 'Combined with exercise and manual techniques'],
  },
  {
    slug: 'vestibular-therapy',
    description:
      'If you often feel dizzy, unsteady, or experience spinning sensations, it can interfere with daily activities and reduce confidence in movement. Vestibular therapy focuses on the inner ear system and its connection to balance and spatial awareness, using specific exercises to retrain the brain and body to work together more efficiently. At Remarkable Physiotherapy, we provide structured care plans to help individuals return to stable, comfortable movement.',
    benefits: ['Reduced dizziness and vertigo episodes', 'Improved balance and coordination', 'Increased confidence while walking or moving', 'Better focus and visual stability', 'Lower risk of falls'],
    whoCanBenefit: ['Adults with balance issues', 'Individuals recovering from concussion', 'People with inner ear disorders'],
    conditionsTreated: ['Vertigo (spinning sensations)', 'Benign Paroxysmal Positional Vertigo (BPPV)', 'Balance disorders', 'Inner ear dysfunction', 'Concussion-related dizziness', 'Unsteadiness while walking'],
    treatmentProcess: ['Detailed evaluation of symptoms and movement patterns', 'Eye and head coordination exercises', 'Balance retraining and gaze stabilization', 'Gradual progression as symptoms improve'],
  },
  {
    slug: 'return-to-work-play',
    description:
      'Returning to your daily routine after an injury can feel overwhelming. Whether your goal is getting back to your job, sport, or active lifestyle, having the right support makes a significant difference. At Remarkable Physiotherapy, our return-to-work/play program focuses on helping you rebuild strength, restore movement, and regain confidence so you can step back into your routine safely.',
    benefits: ['Restored mobility and strength', 'Improved coordination and endurance', 'Reduced risk of re-injury', 'Body prepared for specific physical demands'],
    whoCanBenefit: ['Injured workers returning to job-specific tasks', 'Athletes and active individuals returning to training or competition', 'Post-surgery patients needing gradual reconditioning'],
    conditionsTreated: ['Muscle and joint injuries', 'Workplace strain injuries', 'Sports-related injuries', 'Post-surgical recovery', 'Repetitive stress conditions'],
    treatmentProcess: ['Initial assessment of movement, strength and goals', 'Goal-oriented, functional movement planning', 'Progressive strength, balance and sport/work-specific training', 'Ongoing monitoring and adjustment'],
  },
  {
    slug: 'myofascial-release',
    description:
      'Tight muscles, lingering soreness, and limited movement can affect your daily routine more than you might expect. At Remarkable Physiotherapy, myofascial release is used to address these concerns by focusing on the fascia — the connective tissue that surrounds and supports your muscles — using sustained, gentle pressure to ease tension and improve mobility.',
    benefits: ['Improved mobility', 'Reduced muscle tension', 'Support for injury recovery', 'Better posture', 'Relief from chronic discomfort'],
    whoCanBenefit: ['Desk workers with tension from long hours sitting', 'People in physical work or sports', 'Anyone with scar tissue or repetitive strain restrictions'],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Sports-related strain', 'Headaches linked to muscle tightness', 'Postural imbalances', 'Repetitive strain injuries', 'Scar tissue restrictions'],
    treatmentProcess: ['Assessment of condition and movement patterns', 'Sustained, gentle pressure applied to restricted areas', 'Combined with stretching or strengthening as needed'],
  },
  {
    slug: 'therapeutic-exercise',
    description:
      'Therapeutic exercise plays a key role in improving movement, building strength, and supporting recovery from injury or physical strain. At Remarkable Physiotherapy, this service uses structured, goal-focused movement programs — stretching, strengthening, balance training and functional drills — tailored to your condition, physical ability, and goals.',
    benefits: ['Targeted strength development', 'Improved mobility and flexibility', 'Injury prevention', 'Better posture and alignment'],
    whoCanBenefit: ['People with musculoskeletal issues like back pain or joint discomfort', 'Post-surgical patients rebuilding strength', 'Athletes returning from sports injuries', 'People managing chronic conditions like arthritis'],
    conditionsTreated: ['Back pain and neck stiffness', 'Joint discomfort', 'Post-surgical deconditioning', 'Sports injuries', 'Arthritis and repetitive strain injuries'],
    treatmentProcess: ['Detailed assessment of movement, strength and limitations', 'Individual exercise plan development', 'Guided practice with supervision and adjustment', 'Home program to maintain progress'],
  },
  {
    slug: 'trigger-point-release',
    description:
      'Is muscle tightness and persistent soreness disrupting your daily life or limiting your movement? Trigger point release offers a focused manual therapy approach that targets specific tight knots within muscle tissue. At Remarkable Physiotherapy in Markham, sustained pressure is applied to these points to relax muscle fibres, improve circulation, and reduce both local and referred discomfort.',
    benefits: ['Reduced muscle tension', 'Improved mobility', 'Enhanced circulation', 'Easier, more efficient daily movement'],
    whoCanBenefit: ['People with neck and shoulder tension from posture or stress', 'Athletes with sports-related muscle tightness', 'Anyone with tension headaches or repetitive strain'],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Tension headaches', 'Sports-related muscle tightness', 'Postural strain', 'Repetitive strain issues'],
    treatmentProcess: ['Assessment of symptoms and movement patterns', 'Palpation to locate trigger points', 'Steady pressure applied to release tension', 'Guided stretching and aftercare advice'],
  },
  {
    slug: 'dancer-rehabilitation',
    description:
      'Dancers place unique demands on their bodies, combining strength, flexibility, and precision in every movement. At Remarkable Physiotherapy, our dancer rehabilitation service focuses on helping performers recover from injuries, improve movement patterns, and return to the studio with confidence, accounting for the technical demands of turnout, pointe work, jumps and floor transitions.',
    benefits: ['Improved strength and control in dance-specific movements', 'Enhanced flexibility without compromising stability', 'Reduced risk of recurring injuries', 'Greater awareness of body alignment and technique'],
    whoCanBenefit: ['Pre-professional and professional dancers', 'Recreational dancers', 'Dance students building strong movement habits early'],
    conditionsTreated: ['Overuse injuries (tendon irritation, shin discomfort)', 'Ankle and foot problems', 'Hip and knee concerns from turnout and pliés', 'Lower back strain', 'Muscle imbalances'],
    treatmentProcess: ['Thorough assessment of technique, strength and flexibility', 'Movement-focused, whole-body treatment', 'Dance-specific strengthening exercises', 'Gradual, staged return to rehearsal and performance'],
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

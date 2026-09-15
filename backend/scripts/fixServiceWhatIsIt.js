// Moves the duplicate "What Is X" entry out of howItWorks (where it was
// clashing with the page's own "What is X?" heading, which was showing a
// short one-liner instead) into a dedicated whatIsIt field.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const WHAT_IS_IT = {
  'physiotherapy': 'Physiotherapy is a hands-on, movement-based approach that supports recovery, mobility, and physical function. It looks at how your body moves and identifies areas that need attention, such as weak muscles, tight joints, or poor posture habits.',
  'chiropractic-care': 'Chiropractic Care is a hands-on approach that focuses on assessing and addressing joint and spine function. It often includes gentle adjustments, joint mobilization, and soft-tissue techniques to improve alignment and movement.',
  'massage-therapy': 'Massage Therapy is a hands-on treatment that works on muscles, connective tissues, and joints. It involves a range of techniques, such as kneading, stretching, and applying pressure, to reduce stiffness and improve movement.',
  'acupuncture': 'Acupuncture is a technique rooted in traditional Chinese practices, now widely used in contemporary clinical settings. It involves inserting very thin needles into targeted areas of the body to activate natural processes.',
  'manual-therapy': 'Manual therapy is a hands-on approach used by physiotherapists to assess and treat muscles, joints, and soft tissues. It involves skilled movements such as joint mobilization, soft-tissue work, stretching, and manipulation techniques to improve movement and reduce discomfort.',
  'cupping-therapy': 'Cupping therapy is a hands-on technique that uses suction cups placed on the skin to create a gentle vacuum effect. This helps stimulate blood flow, ease muscle tightness, and support the body’s natural recovery process.',
  'dry-needling': 'Dry needling is a technique that uses thin, sterile needles inserted into specific points within muscles, often referred to as trigger points, where muscle fibres have become tight or irritated, leading to discomfort, stiffness, or restricted motion.',
  'spinal-manipulation-adjustment': 'Spinal manipulation/adjustment involves controlled, precise movements applied to specific joints in the spine. These movements are performed by trained practitioners to improve joint mobility and reduce tension in surrounding tissues.',
  'electrotherapeutic-modalities': 'Electrotherapeutic modalities use electrical energy to stimulate tissues in the body. These techniques are non-invasive and are commonly used to address a variety of musculoskeletal and neurological conditions.',
  'vestibular-therapy': 'Vestibular therapy is a form of physiotherapy that focuses on the inner ear system and its connection to balance and spatial awareness. When this system is disrupted, it can lead to dizziness, vertigo, blurred vision, and difficulty maintaining posture.',
  'return-to-work-play': 'Return to work/play is a structured rehabilitation program designed to help individuals transition from recovery to full activity. It bridges the gap between initial treatment and real-life demands — whether that means lifting at work, running on the field, or handling repetitive tasks.',
  'myofascial-release': 'Myofascial release is a hands-on therapy that targets the fascia — a thin layer of connective tissue that wraps around muscles, joints, and organs. When fascia becomes tight or restricted due to injury, stress, or repetitive strain, it can lead to discomfort and reduced flexibility.',
  'therapeutic-exercise': 'Therapeutic exercise refers to a series of planned physical activities created to improve strength, flexibility, balance, coordination, and endurance. These exercises are not random workouts — they are carefully selected based on your condition, physical ability, and goals.',
  'trigger-point-release': 'Trigger point release is a hands-on therapy that focuses on small, tight knots within muscles. These knots can develop due to overuse, injury, poor posture, or stress. When pressure is applied, it helps relax the muscle fibres, improve circulation, and reduce tension in surrounding tissues.',
  'dancer-rehabilitation': 'Dancer rehabilitation is a focused approach to recovery and performance care, specifically designed for individuals involved in dance. Whether you are trained in ballet, contemporary, hip-hop, or other styles, your body experiences repetitive stress that can lead to strain or injury over time.',
  'psychological-services': 'Psychological Services focus on assessing and addressing emotional, behavioural, and cognitive concerns. These services are provided by a trained psychologist who works with you to identify patterns, understand challenges, and develop practical strategies to manage them.',
  'mckenzie-method': 'The McKenzie method, also known as Mechanical Diagnosis and Therapy (MDT), is a globally recognized system of assessment and treatment focused on identifying the root cause of pain rather than simply addressing symptoms.',
  'deep-tissue-massage': 'Deep tissue massage is a hands-on technique that targets deeper muscle layers using slow, controlled pressure. Unlike lighter forms of massage, this approach works through tension that builds up over time due to stress, repetitive movements, or physical strain.',
  'soft-tissue-release': 'Soft tissue release focuses on muscles, ligaments, and fascia, the connective tissues that support your body. Over time, these tissues can become tight or restricted due to injury, repetitive motion, or poor posture, leading to stiffness, reduced mobility, and ongoing discomfort.',
  'relaxation-method': 'The relaxation method is a structured approach that uses gentle techniques to ease muscle tension, regulate breathing, and promote a calmer state of mind. It involves guided strategies that help your body shift away from constant stress and into a more balanced state.',
};

async function run() {
  await connectDB();
  let updated = 0;
  for (const [slug, whatIsIt] of Object.entries(WHAT_IS_IT)) {
    const service = await Service.findOne({ slug });
    if (!service) {
      console.log('No service found for slug:', slug);
      continue;
    }
    service.whatIsIt = whatIsIt;
    // Drop the first howItWorks entry if it's the duplicate "What Is X"-style title
    if (service.howItWorks?.[0] && /^(What Is|What Are|How .* Works)\b/i.test(service.howItWorks[0].title)) {
      service.howItWorks = service.howItWorks.slice(1);
    }
    await service.save();
    updated++;
  }
  console.log(`Updated whatIsIt for ${updated}/${Object.keys(WHAT_IS_IT).length} services`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

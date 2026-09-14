// One-off content refresh: replaces Team, Service and Condition collections
// with Remarkable Physiotherapy's real content (previously only updated in
// the frontend's offline placeholder data, which the live site does not use
// once the API returns real records).
require('dotenv').config();
const connectDB = require('../config/db');
const TeamMember = require('../models/TeamMember');
const Service = require('../models/Service');
const Condition = require('../models/Condition');
const { generateUniqueSlug } = require('../utils/slugify');

const AVATAR = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D9C6A5&color=2B2118&size=400`;

const TEAM = [
  { name: 'Shyamli Patel', designation: 'Registered Physiotherapist', seniorTitle: 'Sr. Registered Physiotherapist', yearsExperience: 7, specialization: 'Physiotherapy', image: { secure_url: '/team2.jpg', public_id: '' }, qualifications: ['Registered Physiotherapist'], bio: 'Shyamli has 7 years of experience helping patients recover movement and function through personalized physiotherapy.', expertise: ['Physiotherapy', 'Manual Therapy', 'Rehabilitation'], philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.' },
  { name: 'Dr. James Pascual', designation: 'Chiropractor', seniorTitle: 'Chiropractor', yearsExperience: 25, specialization: 'Sciatica', image: { secure_url: '/Dr.-James-scaled-1.jpg', public_id: '' }, qualifications: ['Chiropractor'], bio: 'Dr. Pascual brings 25 years of experience in spine, joint and mobility-focused chiropractic care.', expertise: ['Chiropractic Care', 'Spinal Manipulation', 'Mobility'], philosophy: 'I believe recovery is a partnership — every plan is built around the patient’s goals, not a generic protocol.' },
  { name: 'Jason Li', designation: 'Massage Therapist', seniorTitle: 'Massage Therapist', yearsExperience: 13, specialization: 'Myofascial Release', image: { secure_url: '/team5.jpg', public_id: '' }, qualifications: ['Registered Massage Therapist'], bio: 'Jason has 13 years of experience providing massage therapy for muscle tension and relaxation support.', expertise: ['Massage Therapy', 'Deep Tissue Massage', 'Relaxation Method'], philosophy: 'Pain relief should be holistic — treating the whole person, not just the symptom.' },
  { name: 'Monali Chhodvadiya', designation: 'Registered Physiotherapist', seniorTitle: 'Registered Physiotherapist', yearsExperience: 4, specialization: 'Musculoskeletal Conditions', image: { secure_url: AVATAR('Monali Chhodvadiya'), public_id: '' }, qualifications: ['Registered Physiotherapist'], bio: 'Monali has 4 years of experience treating musculoskeletal conditions with personalized physiotherapy.', expertise: ['Physiotherapy', 'Musculoskeletal Conditions'], philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.' },
  { name: 'Deena Paul', designation: 'Physiotherapy Assistant', seniorTitle: 'Physiotherapy Assistant', yearsExperience: 5, specialization: 'Fibromyalgia', image: { secure_url: AVATAR('Deena Paul'), public_id: '' }, qualifications: ['Physiotherapy Assistant'], bio: 'Deena has 5+ years of experience supporting patients managing fibromyalgia and chronic pain.', expertise: ['Physiotherapy', 'Fibromyalgia'], philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.' },
  { name: 'Dharini Vaghela', designation: 'Resident Physiotherapist', seniorTitle: 'Registered Physiotherapist', yearsExperience: 4, specialization: 'Resident Physiotherapist', image: { secure_url: AVATAR('Dharini Vaghela'), public_id: '' }, qualifications: ['Resident Physiotherapist'], bio: 'Dharini has 4+ years of experience as a resident physiotherapist.', expertise: ['Physiotherapy'], philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.' },
  { name: 'Harshdeep Patel', designation: 'Resident Physiotherapist', seniorTitle: 'Resident Physiotherapist', yearsExperience: 4, specialization: 'Resident Physiotherapist', image: { secure_url: AVATAR('Harshdeep Patel'), public_id: '' }, qualifications: ['Resident Physiotherapist'], bio: 'Harshdeep has 4+ years of experience as a resident physiotherapist.', expertise: ['Physiotherapy'], philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.' },
  { name: 'Dr. Maryam Hatamian', designation: 'Chiropractor', seniorTitle: 'Chiropractor', yearsExperience: 18, specialization: 'Back Pain', image: { secure_url: AVATAR('Maryam Hatamian'), public_id: '' }, qualifications: ['Chiropractor'], bio: 'Dr. Hatamian brings 18+ years of experience in chiropractic care with a focus on back pain.', expertise: ['Chiropractic Care', 'Back Pain'], philosophy: 'I believe recovery is a partnership — every plan is built around the patient’s goals, not a generic protocol.' },
  { name: 'Selam Haile', designation: 'Registered Massage Therapist', seniorTitle: 'Registered Massage Therapist', yearsExperience: 2, specialization: 'Massage Therapy', image: { secure_url: AVATAR('Selam Haile'), public_id: '' }, qualifications: ['Registered Massage Therapist'], bio: 'Selam has 2+ years of experience providing registered massage therapy.', expertise: ['Massage Therapy'], philosophy: 'Pain relief should be holistic — treating the whole person, not just the symptom.' },
  { name: 'Luting Zheng', designation: 'Physiotherapist', seniorTitle: 'Physiotherapist', yearsExperience: 7, specialization: 'Sports Injuries', image: { secure_url: AVATAR('Luting Zheng'), public_id: '' }, qualifications: ['Physiotherapist'], bio: 'Luting has 7+ years of experience treating sports injuries through physiotherapy.', expertise: ['Physiotherapy', 'Sports Injuries'], philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.' },
  { name: 'Tahira Jibeen', designation: 'Clinical Psychologist', seniorTitle: 'Clinical Psychologist', yearsExperience: null, specialization: 'Cognitive Behavioral Therapy', image: { secure_url: AVATAR('Tahira Jibeen'), public_id: '' }, qualifications: ['Clinical Psychologist'], bio: 'Tahira provides cognitive behavioral therapy to support mental and emotional well-being.', expertise: ['Psychological Services', 'Cognitive Behavioral Therapy'], philosophy: 'Mental and emotional health play a major role in how you move, think, and live each day.' },
  { name: 'Kamlesh Patel', designation: 'Psychotherapist / Registered Social Worker', seniorTitle: 'Psychotherapist', yearsExperience: 18, specialization: 'Psychotherapy', image: { secure_url: AVATAR('Kamlesh Patel'), public_id: '' }, qualifications: ['Psychotherapist', 'Registered Social Worker'], bio: 'Kamlesh has 18 years of experience as a psychotherapist and registered social worker.', expertise: ['Psychological Services'], philosophy: 'Mental and emotional health play a major role in how you move, think, and live each day.' },
  { name: 'Anju Patel', designation: 'Clinic Administrator', seniorTitle: 'Clinic Administrator', yearsExperience: 6, specialization: 'Clinic Operations', image: { secure_url: AVATAR('Anju Patel'), public_id: '' }, qualifications: ['Clinic Administrator'], bio: 'Anju has 6+ years of experience managing clinic operations and patient coordination.', expertise: ['Clinic Operations'], philosophy: 'A smooth, welcoming visit starts before you even walk through the door.' },
  { name: 'Foram Patel', designation: 'Physiotherapy Assistant', seniorTitle: 'Physiotherapy Assistant', yearsExperience: 3, specialization: 'Rehabilitation', image: { secure_url: AVATAR('Foram Patel'), public_id: '' }, qualifications: ['Physiotherapy Assistant'], bio: 'Foram has 3+ years of experience supporting rehabilitation programs.', expertise: ['Physiotherapy', 'Rehabilitation'], philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.' },
];

const SERVICES = [
  { title: 'Physiotherapy', shortDescription: 'Movement, strength and recovery support.', description: 'Living with discomfort, stiffness, or limited movement can affect every part of your routine. At Remarkable Physiotherapy, the focus is on helping you move with ease, restore strength, and return to the activities that matter to you.' },
  { title: 'Chiropractic Care', shortDescription: 'Spine, joint and mobility-focused care.', description: 'Chiropractic Care focuses on the relationship between the spine, joints, and the nervous system. When alignment issues occur, they can affect how your body moves and feels during daily activities.' },
  { title: 'Massage Therapy', shortDescription: 'Muscle tension and relaxation support.', description: 'When daily stress, muscle tension, or physical strain begin to interfere with your routine, Massage Therapy can play a valuable role in restoring balance.' },
  { title: 'Acupuncture', shortDescription: 'Fine-needle stimulation of selected points.', description: 'Acupuncture is a time-tested therapy that aims to restore balance in the body by stimulating specific points with fine needles.' },
  { title: 'Manual Therapy', shortDescription: 'Hands-on muscle, joint and tissue techniques.', description: 'Manual therapy is a hands-on approach used by physiotherapists to assess and treat muscles, joints, and soft tissues.' },
  { title: 'Cupping Therapy', shortDescription: 'Suction-cup technique for soft tissues.', description: 'Cupping therapy is a hands-on technique that uses suction cups placed on the skin to create a gentle vacuum effect.' },
  { title: 'Dry Needling', shortDescription: 'Targeted support for tight muscles.', description: 'If you’re dealing with persistent muscle tightness or movement limitations, dry needling can support recovery and improve how your body functions.' },
  { title: 'Spinal Manipulation / Adjustment', shortDescription: 'Mobility-focused spinal joint approach.', description: 'Spinal manipulation/adjustment is a hands-on approach focused on improving the mobility of the spine and supporting overall musculoskeletal function.' },
  { title: 'Electrotherapeutic Modalities', shortDescription: 'Electrical modalities used in rehabilitation.', description: 'Electrotherapeutic modalities are widely used in physiotherapy to support recovery, reduce discomfort, and improve muscle and nerve function.' },
  { title: 'Vestibular Therapy', shortDescription: 'Support for dizziness and balance concerns.', description: 'If you often feel dizzy, unsteady, or experience spinning sensations, it can interfere with daily activities and reduce confidence in movement.' },
  { title: 'Return to Work / Play', shortDescription: 'Structured return to activity after injury.', description: 'Returning to your daily routine after an injury can feel overwhelming. Whether your goal is getting back to your job, sport, or active lifestyle, having the right support makes a significant difference.' },
  { title: 'Myofascial Release', shortDescription: 'Hands-on work for tightness and mobility.', description: 'Tight muscles, lingering soreness, and limited movement can affect your daily routine more than you might expect.' },
  { title: 'Therapeutic Exercise', shortDescription: 'Guided strength and movement programs.', description: 'Therapeutic exercise plays a key role in improving movement, building strength, and supporting recovery from injury or physical strain.' },
  { title: 'Trigger Point Release', shortDescription: 'Focused manual work on trigger points.', description: 'Is muscle tightness and persistent soreness disrupting your daily life or limiting your movement? Trigger point release offers a focused manual therapy approach that targets specific areas of muscle tissue known as trigger points.' },
  { title: 'Dancer Rehabilitation', shortDescription: 'Rehabilitation tailored to dance demands.', description: 'Dancers place unique demands on their bodies, combining strength, flexibility, and precision in every movement.' },
  { title: 'Psychological Services', shortDescription: 'Mental and emotional wellness support.', description: 'Mental and emotional health play a major role in how you move, think, and live each day.' },
  { title: 'McKenzie Method', shortDescription: 'Movement-based approach for spine and joints.', description: 'If you are dealing with ongoing back, neck, or joint discomfort, finding the right approach can make a significant difference in how you move and function each day.' },
  { title: 'Deep Tissue Massage', shortDescription: 'Deeper pressure for persistent tightness.', description: 'If persistent muscle tightness or stiffness is interfering with your daily routine, deep tissue massage can play a key role in restoring movement and easing discomfort.' },
  { title: 'Soft Tissue Release', shortDescription: 'Hands-on work for restricted soft tissues.', description: 'Soft tissue release is a hands-on technique used to address tight muscles, restricted movement, and discomfort caused by everyday strain, sports activity, or prolonged sitting.' },
  { title: 'Relaxation Method', shortDescription: 'Stress and physical tension support.', description: 'Finding time to unwind has become increasingly difficult in a fast-paced city. Ongoing stress, physical tension, and mental fatigue can gradually affect how your body feels and performs.' },
];

const CONDITIONS = [
  { name: 'WSIB Injuries' },
  { name: 'Motor Vehicle Accident Injuries', description: 'Motor vehicle accident injuries can disrupt daily life in both immediate and long-lasting ways.' },
  { name: 'Fibromyalgia Treatment', description: 'Fibromyalgia is a complex condition that affects how the body processes pain signals, leading to widespread discomfort.' },
  { name: 'Dizziness Treatment', description: 'Dizziness can interfere with everyday activities, making simple movements like walking, turning your head, or even standing up feel unsteady.' },
  { name: 'Chronic Pain', description: 'Living with chronic pain can affect every part of your daily life, from work and sleep to movement and mood.' },
  { name: 'Balance Disorder', description: 'Balance plays a vital role in everyday life, from simple movements like walking to more complex activities such as exercising.' },
  { name: 'Hand Pain', description: 'Hand pain can make even simple daily tasks feel difficult. From typing and writing to lifting objects or gripping tools, discomfort can get in the way.' },
  { name: 'Elbow Pain' },
  { name: 'Ankle Pain' },
  { name: 'Dance Injuries' },
  { name: 'Hip Pain' },
  { name: 'Sciatica Pain' },
  { name: 'Headaches' },
  { name: 'Vertigo' },
  { name: 'Concussions' },
  { name: 'Gait Disorders' },
  { name: 'Arthritis Treatment' },
  { name: 'Wrist Pain' },
  { name: 'Shoulder Pain' },
  { name: 'Foot Pain' },
  { name: 'Knee Pain' },
  { name: 'Neck Pain' },
  { name: 'Back Pain' },
];

async function run() {
  await connectDB();

  await TeamMember.deleteMany({});
  for (let i = 0; i < TEAM.length; i++) {
    const slug = await generateUniqueSlug(TeamMember, TEAM[i].name);
    await TeamMember.create({ ...TEAM[i], slug, order: i + 1 });
  }
  console.log(`TeamMember: replaced with ${TEAM.length} real staff members`);

  await Service.deleteMany({});
  for (let i = 0; i < SERVICES.length; i++) {
    const slug = await generateUniqueSlug(Service, SERVICES[i].title);
    await Service.create({ ...SERVICES[i], slug, order: i + 1 });
  }
  console.log(`Service: replaced with ${SERVICES.length} real services`);

  await Condition.deleteMany({});
  for (let i = 0; i < CONDITIONS.length; i++) {
    const slug = await generateUniqueSlug(Condition, CONDITIONS[i].name);
    await Condition.create({ ...CONDITIONS[i], slug, order: i + 1 });
  }
  console.log(`Condition: replaced with ${CONDITIONS.length} real conditions`);

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

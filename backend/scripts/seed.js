require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const WebsiteSettings = require('../models/WebsiteSettings');
const Homepage = require('../models/Homepage');
const Statistic = require('../models/Statistic');
const Service = require('../models/Service');
const TeamMember = require('../models/TeamMember');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');
const FAQ = require('../models/FAQ');
const Condition = require('../models/Condition');
const { generateUniqueSlug } = require('../utils/slugify');

const SERVICES = [
  {
    title: 'Physiotherapy',
    shortDescription: 'Restore movement and function with hands-on, personalized physiotherapy.',
    description:
      'Our physiotherapy program combines manual techniques, targeted exercise, and education to help you recover from injury, surgery, or chronic conditions and return to the activities you love.',
    image: { secure_url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    benefits: ['Reduced pain and inflammation', 'Improved mobility and strength', 'Faster, safer recovery', 'Lower risk of re-injury'],
    whoCanBenefit: ['Post-surgical patients', 'People with sports injuries', 'Those with chronic back or joint pain', 'Anyone recovering from an accident'],
    conditionsTreated: ['Back pain', 'Neck pain', 'Shoulder injuries', 'Knee pain', 'Post-surgical rehab'],
    treatmentProcess: ['Initial assessment', 'Personalized treatment plan', 'Hands-on therapy & exercise', 'Progress tracking & adjustment'],
    order: 1,
  },
  {
    title: 'Acupuncture & Dry Needling',
    shortDescription: 'Targeted needling therapy to relieve muscle tension and chronic pain.',
    description:
      'Acupuncture and dry needling target trigger points and meridian pathways to relieve muscular tension, improve circulation, and accelerate the body’s natural healing response.',
    image: { secure_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    benefits: ['Relief from muscle tightness', 'Reduced chronic pain', 'Improved circulation', 'Complements other therapies'],
    whoCanBenefit: ['Chronic pain sufferers', 'Athletes with tight muscles', 'People with tension headaches', 'Those seeking drug-free relief'],
    conditionsTreated: ['Migraines', 'Muscle strains', 'Fibromyalgia', 'Sciatica'],
    treatmentProcess: ['Consultation & assessment', 'Point/trigger mapping', 'Needling session', 'Aftercare guidance'],
    order: 2,
  },
  {
    title: 'Chronic Pain Management',
    shortDescription: 'A whole-person approach to managing long-term and persistent pain.',
    description:
      'We help patients living with chronic pain build sustainable, long-term relief through a combination of manual therapy, movement retraining, and lifestyle strategies.',
    image: { secure_url: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    benefits: ['Reduced reliance on medication', 'Improved daily function', 'Better sleep and mood', 'Long-term self-management tools'],
    whoCanBenefit: ['People with arthritis', 'Fibromyalgia patients', 'Long-term back or joint pain sufferers', 'Post-injury chronic pain'],
    conditionsTreated: ['Arthritis', 'Fibromyalgia', 'Chronic low back pain', 'Nerve pain'],
    treatmentProcess: ['Comprehensive evaluation', 'Multi-modal plan design', 'Ongoing therapy', 'Lifestyle & self-care coaching'],
    order: 3,
  },
  {
    title: 'Sports Injury Rehabilitation',
    shortDescription: 'Get back in the game with sport-specific rehab and injury prevention.',
    description:
      'From sprains to ligament tears, our sports rehabilitation programs are designed to safely restore strength, agility, and confidence so athletes can return to peak performance.',
    image: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    benefits: ['Faster return to sport', 'Reduced re-injury risk', 'Sport-specific strengthening', 'Performance optimization'],
    whoCanBenefit: ['Competitive athletes', 'Weekend warriors', 'Youth sports players', 'Anyone with an activity-related injury'],
    conditionsTreated: ['ACL/MCL injuries', 'Ankle sprains', 'Tennis/golfer’s elbow', 'Muscle tears'],
    treatmentProcess: ['Injury assessment', 'Phased rehab plan', 'Strength & agility training', 'Return-to-sport clearance'],
    order: 4,
  },
  {
    title: 'Manual Therapy',
    shortDescription: 'Hands-on joint and soft tissue techniques to relieve pain and stiffness.',
    description:
      'Our skilled therapists use hands-on mobilization, manipulation, and soft tissue techniques to reduce pain, improve joint mechanics, and restore normal movement patterns.',
    image: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    benefits: ['Immediate relief from stiffness', 'Improved joint mobility', 'Reduced muscle tension', 'Enhanced treatment outcomes'],
    whoCanBenefit: ['People with joint stiffness', 'Postural pain sufferers', 'Those recovering from injury', 'Desk workers with tension'],
    conditionsTreated: ['Joint stiffness', 'Postural dysfunction', 'Muscle spasm', 'Frozen shoulder'],
    treatmentProcess: ['Postural & joint assessment', 'Manual mobilization', 'Corrective exercise', 'Home care plan'],
    order: 5,
  },
];

const TEAM = [
  {
    name: 'Dr. Sarah Bennett',
    designation: 'Lead Physiotherapist',
    specialization: 'Sports Rehabilitation',
    image: { secure_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop', public_id: '' },
    qualifications: ['DPT, University of Toronto', 'Certified Sports Physiotherapist'],
    bio: 'Dr. Bennett has over 12 years of experience helping athletes and everyday patients recover from injury and return to full function.',
    expertise: ['Sports Injuries', 'Manual Therapy', 'Post-Surgical Rehab'],
    philosophy: 'I believe recovery is a partnership — every plan is built around the patient’s goals, not a generic protocol.',
    order: 1,
  },
  {
    name: 'Michael Chen',
    designation: 'Registered Acupuncturist',
    specialization: 'Acupuncture & Dry Needling',
    image: { secure_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop', public_id: '' },
    qualifications: ['R.Ac, CMAAC Certified', 'Advanced Dry Needling Certification'],
    bio: 'Michael blends traditional acupuncture with modern dry needling techniques to relieve chronic tension and pain.',
    expertise: ['Chronic Pain', 'Migraines', 'Muscle Tension'],
    philosophy: 'Pain relief should be holistic — treating the whole person, not just the symptom.',
    order: 2,
  },
  {
    name: 'Jessica Thompson',
    designation: 'Registered Physiotherapist',
    specialization: 'Chronic Pain Management',
    image: { secure_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop', public_id: '' },
    qualifications: ['MScPT, McMaster University', 'Chronic Pain Management Certificate'],
    bio: 'Jessica specializes in helping patients with long-standing pain regain confidence and independence in daily life.',
    expertise: ['Chronic Pain', 'Fibromyalgia', 'Arthritis Management'],
    philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.',
    order: 3,
  },
];

const TESTIMONIALS = [
  {
    name: 'Amanda K.',
    message: 'After months of chronic back pain, the team at Markham Pain Clinic finally gave me a plan that worked. I am pain-free and back to my morning runs.',
    rating: 5,
    serviceCategory: 'Physiotherapy',
    status: 'published',
    order: 1,
  },
  {
    name: 'David R.',
    message: 'Professional, caring, and genuinely invested in my recovery. My shoulder injury healed faster than I expected.',
    rating: 5,
    serviceCategory: 'Sports Injury Rehabilitation',
    status: 'published',
    order: 2,
  },
  {
    name: 'Priya S.',
    message: 'The acupuncture sessions completely changed how I manage my migraines. Highly recommend this clinic to anyone in pain.',
    rating: 5,
    serviceCategory: 'Acupuncture & Dry Needling',
    status: 'published',
    order: 3,
  },
  {
    name: 'Tom H.',
    message: 'I appreciated how personalized every session felt. They listened, adjusted the plan, and got real results.',
    rating: 4,
    serviceCategory: 'Chronic Pain Management',
    status: 'published',
    order: 4,
  },
];

const BLOGS = [
  {
    title: '5 Signs You May Need Physiotherapy',
    categories: ['Physiotherapy'],
    excerpt: 'Persistent pain or stiffness could be signs your body needs professional attention. Here is what to watch for.',
    content:
      'Persistent pain, reduced range of motion, recurring injuries, poor posture, and slow recovery after activity are all signs that physiotherapy could help. Early intervention often leads to faster, more complete recovery than waiting for symptoms to worsen. Our team can assess your specific situation and design a plan tailored to your goals.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Understanding Chronic Pain: Causes and Coping Strategies',
    categories: ['Chronic Pain'],
    excerpt: 'Chronic pain affects millions. Learn about its causes and evidence-based ways to manage it long-term.',
    content:
      'Chronic pain is defined as pain lasting longer than three months and can stem from injury, illness, or unknown causes. Effective management often combines physical therapy, gentle movement, stress reduction, and professional guidance rather than relying on a single solution.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'The Science-Backed Benefits of Acupuncture',
    categories: ['Acupuncture'],
    excerpt: 'Acupuncture is more than tradition — modern research supports its role in pain management.',
    content:
      'Modern research shows acupuncture can stimulate the nervous system, release natural pain-relieving chemicals, and improve blood flow to affected areas. Combined with dry needling techniques, it is a powerful, drug-free option for many types of pain.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
];

const FAQS = [
  { question: 'Do I need a referral to book an appointment?', answer: 'No referral is required. You can book directly with us, though a referral from your doctor is welcome if you have one.', order: 1 },
  { question: 'What should I expect at my first appointment?', answer: 'Your first visit includes a thorough assessment of your condition, medical history review, and the start of a personalized treatment plan.', order: 2 },
  { question: 'How long is each treatment session?', answer: 'Most sessions run between 30 and 60 minutes depending on the treatment type and your individual plan.', order: 3 },
  { question: 'What conditions do you treat?', answer: 'We treat back and neck pain, sports injuries, chronic pain, joint issues, postural problems, and more.', order: 4 },
  { question: 'How many treatments will I need?', answer: 'This varies by condition and severity. Your therapist will discuss an estimated timeline after your initial assessment.', order: 5 },
  { question: 'Do you treat sports injuries?', answer: 'Yes, we offer dedicated sports injury rehabilitation programs for athletes of all levels.', order: 6 },
  { question: 'Can you help with chronic, long-term pain?', answer: 'Absolutely. We specialize in whole-person chronic pain management plans built for long-term results.', order: 7 },
  { question: 'How do I book an appointment?', answer: 'You can call us, email us, or use the contact form on this website and our team will reach out to schedule your visit.', order: 8 },
];

const EXTRA_SERVICE_NAMES = [
  'Chiropractic Care',
  'Massage Therapy',
  'Acupuncture',
  'Cupping Therapy',
  'Dry Needling',
  'Spinal Manipulation/Adjustment',
  'Electrotherapeutic Modalities',
  'Dancer Rehabilitation',
  'Myofascial Release',
  'Vestibular Therapy',
  'McKenzie Method',
  'Soft Tissue Release',
  'Relaxation Method',
  'Therapeutic Exercise',
  'Return to Work/Play',
  'Trigger Point Release',
  'Deep Tissue Massage',
  'Psychological Services',
];

const EXTRA_SERVICE_DETAILS = {
  'Chiropractic Care': {
    shortDescription: 'Spinal and joint adjustments to relieve pain and restore proper alignment.',
    description:
      'Our chiropractic care focuses on diagnosing and treating mechanical disorders of the musculoskeletal system, especially the spine. Through precise manual adjustments, we help correct alignment issues, relieve nerve pressure, and restore natural movement.',
    benefits: ['Improved spinal alignment', 'Reduced nerve irritation and pain', 'Better posture and joint mobility', 'Non-invasive, drug-free relief'],
    whoCanBenefit: ['People with chronic back or neck pain', 'Those with poor posture from desk work', 'Patients recovering from minor spinal misalignment', 'Anyone seeking preventative spinal care'],
    conditionsTreated: ['Lower back pain', 'Neck pain', 'Sciatica', 'Postural imbalance', 'Joint restrictions'],
    treatmentProcess: ['Postural and spinal assessment', 'Diagnostic testing if needed', 'Manual spinal adjustments', 'Home exercise and posture guidance'],
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop',
  },
  'Massage Therapy': {
    shortDescription: 'Therapeutic massage to relieve muscle tension, reduce stress, and improve circulation.',
    description:
      'Registered massage therapy uses hands-on soft tissue techniques to release tight muscles, reduce inflammation, and promote relaxation. It is often combined with physiotherapy for faster, more complete recovery.',
    benefits: ['Reduced muscle tension and knots', 'Improved blood circulation', 'Lower stress and better sleep', 'Faster recovery between treatments'],
    whoCanBenefit: ['People with chronic muscle tightness', 'Office workers with neck and shoulder tension', 'Athletes needing muscle recovery', 'Anyone under high physical or mental stress'],
    conditionsTreated: ['Muscle tension', 'Stress-related tightness', 'Neck and shoulder pain', 'Postural strain'],
    treatmentProcess: ['Initial consultation', 'Customized massage session', 'Targeted problem-area treatment', 'Aftercare and stretching advice'],
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
  },
  'Acupuncture': {
    shortDescription: 'Traditional needling technique to relieve pain and restore the body’s natural balance.',
    description:
      'Acupuncture involves inserting fine needles at specific points on the body to stimulate healing, reduce pain, and improve energy flow. It is widely used alongside physiotherapy for pain management and relaxation.',
    benefits: ['Natural pain relief', 'Reduced inflammation', 'Improved energy and relaxation', 'Complements other treatments well'],
    whoCanBenefit: ['Chronic pain sufferers', 'People seeking drug-free treatment options', 'Those with stress or tension-related symptoms', 'Patients with migraines or headaches'],
    conditionsTreated: ['Chronic pain', 'Migraines', 'Muscle tension', 'Stress and anxiety-related tension'],
    treatmentProcess: ['Consultation and health history review', 'Point selection based on symptoms', 'Needling session', 'Post-treatment care guidance'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
  },
  'Cupping Therapy': {
    shortDescription: 'Suction-based therapy to release muscle tightness and improve blood flow.',
    description:
      'Cupping therapy uses suction cups placed on the skin to lift soft tissue, boost circulation, and release deep muscle tension. It is commonly used to treat chronic tightness and support faster recovery.',
    benefits: ['Deep muscle tension release', 'Improved blood flow and healing', 'Reduced stiffness', 'Complements massage and physiotherapy'],
    whoCanBenefit: ['Athletes with tight muscles', 'People with chronic back or shoulder tension', 'Those recovering from overuse injuries', 'Anyone seeking deep tissue relief'],
    conditionsTreated: ['Muscle tightness', 'Back and shoulder tension', 'Poor circulation', 'Overuse injuries'],
    treatmentProcess: ['Assessment of affected areas', 'Cup placement and suction therapy', 'Post-treatment mobility check', 'Home care recommendations'],
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
  },
  'Dry Needling': {
    shortDescription: 'Precision needling to release trigger points and relieve deep muscle pain.',
    description:
      'Dry needling targets tight muscle knots (trigger points) using thin needles inserted directly into the affected tissue. This helps release tension, reduce pain, and restore normal muscle function quickly.',
    benefits: ['Fast trigger point release', 'Reduced muscle pain and tightness', 'Improved range of motion', 'Effective for stubborn chronic knots'],
    whoCanBenefit: ['People with persistent muscle knots', 'Athletes with overuse injuries', 'Those with tension headaches', 'Patients not responding to stretching alone'],
    conditionsTreated: ['Trigger points', 'Chronic muscle tightness', 'Tension headaches', 'Myofascial pain'],
    treatmentProcess: ['Trigger point identification', 'Needle insertion into affected muscle', 'Release and reassessment', 'Stretching and strengthening advice'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
  },
  'Spinal Manipulation/Adjustment': {
    shortDescription: 'Controlled manual force applied to spinal joints to restore mobility and relieve pain.',
    description:
      'Spinal manipulation uses precise, controlled adjustments to restore proper joint movement in the spine. It helps relieve pressure on nerves, reduce pain, and improve overall function.',
    benefits: ['Immediate relief from joint restriction', 'Reduced nerve compression', 'Improved spinal mobility', 'Better overall posture'],
    whoCanBenefit: ['People with restricted spinal movement', 'Those with nerve-related pain', 'Patients with postural dysfunction', 'Anyone with joint stiffness in the back or neck'],
    conditionsTreated: ['Spinal joint restriction', 'Sciatica', 'Lower back pain', 'Neck stiffness'],
    treatmentProcess: ['Spinal assessment', 'Targeted manual adjustment', 'Mobility re-evaluation', 'Follow-up care plan'],
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop',
  },
  'Electrotherapeutic Modalities': {
    shortDescription: 'Electrical stimulation therapies used to reduce pain and speed up healing.',
    description:
      'Electrotherapeutic modalities such as TENS and ultrasound use controlled electrical or sound energy to reduce pain, decrease inflammation, and stimulate tissue repair as part of a broader treatment plan.',
    benefits: ['Reduced pain signals', 'Decreased inflammation and swelling', 'Accelerated tissue healing', 'Non-invasive and painless'],
    whoCanBenefit: ['People with acute or chronic pain', 'Patients recovering from soft tissue injuries', 'Those with swelling or inflammation', 'Anyone seeking adjunct pain relief'],
    conditionsTreated: ['Acute injuries', 'Chronic pain', 'Inflammation', 'Soft tissue damage'],
    treatmentProcess: ['Assessment of injury/pain area', 'Selection of appropriate modality', 'Application during session', 'Integration with active rehab'],
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop',
  },
  'Dancer Rehabilitation': {
    shortDescription: 'Specialized rehab programs designed for the unique demands of dancers.',
    description:
      'Dancer rehabilitation addresses the specific biomechanical and flexibility demands of dance, helping performers recover from injury while maintaining strength, technique, and artistry.',
    benefits: ['Injury-specific recovery for dancers', 'Maintained flexibility and technique', 'Reduced re-injury risk', 'Faster return to performance'],
    whoCanBenefit: ['Professional and recreational dancers', 'Dance students', 'Performers recovering from strain or overuse injuries', 'Anyone with dance-related joint or muscle pain'],
    conditionsTreated: ['Ankle and foot injuries', 'Hip flexor strain', 'Overuse injuries', 'Muscle imbalances'],
    treatmentProcess: ['Movement and technique assessment', 'Injury-specific treatment plan', 'Strength and flexibility training', 'Gradual return to full performance'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
  },
  'Myofascial Release': {
    shortDescription: 'Gentle, sustained pressure techniques to release tightness in connective tissue.',
    description:
      'Myofascial release applies slow, sustained pressure to the fascia (connective tissue) to relieve restrictions, reduce pain, and restore freedom of movement throughout the body.',
    benefits: ['Reduced fascial restriction and pain', 'Improved flexibility and movement', 'Relief from chronic tightness', 'Complements manual therapy'],
    whoCanBenefit: ['People with chronic myofascial pain', 'Those with restricted movement patterns', 'Patients with postural imbalances', 'Anyone with widespread muscle tightness'],
    conditionsTreated: ['Myofascial pain syndrome', 'Chronic tightness', 'Postural dysfunction', 'Restricted mobility'],
    treatmentProcess: ['Assessment of fascial restrictions', 'Sustained pressure technique application', 'Movement re-testing', 'Home stretching plan'],
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
  },
  'Vestibular Therapy': {
    shortDescription: 'Specialized exercises to treat dizziness, balance issues, and vertigo.',
    description:
      'Vestibular therapy is a specialized form of rehabilitation designed to reduce dizziness, improve balance, and retrain the brain and inner ear to work together, helping patients regain stability and confidence.',
    benefits: ['Reduced dizziness and vertigo', 'Improved balance and stability', 'Lower fall risk', 'Increased confidence in daily movement'],
    whoCanBenefit: ['People with vertigo or dizziness', 'Those with balance disorders', 'Patients recovering from concussion', 'Older adults at risk of falls'],
    conditionsTreated: ['Vertigo', 'Balance disorders', 'Dizziness', 'Post-concussion imbalance'],
    treatmentProcess: ['Vestibular and balance assessment', 'Customized exercise program', 'Progressive balance training', 'Reassessment and plan adjustment'],
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop',
  },
  'McKenzie Method': {
    shortDescription: 'A structured assessment and exercise approach for spinal pain relief.',
    description:
      'The McKenzie Method uses repeated movement testing to identify the specific direction of exercise that reduces or centralizes pain, empowering patients with a self-management approach to spinal and joint pain.',
    benefits: ['Identifies pain-relieving movement patterns', 'Empowers patient self-management', 'Reduces reliance on passive treatment', 'Effective for disc-related pain'],
    whoCanBenefit: ['People with disc-related back or neck pain', 'Those with recurring spinal pain', 'Patients wanting an active self-treatment approach', 'Anyone with sciatica or radiating pain'],
    conditionsTreated: ['Disc herniation', 'Sciatica', 'Chronic back pain', 'Neck pain with referral'],
    treatmentProcess: ['Mechanical assessment', 'Identification of directional preference', 'Guided exercise program', 'Self-management education'],
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop',
  },
  'Soft Tissue Release': {
    shortDescription: 'Targeted manual technique to release tight muscles and improve flexibility.',
    description:
      'Soft tissue release combines tension and stretch to target specific tight or shortened muscles, helping to restore length, reduce pain, and improve overall movement quality.',
    benefits: ['Improved muscle length and flexibility', 'Reduced localized muscle pain', 'Better movement quality', 'Fast, targeted relief'],
    whoCanBenefit: ['People with tight or shortened muscles', 'Athletes needing flexibility gains', 'Those with movement restrictions', 'Patients with muscular imbalances'],
    conditionsTreated: ['Muscle tightness', 'Movement restriction', 'Muscular imbalance', 'Localized muscle pain'],
    treatmentProcess: ['Muscle length assessment', 'Targeted tension-and-stretch technique', 'Movement retesting', 'Stretching program design'],
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
  },
  'Relaxation Method': {
    shortDescription: 'Guided relaxation techniques to reduce muscle tension and stress-related pain.',
    description:
      'Our relaxation-based approach uses guided breathing, gentle movement, and hands-on techniques to lower stress levels and calm the nervous system, reducing tension-related pain throughout the body.',
    benefits: ['Reduced stress and tension', 'Lower muscle guarding', 'Improved sleep quality', 'Better overall pain management'],
    whoCanBenefit: ['People with stress-related muscle tension', 'Those with tension headaches', 'Patients with high anxiety affecting pain', 'Anyone seeking a calmer nervous system'],
    conditionsTreated: ['Stress-related tension', 'Tension headaches', 'Muscle guarding', 'Sleep-affecting pain'],
    treatmentProcess: ['Stress and tension assessment', 'Guided relaxation techniques', 'Breathing and movement coaching', 'Take-home relaxation strategies'],
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop',
  },
  'Therapeutic Exercise': {
    shortDescription: 'Customized exercise programs to build strength, mobility, and resilience.',
    description:
      'Therapeutic exercise programs are designed around your specific condition and goals, using progressive strengthening, mobility, and stability training to build lasting recovery and prevent future injury.',
    benefits: ['Improved strength and stability', 'Long-term injury prevention', 'Better functional movement', 'Personalized progression'],
    whoCanBenefit: ['People recovering from injury or surgery', 'Those with chronic pain needing strength work', 'Athletes building resilience', 'Anyone wanting a structured movement program'],
    conditionsTreated: ['Muscle weakness', 'Joint instability', 'Post-injury deconditioning', 'Chronic pain'],
    treatmentProcess: ['Functional movement assessment', 'Personalized exercise prescription', 'Supervised progression', 'Home exercise program'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
  },
  'Return to Work/Play': {
    shortDescription: 'Structured programs to safely transition you back to work or sport after injury.',
    description:
      'Our return to work/play programs bridge the gap between rehabilitation and full activity, using functional testing and progressive conditioning to ensure a safe, confident return to your job or sport.',
    benefits: ['Safe, confident return to activity', 'Reduced re-injury risk', 'Functional capacity testing', 'Employer/coach-ready reporting'],
    whoCanBenefit: ['Workers recovering from workplace injury', 'Athletes returning after rehab', 'WSIB claimants', 'Anyone needing functional clearance'],
    conditionsTreated: ['Workplace injuries', 'Post-rehab deconditioning', 'Sports injuries', 'Functional limitations'],
    treatmentProcess: ['Functional capacity evaluation', 'Job/sport-specific conditioning', 'Progressive return plan', 'Final clearance assessment'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
  },
  'Trigger Point Release': {
    shortDescription: 'Focused manual pressure technique to release painful muscle knots.',
    description:
      'Trigger point release applies sustained, targeted pressure to hyperirritable spots within tight muscle bands, helping to relieve local and referred pain while restoring normal muscle function.',
    benefits: ['Fast relief from muscle knots', 'Reduced referred pain patterns', 'Improved muscle flexibility', 'Complements other manual therapies'],
    whoCanBenefit: ['People with chronic muscle knots', 'Those with tension headaches from trigger points', 'Athletes with overworked muscles', 'Patients with referred pain patterns'],
    conditionsTreated: ['Myofascial trigger points', 'Tension headaches', 'Referred muscle pain', 'Chronic muscle tightness'],
    treatmentProcess: ['Trigger point identification', 'Sustained manual pressure release', 'Muscle re-assessment', 'Stretching and self-care guidance'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
  },
  'Deep Tissue Massage': {
    shortDescription: 'Firm-pressure massage technique targeting deep muscle and connective tissue.',
    description:
      'Deep tissue massage uses slow strokes and firm pressure to reach the deeper layers of muscle and fascia, breaking up chronic tension and adhesions for lasting relief.',
    benefits: ['Relief from deep chronic tension', 'Improved circulation to deep tissue', 'Reduced scar tissue and adhesions', 'Long-lasting muscle relaxation'],
    whoCanBenefit: ['People with chronic deep muscle tension', 'Athletes with heavy training loads', 'Those with old injury scar tissue', 'Anyone needing firmer pressure than standard massage'],
    conditionsTreated: ['Chronic muscle tension', 'Scar tissue adhesions', 'Deep tissue tightness', 'Postural muscle strain'],
    treatmentProcess: ['Assessment of tension areas', 'Deep pressure massage technique', 'Post-session mobility check', 'Hydration and self-care advice'],
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
  },
  'Psychological Services': {
    shortDescription: 'Mental health support to address the emotional impact of pain and injury.',
    description:
      'Our psychological services help patients manage the emotional and mental toll of chronic pain, injury, or rehabilitation, using evidence-based counselling techniques to support overall recovery.',
    benefits: ['Better coping strategies for chronic pain', 'Reduced anxiety and depression related to injury', 'Improved motivation during rehab', 'Whole-person approach to recovery'],
    whoCanBenefit: ['People with chronic pain affecting mental health', 'Patients struggling emotionally after injury or accident', 'Those with pain-related anxiety or low mood', 'Anyone wanting mental health support alongside physical rehab'],
    conditionsTreated: ['Pain-related anxiety', 'Depression linked to chronic illness/injury', 'Post-accident stress', 'Motivation and adjustment difficulties'],
    treatmentProcess: ['Confidential initial consultation', 'Personalized counselling plan', 'Ongoing supportive sessions', 'Coordination with physical treatment team'],
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop',
  },
};

const CONDITIONS = [
  'Back Pain', 'Neck Pain', 'Shoulder Pain', 'Knee Pain', 'Sports Injuries', 'Muscle Strains',
  'Joint Pain', 'Sciatica', 'Postural Issues', 'Chronic Pain', 'Mobility Problems', 'Workplace Injuries',
];

const EXTRA_CONDITION_NAMES = [
  'Vertigo', 'Wrist Pain', 'Headaches', 'Balance Disorder', 'Fibromyalgia Treatment',
  'Hip Pain', 'Hand Pain', 'Elbow Pain', 'Gait Disorders', 'Arthritis Treatment',
  'Motor Vehicle Accident Injuries', 'Foot Pain', 'Ankle Pain', 'Concussions',
  'WSIB Injuries', 'Dance Injuries', 'Dizziness Treatment',
];

const seed = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('ADMIN_EMAIL and ADMIN_SEED_PASSWORD must be set in .env before seeding');
    process.exit(1);
  }

  const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });
  if (existingAdmin) {
    console.log(`Admin already exists for ${adminEmail}, skipping admin creation`);
  } else {
    await Admin.create({ name: 'Clinic Admin', email: adminEmail, password: adminPassword, role: 'superadmin' });
    console.log(`Admin created: ${adminEmail}`);
  }

  const existingSettings = await WebsiteSettings.findOne();
  if (!existingSettings) {
    await WebsiteSettings.create({
      businessName: 'Markham Pain Clinic',
      phone: '+1 905-243-9423',
      email: adminEmail,
      address: '123 Main Street, Markham, ON, Canada',
      footerText: `© ${new Date().getFullYear()} Markham Pain Clinic. All rights reserved.`,
      openingHours: [
        { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
        { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
        { day: 'Sunday', hours: 'Closed' },
      ],
    });
    console.log('Default website settings created');
  } else {
    console.log('Website settings already exist, skipping');
  }

  const existingHomepage = await Homepage.findOne();
  if (!existingHomepage) {
    await Homepage.create({
      hero: {
        headline: 'Evidence-Based Pain Relief. Restoring Life.',
        subheading: 'Advanced, personalized and non-surgical treatment solutions designed to help you move better, feel stronger and live with less pain.',
        ctaText: 'Book Appointment',
        ctaUrl: '/contact',
      },
      welcomeText: 'Welcome to Markham Pain Clinic, where your recovery is our priority.',
    });
    console.log('Default homepage content created');
  } else {
    console.log('Homepage content already exists, skipping');
  }

  const existingStats = await Statistic.countDocuments();
  if (existingStats === 0) {
    await Statistic.insertMany([
      { label: 'Patients Helped', value: 5000, suffix: '+', order: 1 },
      { label: 'Years of Experience', value: 15, suffix: '+', order: 2 },
      { label: 'Patient Satisfaction', value: 98, suffix: '%', order: 3 },
    ]);
    console.log('Default statistics created');
  } else {
    console.log('Statistics already exist, skipping');
  }

  const existingServices = await Service.countDocuments();
  if (existingServices === 0) {
    for (const svc of SERVICES) {
      const slug = await generateUniqueSlug(Service, svc.title);
      await Service.create({ ...svc, slug });
    }
    console.log(`${SERVICES.length} services created`);
  } else {
    console.log('Services already exist, skipping');
  }

  let extraServicesCreated = 0;
  let extraServicesUpdated = 0;
  for (const [i, name] of EXTRA_SERVICE_NAMES.entries()) {
    const details = EXTRA_SERVICE_DETAILS[name] || {};
    const existing = await Service.findOne({ title: name });
    if (existing) {
      if (!existing.benefits || existing.benefits.length === 0) {
        existing.shortDescription = details.shortDescription || existing.shortDescription;
        existing.description = details.description || existing.description;
        existing.benefits = details.benefits || [];
        existing.whoCanBenefit = details.whoCanBenefit || [];
        existing.conditionsTreated = details.conditionsTreated || [];
        existing.treatmentProcess = details.treatmentProcess || [];
        if (details.image) existing.image = { secure_url: details.image, public_id: existing.image?.public_id || '' };
        await existing.save();
        extraServicesUpdated += 1;
      }
      continue;
    }
    const slug = await generateUniqueSlug(Service, name);
    await Service.create({
      title: name,
      slug,
      shortDescription: details.shortDescription || `Professional ${name.toLowerCase()} to support your recovery and long-term wellbeing.`,
      description: details.description || `Our ${name.toLowerCase()} service is delivered by experienced clinicians as part of a personalized treatment plan tailored to your condition and goals.`,
      benefits: details.benefits || [],
      whoCanBenefit: details.whoCanBenefit || [],
      conditionsTreated: details.conditionsTreated || [],
      treatmentProcess: details.treatmentProcess || [],
      image: { secure_url: details.image || 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
      order: SERVICES.length + i + 1,
    });
    extraServicesCreated += 1;
  }
  if (extraServicesCreated > 0) console.log(`${extraServicesCreated} additional services created`);
  if (extraServicesUpdated > 0) console.log(`${extraServicesUpdated} additional services updated with full content`);
  if (extraServicesCreated === 0 && extraServicesUpdated === 0) console.log('Additional services already exist and up to date, skipping');

  const existingTeam = await TeamMember.countDocuments();
  if (existingTeam === 0) {
    for (const member of TEAM) {
      const slug = await generateUniqueSlug(TeamMember, member.name);
      await TeamMember.create({ ...member, slug });
    }
    console.log(`${TEAM.length} team members created`);
  } else {
    console.log('Team members already exist, skipping');
  }

  const existingTestimonials = await Testimonial.countDocuments();
  if (existingTestimonials === 0) {
    await Testimonial.insertMany(TESTIMONIALS);
    console.log(`${TESTIMONIALS.length} testimonials created`);
  } else {
    console.log('Testimonials already exist, skipping');
  }

  const existingBlogs = await Blog.countDocuments();
  if (existingBlogs === 0) {
    for (const post of BLOGS) {
      const slug = await generateUniqueSlug(Blog, post.title);
      await Blog.create({ ...post, slug, publishedAt: new Date() });
    }
    console.log(`${BLOGS.length} blog posts created`);
  } else {
    console.log('Blog posts already exist, skipping');
  }

  const existingFaqs = await FAQ.countDocuments();
  if (existingFaqs === 0) {
    await FAQ.insertMany(FAQS);
    console.log(`${FAQS.length} FAQs created`);
  } else {
    console.log('FAQs already exist, skipping');
  }

  const existingConditions = await Condition.countDocuments();
  if (existingConditions === 0) {
    for (const [i, name] of CONDITIONS.entries()) {
      const slug = await generateUniqueSlug(Condition, name);
      await Condition.create({ name, slug, order: i + 1 });
    }
    console.log(`${CONDITIONS.length} conditions created`);
  } else {
    console.log('Conditions already exist, skipping');
  }

  let extraConditionsCreated = 0;
  for (const [i, name] of EXTRA_CONDITION_NAMES.entries()) {
    const existing = await Condition.findOne({ name });
    if (existing) continue;
    const slug = await generateUniqueSlug(Condition, name);
    await Condition.create({ name, slug, order: CONDITIONS.length + i + 1 });
    extraConditionsCreated += 1;
  }
  if (extraConditionsCreated > 0) console.log(`${extraConditionsCreated} additional conditions created`);
  else console.log('Additional conditions already exist, skipping');

  console.log('Seeding complete');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

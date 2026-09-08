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
const Product = require('../models/Product');
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

const PRODUCTS = [
  {
    name: 'Braces',
    price: '',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop',
    description: 'Supportive braces for the knee, ankle, wrist, elbow, and back to stabilize joints and aid recovery.',
    intro:
      'Braces are an important part of managing joint strain, improving movement, and supporting recovery. Whether you are dealing with an injury, ongoing discomfort, or need added stability during daily activities, the right brace can make a noticeable difference in how you move and function.',
    whatIsIt:
      'Braces are supportive devices designed to stabilize joints, limit harmful movement, and reduce strain on muscles and ligaments. They are commonly used for areas such as the knee, ankle, wrist, elbow, and back. These devices are made from durable yet comfortable materials that provide structured support without restricting necessary motion — some are soft and flexible, others more rigid for stronger support.',
    keyFeatures: [
      { title: 'Knee Braces', description: 'Used for ligament injuries, arthritis, or post-surgical support, helping maintain alignment and reduce pressure during walking or exercise.' },
      { title: 'Ankle Braces', description: 'Provide stability for weak or injured ankles, often used after sprains or for ongoing instability.' },
      { title: 'Wrist and Hand Braces', description: 'Helpful for repetitive strain or carpal tunnel issues, keeping the wrist in a neutral position to reduce stress.' },
      { title: 'Back Braces', description: 'Support the lower back and improve posture, especially for strain from lifting or prolonged sitting.' },
      { title: 'Elbow Braces', description: 'Commonly used for tendon-related discomfort, helping reduce strain during arm movements.' },
    ],
    whoCanBenefit: [
      { title: 'Recent Injury', description: 'People who have recently experienced a joint injury or feel instability or weakness in a joint.' },
      { title: 'Returning to Activity', description: 'Anyone returning to physical activity after time off, or performing repetitive tasks that strain certain areas.' },
      { title: 'Active Lifestyles', description: 'Those wanting added support during sports or exercise, or managing discomfort from conditions like arthritis.' },
    ],
    benefits: ['Improved joint stability', 'Reduced strain on injured areas', 'Enhanced confidence in movement', 'Support during recovery', 'Versatile for prevention and general support'],
    whyChooseUs: [
      { title: 'Professional Assessment', description: 'Our team evaluates your condition and recommends a brace suited to your situation.' },
      { title: 'Proper Fitting', description: 'We ensure the brace fits correctly, which is essential for comfort and function.' },
      { title: 'Quality Products', description: 'We provide reliable braces designed for durability and consistent support.' },
      { title: 'Ongoing Support', description: 'If adjustments are needed or your condition changes, we are available to assist and guide you.' },
    ],
    closingText: 'If you are looking for reliable joint support, our team will help you choose the right brace based on your needs and daily routine. Contact us to explore available options and find the right fit for your lifestyle.',
  },
  {
    name: 'Massager',
    price: '',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
    description: 'Practical handheld and electronic massagers to ease muscle tension and support daily recovery.',
    intro:
      'A massager is a practical device designed to ease muscle tension, improve circulation, and support recovery after daily strain. Whether you spend long hours sitting, standing, or engaging in physical activity, muscle discomfort can build up over time. Using a massager regularly can help maintain muscle comfort and mobility without needing frequent clinic visits.',
    whatIsIt:
      'A massager is an electronic or manual device that applies targeted pressure, vibration, or percussion to muscles and soft tissues, created to mimic hands-on techniques commonly used in physiotherapy settings — through vibration, percussion, or rolling and kneading motions that loosen tight areas and encourage circulation.',
    keyFeatures: [
      { title: 'Adjustable Intensity Levels', description: 'Control speed and pressure, suitable for both light relaxation and deeper muscle work.' },
      { title: 'Ergonomic Design', description: 'Comfortable grips and lightweight structures make it easy to reach the back, shoulders, and legs.' },
      { title: 'Interchangeable Heads', description: 'Different attachments target specific muscle groups for versatile full-body use.' },
      { title: 'Portable and Convenient', description: 'Compact designs let you use the massager at home, at work, or while travelling.' },
    ],
    whoCanBenefit: [
      { title: 'Office Workers', description: 'Sitting for extended periods can cause stiffness in the neck, shoulders, and lower back — a massager helps keep these areas relaxed.' },
      { title: 'Active Individuals', description: 'Those who exercise regularly may experience soreness or fatigue; using a massager post-workout supports recovery.' },
      { title: 'Daily Physical Strain', description: 'Jobs involving lifting, standing, or repetitive movement can cause ongoing muscle tension.' },
      { title: 'Older Adults', description: 'Gentle use can help maintain circulation and reduce stiffness in commonly affected areas.' },
    ],
    commonUses: [
      { title: 'Muscle Tension Reduction', description: 'Helps ease tight areas caused by stress or physical activity.' },
      { title: 'Post-Activity Recovery', description: 'Supports muscles after exercise by promoting circulation.' },
      { title: 'Improved Flexibility', description: 'Looser muscles can move more freely, supporting daily movement.' },
      { title: 'Relaxation', description: 'Using a massager can help you unwind after a long day.' },
    ],
    benefits: ['Maintains muscle comfort between clinic visits', 'Easy to use at home or on the go', 'Supports circulation and relaxation', 'Reduces stiffness from daily habits'],
    whyChooseUs: [
      { title: 'Carefully Selected Products', description: 'Our massagers are chosen for quality, durability, and usability.' },
      { title: 'In-Clinic Support', description: 'Our team can help you understand how to use the device correctly for your needs.' },
      { title: 'Practical Advice', description: 'We help you integrate the massager into your routine in a way that complements your daily activities.' },
    ],
    closingText: 'If you are looking for a simple, effective way to manage muscle tension and stay active, visit us to explore our selection and find a massager that fits your needs.',
  },
  {
    name: 'TENS Unit',
    price: '',
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop',
    description: 'Portable TENS (electrical nerve stimulation) devices for drug-free, on-demand pain relief.',
    intro:
      'A TENS (Transcutaneous Electrical Nerve Stimulation) unit is a small, portable device that delivers gentle electrical impulses through the skin to help manage pain. It is a popular drug-free option for people looking to reduce discomfort between clinic visits.',
    whatIsIt:
      'A TENS unit sends low-voltage electrical currents through electrode pads placed on the skin near the area of pain. These impulses can interrupt pain signals travelling to the brain and encourage the release of natural pain-relieving endorphins.',
    keyFeatures: [
      { title: 'Adjustable Settings', description: 'Control intensity, pulse rate, and mode to match your comfort level and the type of pain being treated.' },
      { title: 'Portable and Discreet', description: 'Compact size and clip-on design allow use at home, at work, or while on the move.' },
      { title: 'Reusable Electrode Pads', description: 'Long-lasting pads that can be repositioned for different treatment areas.' },
      { title: 'Multiple Programs', description: 'Pre-set modes designed for different pain types, from chronic aches to acute muscle soreness.' },
    ],
    whoCanBenefit: [
      { title: 'Chronic Pain Sufferers', description: 'People managing ongoing back, neck, or joint pain who want a drug-free relief option.' },
      { title: 'Post-Injury Recovery', description: 'Those recovering from muscle strain or minor injuries alongside their treatment plan.' },
      { title: 'Active Individuals', description: 'Athletes or active adults managing soreness after exercise or training.' },
    ],
    benefits: ['Drug-free pain management', 'Convenient for use at home', 'Non-invasive and easy to apply', 'Complements ongoing physiotherapy treatment'],
    whyChooseUs: [
      { title: 'Guided Setup', description: 'Our team shows you correct pad placement and settings for your specific condition.' },
      { title: 'Quality Devices', description: 'We provide reliable units built for consistent, safe use.' },
      { title: 'Ongoing Advice', description: 'We are available to adjust recommendations as your treatment progresses.' },
    ],
    closingText: 'Ask our team whether a TENS unit is right for your condition, and we will help you get set up with the right device and settings.',
  },
  {
    name: 'Hot and Cold Pack',
    price: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    description: 'Reusable hot and cold therapy packs to reduce swelling, ease stiffness, and soothe sore muscles.',
    intro:
      'Hot and cold packs are simple, reusable tools that support pain management and recovery at home. Cold therapy helps reduce swelling and numb acute pain, while heat therapy relaxes tight muscles and improves blood flow to stiff areas.',
    whatIsIt:
      'A hot and cold pack is a reusable gel or fabric pack that can be heated or frozen and applied directly to the skin over the area of discomfort, providing temperature-based relief for both acute and chronic conditions.',
    keyFeatures: [
      { title: 'Dual Purpose', description: 'The same pack can be used hot or cold depending on your needs.' },
      { title: 'Flexible, Comfortable Fit', description: 'Moulds to the body for use on the back, shoulder, knee, or neck.' },
      { title: 'Reusable Design', description: 'Durable materials designed for repeated freezing or heating.' },
      { title: 'Easy to Use at Home', description: 'No special equipment needed — just a freezer or microwave.' },
    ],
    whoCanBenefit: [
      { title: 'Acute Injuries', description: 'Cold therapy helps manage swelling right after a sprain, strain, or minor injury.' },
      { title: 'Chronic Stiffness', description: 'Heat therapy eases ongoing muscle tightness and joint stiffness.' },
      { title: 'Post-Exercise Recovery', description: 'Helps manage soreness after physical activity or training.' },
    ],
    benefits: ['Reduces swelling and inflammation', 'Eases muscle stiffness and tension', 'Affordable, reusable at-home care', 'Simple to fit into daily recovery routines'],
    whyChooseUs: [
      { title: 'Guidance on Use', description: 'Our team advises when to use heat versus cold for your specific condition.' },
      { title: 'Quality Materials', description: 'We provide packs designed for comfort and durability with repeated use.' },
    ],
    closingText: 'Not sure whether to use hot or cold for your injury? Ask our team — we will guide you toward the right approach for faster, safer recovery.',
  },
  {
    name: 'Pain Relief Creams',
    price: '',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
    description: 'Topical pain relief creams for targeted, on-the-spot muscle and joint comfort.',
    intro:
      'Topical pain relief creams offer targeted, on-the-spot comfort for sore muscles and stiff joints. They are a convenient addition to a treatment plan, especially for managing discomfort between clinic visits.',
    whatIsIt:
      'Pain relief creams are topical formulations applied directly to the skin over a painful area. They typically work through cooling, warming, or anti-inflammatory ingredients that ease surface-level discomfort and support relaxation of the underlying muscles.',
    keyFeatures: [
      { title: 'Fast-Acting Relief', description: 'Provides a noticeable soothing sensation shortly after application.' },
      { title: 'Targeted Application', description: 'Applied directly to the area of discomfort for localized relief.' },
      { title: 'Non-Invasive', description: 'A simple, drug-free option that fits easily into a daily routine.' },
      { title: 'Portable', description: 'Easy to carry and use at home, work, or while travelling.' },
    ],
    whoCanBenefit: [
      { title: 'Muscle Soreness', description: 'People managing everyday aches from physical activity or overuse.' },
      { title: 'Joint Stiffness', description: 'Those with stiffness in the knees, shoulders, or lower back.' },
      { title: 'Between Treatments', description: 'Patients wanting extra comfort between physiotherapy or massage sessions.' },
    ],
    benefits: ['Convenient, on-the-spot relief', 'Complements other treatments well', 'Easy to apply at home', 'Non-invasive and drug-free'],
    whyChooseUs: [
      { title: 'Recommended Products', description: 'We select creams that align with the treatment approaches used in our clinic.' },
      { title: 'Usage Guidance', description: 'Our team can advise on the best way to use creams alongside your treatment plan.' },
    ],
    closingText: 'Ask our team which pain relief cream best complements your current treatment plan and daily routine.',
  },
  {
    name: 'Custom Made Orthotics',
    price: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    description: 'Custom-fitted orthotic insoles designed around your foot shape, gait, and specific condition.',
    intro:
      'Custom made orthotics are shoe insoles built specifically around your foot shape, gait pattern, and individual condition. Unlike generic store-bought insoles, they are designed to correct imbalances and provide targeted support exactly where you need it.',
    whatIsIt:
      'Custom orthotics are supportive inserts designed from a mould or scan of your feet, correcting alignment issues, redistributing pressure, and supporting the arch and heel to reduce strain on the feet, knees, hips, and lower back.',
    keyFeatures: [
      { title: 'Personalized Fit', description: 'Built from an assessment of your specific foot shape and gait pattern.' },
      { title: 'Targeted Support', description: 'Provides support exactly where your feet need it most.' },
      { title: 'Durable Materials', description: 'Designed to hold their shape and support through daily wear.' },
      { title: 'Fits Most Footwear', description: 'Designed to be used across everyday shoes, work boots, or athletic footwear.' },
    ],
    whoCanBenefit: [
      { title: 'Foot and Heel Pain', description: 'People managing plantar fasciitis, heel pain, or general foot discomfort.' },
      { title: 'Gait Imbalances', description: 'Those with overpronation, flat feet, or uneven walking patterns.' },
      { title: 'Related Joint Pain', description: 'Individuals whose knee, hip, or back pain is linked to foot alignment.' },
      { title: 'Active Lifestyles', description: 'Athletes and active adults wanting extra support during activity.' },
    ],
    benefits: ['Improved foot and gait alignment', 'Reduced strain on knees, hips, and back', 'Personalized fit for lasting comfort', 'Supports long-term movement health'],
    whyChooseUs: [
      { title: 'Professional Assessment', description: 'Our team evaluates your gait and foot structure before recommending orthotics.' },
      { title: 'Custom Fitting Process', description: 'Orthotics are built specifically around your feet, not a generic template.' },
      { title: 'Integrated Care', description: 'Orthotics can be combined with physiotherapy for a complete approach to alignment and pain.' },
    ],
    closingText: 'If foot pain or alignment issues are affecting your daily movement, our team can assess your gait and recommend custom orthotics suited to your needs.',
  },
  {
    name: 'Posture Corrector Brace',
    price: '',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop',
    description: 'Supportive posture brace that gently pulls the shoulders back to encourage proper spinal alignment.',
    intro:
      'A posture corrector brace is a supportive garment worn across the shoulders and upper back to encourage proper spinal alignment. It is a simple tool for people looking to counteract the effects of long hours sitting or slouching.',
    whatIsIt:
      'The brace gently pulls the shoulders back and supports the upper spine, retraining the body toward a more upright, aligned posture over time while reducing strain on the neck and upper back.',
    keyFeatures: [
      { title: 'Adjustable Straps', description: 'Fits comfortably across a range of body sizes and can be adjusted for gentle or firmer support.' },
      { title: 'Lightweight, Breathable Material', description: 'Designed to be worn discreetly under clothing throughout the day.' },
      { title: 'Gradual Posture Training', description: 'Encourages muscle memory for improved posture over consistent use.' },
      { title: 'Easy to Wear', description: 'Simple to put on and adjust without assistance.' },
    ],
    whoCanBenefit: [
      { title: 'Desk Workers', description: 'People who sit for long hours and notice slouching or rounded shoulders.' },
      { title: 'Upper Back and Neck Tension', description: 'Those experiencing tension linked to poor posture habits.' },
      { title: 'Post-Injury Support', description: 'Individuals rebuilding postural awareness after an injury or period of inactivity.' },
    ],
    benefits: ['Encourages proper spinal alignment', 'Reduces neck and shoulder strain', 'Builds long-term postural awareness', 'Comfortable for daily wear'],
    whyChooseUs: [
      { title: 'Guided Recommendation', description: 'Our team assesses your posture before recommending the right level of support.' },
      { title: 'Proper Fitting', description: 'We ensure the brace fits correctly for comfort and effectiveness.' },
      { title: 'Complementary Care', description: 'Can be paired with physiotherapy and postural exercises for lasting results.' },
    ],
    closingText: 'If poor posture is contributing to your discomfort, our team can help you find the right posture corrector brace and pair it with exercises for lasting improvement.',
  },
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

  let productsCreated = 0;
  let productsUpdated = 0;
  for (const [i, product] of PRODUCTS.entries()) {
    const existing = await Product.findOne({ name: product.name });
    if (existing) {
      if (!existing.whatIsIt) {
        existing.description = product.description;
        existing.intro = product.intro;
        existing.whatIsIt = product.whatIsIt;
        existing.keyFeatures = product.keyFeatures || [];
        existing.whoCanBenefit = product.whoCanBenefit || [];
        existing.commonUses = product.commonUses || [];
        existing.benefits = product.benefits || [];
        existing.whyChooseUs = product.whyChooseUs || [];
        existing.closingText = product.closingText;
        if (product.image && !existing.image?.secure_url) {
          existing.image = { secure_url: product.image, public_id: existing.image?.public_id || '' };
        }
        await existing.save();
        productsUpdated += 1;
      }
      continue;
    }
    const slug = await generateUniqueSlug(Product, product.name);
    await Product.create({
      ...product,
      slug,
      image: { secure_url: product.image, public_id: '' },
      order: i + 1,
    });
    productsCreated += 1;
  }
  if (productsCreated > 0) console.log(`${productsCreated} products created`);
  if (productsUpdated > 0) console.log(`${productsUpdated} products updated with full content`);
  if (productsCreated === 0 && productsUpdated === 0) console.log('Products already exist and up to date, skipping');

  console.log('Seeding complete');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

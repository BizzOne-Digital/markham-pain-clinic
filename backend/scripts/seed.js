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

const CONDITIONS = [
  'Back Pain', 'Neck Pain', 'Shoulder Pain', 'Knee Pain', 'Sports Injuries', 'Muscle Strains',
  'Joint Pain', 'Sciatica', 'Postural Issues', 'Chronic Pain', 'Mobility Problems', 'Workplace Injuries',
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

  console.log('Seeding complete');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

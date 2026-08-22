// Local fallback content used whenever the backend API is unreachable or
// returns empty data. Keeps the site fully functional/demoable offline.

export const PLACEHOLDER_SERVICES = [
  {
    _id: 'physiotherapy',
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    shortDescription: 'Restore movement and function with hands-on, personalized physiotherapy.',
    description:
      'Our physiotherapy program combines manual techniques, targeted exercise, and education to help you recover from injury, surgery, or chronic conditions and return to the activities you love.',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Reduced pain and inflammation', 'Improved mobility and strength', 'Faster, safer recovery', 'Lower risk of re-injury'],
    whoCanBenefit: ['Post-surgical patients', 'People with sports injuries', 'Those with chronic back or joint pain', 'Anyone recovering from an accident'],
    conditionsTreated: ['Back pain', 'Neck pain', 'Shoulder injuries', 'Knee pain', 'Post-surgical rehab'],
    treatmentProcess: ['Initial assessment', 'Personalized treatment plan', 'Hands-on therapy & exercise', 'Progress tracking & adjustment'],
  },
  {
    _id: 'acupuncture-dry-needling',
    slug: 'acupuncture-dry-needling',
    name: 'Acupuncture & Dry Needling',
    shortDescription: 'Targeted needling therapy to relieve muscle tension and chronic pain.',
    description:
      'Acupuncture and dry needling target trigger points and meridian pathways to relieve muscular tension, improve circulation, and accelerate the body’s natural healing response.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Relief from muscle tightness', 'Reduced chronic pain', 'Improved circulation', 'Complements other therapies'],
    whoCanBenefit: ['Chronic pain sufferers', 'Athletes with tight muscles', 'People with tension headaches', 'Those seeking drug-free relief'],
    conditionsTreated: ['Migraines', 'Muscle strains', 'Fibromyalgia', 'Sciatica'],
    treatmentProcess: ['Consultation & assessment', 'Point/trigger mapping', 'Needling session', 'Aftercare guidance'],
  },
  {
    _id: 'chronic-pain-management',
    slug: 'chronic-pain-management',
    name: 'Chronic Pain Management',
    shortDescription: 'A whole-person approach to managing long-term and persistent pain.',
    description:
      'We help patients living with chronic pain build sustainable, long-term relief through a combination of manual therapy, movement retraining, and lifestyle strategies.',
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Reduced reliance on medication', 'Improved daily function', 'Better sleep and mood', 'Long-term self-management tools'],
    whoCanBenefit: ['People with arthritis', 'Fibromyalgia patients', 'Long-term back or joint pain sufferers', 'Post-injury chronic pain'],
    conditionsTreated: ['Arthritis', 'Fibromyalgia', 'Chronic low back pain', 'Nerve pain'],
    treatmentProcess: ['Comprehensive evaluation', 'Multi-modal plan design', 'Ongoing therapy', 'Lifestyle & self-care coaching'],
  },
  {
    _id: 'sports-injury-rehabilitation',
    slug: 'sports-injury-rehabilitation',
    name: 'Sports Injury Rehabilitation',
    shortDescription: 'Get back in the game with sport-specific rehab and injury prevention.',
    description:
      'From sprains to ligament tears, our sports rehabilitation programs are designed to safely restore strength, agility, and confidence so athletes can return to peak performance.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Faster return to sport', 'Reduced re-injury risk', 'Sport-specific strengthening', 'Performance optimization'],
    whoCanBenefit: ['Competitive athletes', 'Weekend warriors', 'Youth sports players', 'Anyone with an activity-related injury'],
    conditionsTreated: ['ACL/MCL injuries', 'Ankle sprains', 'Tennis/golfer’s elbow', 'Muscle tears'],
    treatmentProcess: ['Injury assessment', 'Phased rehab plan', 'Strength & agility training', 'Return-to-sport clearance'],
  },
  {
    _id: 'manual-therapy',
    slug: 'manual-therapy',
    name: 'Manual Therapy',
    shortDescription: 'Hands-on joint and soft tissue techniques to relieve pain and stiffness.',
    description:
      'Our skilled therapists use hands-on mobilization, manipulation, and soft tissue techniques to reduce pain, improve joint mechanics, and restore normal movement patterns.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
    benefits: ['Immediate relief from stiffness', 'Improved joint mobility', 'Reduced muscle tension', 'Enhanced treatment outcomes'],
    whoCanBenefit: ['People with joint stiffness', 'Postural pain sufferers', 'Those recovering from injury', 'Desk workers with tension'],
    conditionsTreated: ['Joint stiffness', 'Postural dysfunction', 'Muscle spasm', 'Frozen shoulder'],
    treatmentProcess: ['Postural & joint assessment', 'Manual mobilization', 'Corrective exercise', 'Home care plan'],
  },
]

export const PLACEHOLDER_TEAM = [
  {
    _id: 't1',
    slug: 'dr-sarah-bennett',
    name: 'Dr. Sarah Bennett',
    role: 'Lead Physiotherapist',
    specialization: 'Sports Rehabilitation',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop',
    qualifications: ['DPT, University of Toronto', 'Certified Sports Physiotherapist'],
    bio: 'Dr. Bennett has over 12 years of experience helping athletes and everyday patients recover from injury and return to full function.',
    expertise: ['Sports Injuries', 'Manual Therapy', 'Post-Surgical Rehab'],
    philosophy: 'I believe recovery is a partnership — every plan is built around the patient’s goals, not a generic protocol.',
  },
  {
    _id: 't2',
    slug: 'michael-chen',
    name: 'Michael Chen',
    role: 'Registered Acupuncturist',
    specialization: 'Acupuncture & Dry Needling',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
    qualifications: ['R.Ac, CMAAC Certified', 'Advanced Dry Needling Certification'],
    bio: 'Michael blends traditional acupuncture with modern dry needling techniques to relieve chronic tension and pain.',
    expertise: ['Chronic Pain', 'Migraines', 'Muscle Tension'],
    philosophy: 'Pain relief should be holistic — treating the whole person, not just the symptom.',
  },
  {
    _id: 't3',
    slug: 'jessica-thompson',
    name: 'Jessica Thompson',
    role: 'Registered Physiotherapist',
    specialization: 'Chronic Pain Management',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
    qualifications: ['MScPT, McMaster University', 'Chronic Pain Management Certificate'],
    bio: 'Jessica specializes in helping patients with long-standing pain regain confidence and independence in daily life.',
    expertise: ['Chronic Pain', 'Fibromyalgia', 'Arthritis Management'],
    philosophy: 'Every patient deserves a plan built on evidence, patience, and genuine care.',
  },
]

export const PLACEHOLDER_TESTIMONIALS = [
  {
    _id: 'r1',
    name: 'Amanda K.',
    testimonial: 'After months of chronic back pain, the team at Markham Pain Clinic finally gave me a plan that worked. I am pain-free and back to my morning runs.',
    rating: 5,
    serviceCategory: 'Physiotherapy',
  },
  {
    _id: 'r2',
    name: 'David R.',
    testimonial: 'Professional, caring, and genuinely invested in my recovery. My shoulder injury healed faster than I expected.',
    rating: 5,
    serviceCategory: 'Sports Injury Rehabilitation',
  },
  {
    _id: 'r3',
    name: 'Priya S.',
    testimonial: 'The acupuncture sessions completely changed how I manage my migraines. Highly recommend this clinic to anyone in pain.',
    rating: 5,
    serviceCategory: 'Acupuncture & Dry Needling',
  },
  {
    _id: 'r4',
    name: 'Tom H.',
    testimonial: 'I appreciated how personalized every session felt. They listened, adjusted the plan, and got real results.',
    rating: 4,
    serviceCategory: 'Chronic Pain Management',
  },
]

export const PLACEHOLDER_BLOGS = [
  {
    _id: 'b1',
    slug: 'five-signs-you-need-physiotherapy',
    title: '5 Signs You May Need Physiotherapy',
    category: 'Physiotherapy',
    excerpt: 'Persistent pain or stiffness could be signs your body needs professional attention. Here is what to watch for.',
    content:
      'Persistent pain, reduced range of motion, recurring injuries, poor posture, and slow recovery after activity are all signs that physiotherapy could help. Early intervention often leads to faster, more complete recovery than waiting for symptoms to worsen. Our team can assess your specific situation and design a plan tailored to your goals.',
    featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    createdAt: '2026-06-12',
  },
  {
    _id: 'b2',
    slug: 'understanding-chronic-pain',
    title: 'Understanding Chronic Pain: Causes and Coping Strategies',
    category: 'Chronic Pain',
    excerpt: 'Chronic pain affects millions. Learn about its causes and evidence-based ways to manage it long-term.',
    content:
      'Chronic pain is defined as pain lasting longer than three months and can stem from injury, illness, or unknown causes. Effective management often combines physical therapy, gentle movement, stress reduction, and professional guidance rather than relying on a single solution.',
    featuredImage: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop',
    createdAt: '2026-05-28',
  },
  {
    _id: 'b3',
    slug: 'benefits-of-acupuncture',
    title: 'The Science-Backed Benefits of Acupuncture',
    category: 'Acupuncture',
    excerpt: 'Acupuncture is more than tradition — modern research supports its role in pain management.',
    content:
      'Modern research shows acupuncture can stimulate the nervous system, release natural pain-relieving chemicals, and improve blood flow to affected areas. Combined with dry needling techniques, it is a powerful, drug-free option for many types of pain.',
    featuredImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
    createdAt: '2026-05-10',
  },
]

export const PLACEHOLDER_FAQS = [
  { _id: 'f1', question: 'Do I need a referral to book an appointment?', answer: 'No referral is required. You can book directly with us, though a referral from your doctor is welcome if you have one.' },
  { _id: 'f2', question: 'What should I expect at my first appointment?', answer: 'Your first visit includes a thorough assessment of your condition, medical history review, and the start of a personalized treatment plan.' },
  { _id: 'f3', question: 'How long is each treatment session?', answer: 'Most sessions run between 30 and 60 minutes depending on the treatment type and your individual plan.' },
  { _id: 'f4', question: 'What conditions do you treat?', answer: 'We treat back and neck pain, sports injuries, chronic pain, joint issues, postural problems, and more.' },
  { _id: 'f5', question: 'How many treatments will I need?', answer: 'This varies by condition and severity. Your therapist will discuss an estimated timeline after your initial assessment.' },
  { _id: 'f6', question: 'Do you treat sports injuries?', answer: 'Yes, we offer dedicated sports injury rehabilitation programs for athletes of all levels.' },
  { _id: 'f7', question: 'Can you help with chronic, long-term pain?', answer: 'Absolutely. We specialize in whole-person chronic pain management plans built for long-term results.' },
  { _id: 'f8', question: 'How do I book an appointment?', answer: 'You can call us, email us, or use the contact form on this website and our team will reach out to schedule your visit.' },
]

export const PLACEHOLDER_CONDITIONS = [
  'Back Pain', 'Neck Pain', 'Shoulder Pain', 'Knee Pain', 'Sports Injuries', 'Muscle Strains',
  'Joint Pain', 'Sciatica', 'Postural Issues', 'Chronic Pain', 'Mobility Problems', 'Workplace Injuries',
].map((name, i) => ({ _id: `c${i}`, name }))

export const PLACEHOLDER_STATS = [
  { _id: 's1', label: 'Patients Helped', value: 5000, suffix: '+' },
  { _id: 's2', label: 'Years of Experience', value: 15, suffix: '+' },
  { _id: 's3', label: 'Patient Satisfaction', value: 98, suffix: '%' },
]

export const CLINIC_INFO = {
  phone: '+1 905-243-9423',
  email: 'itssiddharthpatel@gmail.com',
  instagram: '@Markhampainclinic',
  instagramUrl: 'https://instagram.com/Markhampainclinic',
  address: '123 Main Street, Markham, ON, Canada',
  hours: 'Mon – Fri: 9:00 AM – 7:00 PM | Sat: 9:00 AM – 2:00 PM | Sun: Closed',
  businessName: 'Markham Pain Clinic',
}

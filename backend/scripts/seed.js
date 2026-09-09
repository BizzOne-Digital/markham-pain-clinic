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

const EXTRA_BLOGS = [
  {
    title: 'Tech Neck Tips for Desk Workers',
    categories: ['Posture'],
    excerpt: 'Long hours at a screen can quietly overload your neck and shoulders. Here is how to spot it early and fix it.',
    content:
      '"Tech neck" describes the strain that builds up in the neck and upper back from hours spent looking down at a phone or leaning toward a monitor. Over time, this posture shortens the muscles at the front of the neck and overstretches the ones at the back, leading to stiffness, headaches, and reduced mobility.\n\nSimple changes make a real difference: raise your screen to eye level, keep your ears roughly over your shoulders rather than jutting forward, and take a movement break every 30-45 minutes. Chin tucks and shoulder blade squeezes done a few times a day can help reset posture between stretches of sitting.\n\nIf stiffness or headaches persist despite these adjustments, a physiotherapy assessment can identify exactly which muscles are tight, which are weak, and build a targeted plan — rather than guessing at generic desk stretches.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Rotator Cuff Injury Care: What You Need to Know',
    categories: ['Sports Injuries'],
    excerpt: 'Shoulder pain that lingers could be a rotator cuff issue. Here is how it is assessed and treated.',
    content:
      'The rotator cuff is a group of four muscles and tendons that stabilize the shoulder joint and allow it to lift, rotate, and reach overhead. Injuries range from minor irritation caused by repetitive overhead movement to partial or full tears, and symptoms often include a dull ache, weakness when lifting the arm, or pain that disturbs sleep.\n\nA thorough assessment looks at range of motion, strength testing, and the specific movements that trigger pain to narrow down which part of the cuff is affected. Most rotator cuff injuries respond well to a structured, progressive exercise program that restores strength and stability without aggravating the tendon further, supported by manual therapy to ease surrounding tension.\n\nIgnoring shoulder pain often leads to compensation patterns in the neck and upper back, so earlier assessment generally means a shorter road to recovery.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Physiotherapy for Knee Pain: What an Assessment Can Explore',
    categories: ['Physiotherapy'],
    excerpt: 'Knee pain has many possible causes. A proper assessment narrows down what is actually going on.',
    content:
      'Knee pain can come from the joint itself, the surrounding muscles, or even alignment issues starting at the hip or foot. A physiotherapy assessment typically begins with understanding when the pain started, what movements make it worse, and any history of injury, followed by hands-on testing of the joint\'s range of motion, stability, and the strength of the muscles that support it.\n\nCommon findings include weakness in the muscles around the hip and thigh, tightness in the surrounding soft tissue, or movement patterns that place uneven load on the knee during walking, squatting, or stairs. Rather than treating the knee in isolation, an effective plan usually addresses the whole kinetic chain — strengthening supporting muscles, improving flexibility, and correcting movement habits that contribute to the strain.\n\nA clear assessment gives you an honest picture of what is driving your pain, so treatment is built around your actual findings rather than guesswork.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Chiropractic Assessment for Shoulder Pain: What to Expect',
    categories: ['Chiropractic Care'],
    excerpt: 'Not sure what happens during a chiropractic shoulder assessment? Here is a walkthrough of the process.',
    content:
      'Shoulder pain can be linked to the shoulder joint itself, but it can also stem from restrictions in the neck or upper spine that refer pain outward. A chiropractic assessment for shoulder pain typically starts with a discussion of your symptoms and daily activities, followed by an examination of posture, spinal alignment, and the mobility of the neck, upper back, and shoulder joint together.\n\nSpecific orthopedic tests help identify whether the pain is coming from the joint, surrounding soft tissue, or a nerve-related source higher up the spine. Based on these findings, treatment may involve gentle spinal or joint adjustments, soft tissue work, and guided mobility exercises aimed at restoring normal movement patterns.\n\nBecause the shoulder and spine work closely together, addressing both areas — rather than the shoulder alone — often leads to more complete and lasting relief.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'What to Expect at Your First RMT Appointment',
    categories: ['Massage Therapy'],
    excerpt: 'First time seeing a registered massage therapist? Here is what your first visit usually involves.',
    content:
      'Your first registered massage therapy (RMT) appointment typically starts with a short health history intake, covering current symptoms, past injuries, and any areas of concern. This helps your therapist understand your goals for the session, whether that is relaxation, pain relief, or recovery support alongside another treatment.\n\nDuring the assessment, your RMT may check posture, muscle tension, and range of motion in the affected area before beginning hands-on treatment. Techniques vary based on your needs — from lighter relaxation strokes to firmer, targeted work on specific tight or restricted areas — and you are always in control of pressure and comfort throughout the session.\n\nAfter treatment, your therapist will usually share simple self-care tips, such as stretches or hydration reminders, and may recommend a treatment frequency based on your goals. Many patients combine RMT with physiotherapy or chiropractic care for a more complete recovery plan.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Low Back Pain: What a Physiotherapy Assessment Can Help You Understand',
    categories: ['Physiotherapy'],
    excerpt: 'Low back pain is common, but the cause is different for everyone. Here is how an assessment gets to the root of it.',
    content:
      'Low back pain is one of the most common reasons people seek physiotherapy, but the underlying cause varies widely — from muscle strain and joint stiffness to disc-related issues or nerve irritation. A thorough assessment examines your posture, spinal movement, and the strength and flexibility of the muscles supporting your lower back, along with questions about your daily habits, work setup, and activity level.\n\nSpecific movement and strength tests help determine whether your pain centralizes or worsens with certain positions, which gives valuable clues about the source of the problem and which exercises will help versus aggravate it. From there, a treatment plan is built around your specific findings — often combining manual therapy for immediate relief with a progressive exercise program for long-term strength and stability.\n\nUnderstanding what is actually driving your back pain, rather than treating it generically, is often the difference between short-term relief and lasting improvement.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Recognizing Sciatica Symptoms',
    categories: ['Chronic Pain'],
    excerpt: 'Sciatica can show up in surprising ways beyond just back pain. Here is what to watch for.',
    content:
      'Sciatica refers to pain that travels along the path of the sciatic nerve, which runs from the lower back through the hip and down the back of each leg. Common symptoms include a sharp or burning pain radiating from the lower back or buttock down the leg, along with numbness, tingling, or weakness that can extend as far as the foot.\n\nSymptoms are often worsened by prolonged sitting, bending forward, or certain movements, and may come and go depending on posture or activity. Because sciatica is a symptom rather than a diagnosis on its own, an assessment aims to identify the underlying cause — commonly a disc issue, muscle tightness (such as in the piriformis), or joint irritation placing pressure on the nerve.\n\nMost cases respond well to conservative treatment, including targeted exercises, manual therapy, and posture adjustments, especially when addressed early rather than left to become chronic.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Physiotherapy and RMT: How the Two Work Well Together',
    categories: ['Physiotherapy'],
    excerpt: 'Physiotherapy and massage therapy are often more effective as a team than on their own.',
    content:
      'Physiotherapy and registered massage therapy (RMT) approach recovery from different but complementary angles. Physiotherapy typically focuses on restoring strength, mobility, and function through targeted exercise and manual techniques, while RMT works on releasing muscle tension, improving circulation, and easing tightness that can restrict movement and slow progress.\n\nCombining the two often accelerates recovery: massage therapy can loosen tight, guarded muscles before a physiotherapy session, making stretches and strengthening exercises more effective and comfortable. In turn, physiotherapy helps ensure that the relief gained from massage translates into lasting improvements in strength and movement patterns, rather than temporary comfort alone.\n\nFor conditions involving both muscular tightness and functional limitations — such as chronic neck and shoulder tension from desk work, or recovery from a soft tissue injury — a coordinated plan between both disciplines often produces better, longer-lasting results than either treatment alone.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Stiff Neck? Simple Ergonomic Fixes That Actually Help',
    categories: ['Posture'],
    excerpt: 'A stiff neck is often a sign your workspace setup needs adjusting. Here are practical fixes.',
    content:
      'A persistently stiff neck is frequently linked to workspace setup rather than a single injury. Monitors positioned too low, keyboards placed too far away, and chairs without proper back support all encourage the head-forward, shoulders-rounded posture that leads to chronic tightness.\n\nA few practical adjustments can make a noticeable difference: position your monitor so the top of the screen is at or just below eye level, keep your elbows close to your body at roughly a 90-degree angle while typing, and ensure your chair supports the natural curve of your lower back so you are not compensating with your neck and shoulders. Standing up and moving for a minute or two every half hour also helps prevent muscles from locking into one position for too long.\n\nIf neck stiffness continues despite these changes, it is worth having it assessed — a persistent problem often points to an underlying muscle imbalance or joint restriction that ergonomic adjustments alone will not fully resolve.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: '7 Mistakes to Avoid When Choosing a Strength Restoration Program',
    categories: ['Sports Injuries'],
    excerpt: 'Rebuilding strength after an injury takes more than generic exercises. Avoid these common mistakes.',
    content:
      'Rebuilding strength after an injury or period of inactivity is easy to get wrong if the program is not tailored to your specific situation. Common mistakes include progressing too quickly before tissues are ready, following a generic plan that ignores your actual weaknesses, and skipping a proper assessment that identifies which muscles need the most attention.\n\nOther pitfalls include focusing only on the injured area while ignoring supporting muscle groups, neglecting mobility work alongside strengthening, and stopping the program as soon as pain subsides rather than completing the full course needed to prevent re-injury. Inconsistent effort — doing exercises sporadically rather than following a structured schedule — also significantly slows results.\n\nA well-designed strength restoration program is built around your specific assessment findings, progresses gradually based on how your body responds, and continues until function is fully restored, not just until pain disappears.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'What Should You Ask When You Meet Your Therapist for the First Time?',
    categories: ['Physiotherapy'],
    excerpt: 'A good first appointment is a two-way conversation. Here are the questions worth asking.',
    content:
      'Your first meeting with a physiotherapist, chiropractor, or massage therapist is a chance to understand not just your condition, but the plan for addressing it. Useful questions include: what is likely causing my symptoms, what does the assessment show, and how does the proposed treatment plan target that specific cause rather than just the symptoms?\n\nIt is also worth asking how many sessions are typically needed for a condition like yours, what progress should look like along the way, and what you can do at home between appointments to support your recovery. If exercises are prescribed, ask why each one is included — understanding the purpose behind a plan makes it much easier to stay consistent with it.\n\nA good therapist will welcome these questions and explain their reasoning clearly. Coming prepared with a few of your own helps you get more value from every appointment and stay actively involved in your own recovery.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: '7 Mistakes to Avoid When Choosing a Physiotherapy Clinic',
    categories: ['Physiotherapy'],
    excerpt: 'Convenient hours matter, but they should not be the only factor in choosing where to get treated.',
    content:
      'Convenient hours and locations matter, but choosing a physiotherapy clinic based on availability alone can lead to disappointing results. A common mistake is skipping research into the clinic\'s assessment process — a rushed, five-minute evaluation rarely uncovers the real cause of a problem, no matter how convenient the appointment time was to book.\n\nOther mistakes include choosing a clinic without checking whether treatment plans are personalized or templated, not asking whether the same therapist will see you consistently for continuity of care, and overlooking how the clinic tracks and communicates your progress over time. It is also worth being cautious of any clinic promising a fixed number of sessions before even assessing your condition — recovery timelines should be based on findings, not a one-size-fits-all package.\n\nThe best fit is a clinic that combines accessibility with a genuine, individualized assessment and treatment approach — convenience should support good care, not replace it.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Common Causes of Back Pain and How Physiotherapy Helps',
    categories: ['Physiotherapy'],
    excerpt: 'Back pain can come from many everyday habits. Here is what commonly causes it and how physiotherapy addresses it.',
    content:
      'Back pain is rarely caused by a single dramatic event — more often it builds up gradually from poor posture, prolonged sitting, weak core muscles, repetitive lifting, or simply staying in one position for too long. Sudden movements, sports strain, or an old injury that never fully healed can also contribute to ongoing discomfort.\n\nPhysiotherapy addresses back pain by first identifying which of these factors is at play through a hands-on assessment of posture, movement, and muscle strength. Treatment typically combines manual therapy to ease immediate tension with a progressive exercise program that strengthens the core and back muscles, improves flexibility, and corrects the movement habits that led to the pain in the first place.\n\nBecause back pain often returns if the underlying cause is not addressed, the goal of physiotherapy is not just short-term relief but building the strength and habits that prevent it from coming back.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: '5 Exercises to Relieve Neck and Shoulder Tension',
    categories: ['Posture'],
    excerpt: 'Simple, physiotherapist-recommended exercises to ease the tightness that builds up from desk work.',
    content:
      'Neck and shoulder tension from long hours at a desk usually responds well to a handful of simple, consistent exercises. Chin tucks — gently drawing the head straight back without tilting — help counter the forward-head posture that builds up from screen time. Shoulder blade squeezes, done by pulling the shoulder blades together and holding for a few seconds, strengthen the upper back muscles that support good posture.\n\nUpper trapezius stretches, where you gently tilt your head toward one shoulder while keeping the opposite shoulder relaxed and down, target one of the most commonly tight muscles in this area. Doorway chest stretches open up the front of the shoulders, which tend to shorten from prolonged sitting, while neck rotations through a comfortable range help maintain mobility and reduce stiffness.\n\nDoing these a few times throughout the day, rather than only once, makes the biggest difference. If tension persists despite regular stretching, it is worth having it assessed to check for underlying muscle imbalances that stretching alone will not resolve.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Sports Injury Recovery: Get Back in the Game Faster',
    categories: ['Sports Injuries'],
    excerpt: 'A structured recovery plan helps athletes return safely and confidently after an injury.',
    content:
      'Recovering from a sports injury is about more than waiting for pain to subside — a structured approach reduces the risk of re-injury and helps athletes return with confidence rather than hesitation. The process typically starts with an assessment to understand the extent of the injury and identify any compensations that may have developed while favoring the affected area.\n\nEarly-stage treatment focuses on managing pain and swelling while gently restoring range of motion, followed by a progressive strengthening program that rebuilds the muscle support around the injured area. As strength returns, sport-specific drills are introduced to retrain the movement patterns, agility, and reaction speed needed for the athlete\'s particular sport, rather than jumping straight from rehab exercises back into competition.\n\nA final return-to-sport assessment helps confirm that strength, mobility, and confidence have all recovered enough to handle the demands of play — because rushing this last step is one of the most common reasons athletes get re-injured.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'How to Improve Your Posture and Avoid Injuries',
    categories: ['Posture'],
    excerpt: 'Good posture protects your joints and muscles from unnecessary strain. Here is how to build better habits.',
    content:
      'Poor posture places uneven load on joints and muscles that were not designed to carry it, which over time contributes to pain, stiffness, and a higher risk of injury during everyday activities or exercise. The most common culprits are slouched sitting, a forward-leaning head position from screen use, and standing with weight shifted unevenly onto one leg.\n\nImproving posture starts with awareness — periodically checking that your ears, shoulders, and hips are stacked in a relatively straight line whether sitting or standing, and adjusting your workstation so you are not reaching forward or looking down for long stretches. Strengthening the core and upper back muscles gives your body the support it needs to maintain good alignment without constant conscious effort, since posture is ultimately a strength and endurance issue as much as a habit.\n\nSmall, consistent changes — adjusting your desk setup, taking regular movement breaks, and building core strength — go much further than trying to consciously "sit up straight" all day, which is difficult to sustain and rarely addresses the underlying muscle weakness.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
];

const EXTRA_BLOGS_2 = [
  {
    title: '7 Questions to Ask Before Choosing Multidisciplinary Rehab Care',
    categories: ['Physiotherapy'],
    excerpt: 'Combining physiotherapy, chiropractic, and massage can speed up recovery — if the team actually coordinates.',
    content:
      'Multidisciplinary rehab care brings together professionals such as physiotherapists, chiropractors, and massage therapists to address different aspects of a condition at once. Before committing, it is worth asking whether these providers actually communicate with each other about your progress, or whether you are simply booking separate appointments with no shared plan.\n\nOther useful questions include how your treatment plan will be sequenced between disciplines, who is responsible for tracking your overall progress, and how the team decides when a particular therapy is no longer needed. Clarity on cost and insurance coverage across multiple providers is also worth confirming upfront.\n\nWhen genuinely coordinated, multidisciplinary care can be more effective than any single approach alone — but only when there is real communication behind the scenes, not just multiple bookings under one roof.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Direct Billing and Insurance Claims: What to Ask Your Clinic',
    categories: ['Physiotherapy'],
    excerpt: 'Direct billing can save you time and upfront cost — but the details vary between clinics and providers.',
    content:
      'Direct billing allows a clinic to submit your claim straight to your insurance provider, so you are not paying out of pocket and waiting for reimbursement. Before booking, it is worth confirming which insurance providers the clinic bills directly, and what happens if your plan has an annual maximum that is close to being reached.\n\nIt also helps to ask whether the clinic will estimate your remaining coverage before treatment starts, so there are no surprises, and how they handle situations where a claim is partially declined. Some plans require a doctor\'s referral for reimbursement even if a referral is not required to book the appointment itself, so confirming this in advance avoids delays.\n\nA clinic that is upfront about these details before your first visit makes for a much smoother experience than sorting it out after treatment has already started.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Home Mobility Exercises to Start Today',
    categories: ['Physiotherapy'],
    excerpt: 'You do not need equipment to start improving mobility — a few simple exercises go a long way.',
    content:
      'Improving mobility at home does not require special equipment, just a few minutes of consistent effort each day. Gentle exercises such as cat-cow stretches for spinal mobility, standing hip circles, and controlled ankle rotations help maintain range of motion in joints that stiffen from long periods of sitting or inactivity.\n\nWorld\'s greatest stretch — a lunging position combined with a rotational reach — is a favorite among physiotherapists because it opens up the hips, spine, and shoulders in one movement. Wall slides, where you slide your arms up and down a wall while keeping contact at the wrist and elbow, help restore shoulder mobility that is often lost from desk work.\n\nThese exercises are meant to complement, not replace, a proper assessment if you are dealing with pain rather than general stiffness — but as a daily mobility habit, they are a safe and effective starting point for most people.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Movement Rehabilitation Programs Explained',
    categories: ['Physiotherapy'],
    excerpt: 'Movement rehabilitation goes beyond isolated exercises to retrain how your body moves as a whole.',
    content:
      'Movement rehabilitation focuses on retraining functional patterns — squatting, reaching, walking, twisting — rather than isolating a single muscle or joint. The idea is that pain or injury often disrupts how different parts of the body coordinate together, and lasting recovery depends on restoring that coordination, not just building strength in one spot.\n\nA typical program starts with an assessment of how you move during everyday tasks, identifying compensations that may be placing extra strain on certain areas. From there, exercises progress from basic control and stability through to more complex, functional movements that mirror the activities you actually need to perform, whether that is lifting groceries, playing a sport, or simply walking without discomfort.\n\nBecause this approach treats the body as an interconnected system, it often uncovers and addresses root causes that a narrower, symptom-focused approach might miss entirely.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'How Balance Rehabilitation Exercises Progress from Beginner to Advanced',
    categories: ['Physiotherapy'],
    excerpt: 'Balance training builds gradually — here is how a program typically advances over time.',
    content:
      'Balance rehabilitation starts by establishing a safe baseline, often with simple exercises like standing with feet together, weight shifting side to side, or single-leg stands near a wall or chair for support. These early exercises help identify specific weaknesses and build confidence before progressing further.\n\nAs stability improves, exercises introduce reduced visual input (such as standing with eyes closed briefly) or unstable surfaces like foam pads, which challenge the body\'s balance systems more directly. More advanced stages add dynamic movement — walking heel-to-toe, stepping over obstacles, or combining balance with a secondary task like catching a ball — to simulate the unpredictable demands of everyday life.\n\nProgression should always be guided by how well each stage is tolerated rather than a fixed timeline, since balance training that advances too quickly can undermine both safety and confidence.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Top Sports Injuries We See in Clinic',
    categories: ['Sports Injuries'],
    excerpt: 'From ankle sprains to tennis elbow, here are the sports injuries physiotherapists treat most often.',
    content:
      'Ankle sprains are among the most common sports injuries, typically occurring when the foot rolls inward during a change of direction or landing. Knee injuries, including ligament sprains and meniscus irritation, are frequent in sports involving pivoting or sudden stops, such as soccer or basketball.\n\nTennis and golfer\'s elbow — tendon irritation from repetitive gripping or swinging motions — show up not just in racquet sports but in many activities involving repeated forearm movement. Hamstring strains are common in sports requiring sprinting, often from insufficient warm-up or muscle imbalance, while shoulder injuries frequently affect athletes in overhead sports like swimming, volleyball, and baseball.\n\nWhat these injuries share is that early, proper assessment and a structured rehab plan generally lead to a faster and more complete return to sport than resting alone or returning to activity too soon.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'How to Relieve Chronic Lower Back Pain',
    categories: ['Chronic Pain'],
    excerpt: 'Chronic low back pain calls for a different approach than short-term flare-ups. Here is what actually helps.',
    content:
      'Chronic lower back pain — pain lasting more than three months — often behaves differently from an acute strain, and treating it the same way rarely works. Where acute pain typically responds to rest and gentle movement, chronic pain usually improves more with graded activity: gradually increasing movement and load in a way the body can tolerate, rather than avoiding activity out of fear of aggravating it.\n\nStrengthening the core and hip muscles that support the spine, combined with manual therapy to manage stiffness, forms the backbone of most treatment plans. Addressing contributing factors such as prolonged sitting, poor sleep, and stress is equally important, since chronic pain is influenced by more than just the physical structures involved.\n\nA personalized, gradually progressive plan — built around your specific triggers and tolerance — tends to produce far better long-term results than generic rest-and-wait advice.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'What Does Soft Tissue Release Recovery Look Like?',
    categories: ['Physiotherapy'],
    excerpt: 'Soft tissue release can bring quick relief, but knowing what to expect afterward helps you get the most from it.',
    content:
      'Soft tissue release combines tension and stretch to target tight, shortened muscles, and most people notice an immediate improvement in flexibility and reduced tightness right after treatment. It is common to feel mild soreness in the treated area for a day or so afterward, similar to the feeling after a deep stretch or workout.\n\nStaying hydrated and doing light movement in the following days helps the tissue settle into its improved range rather than tightening back up. For best results, soft tissue release is usually paired with a home stretching routine that reinforces the length gained during treatment, since a single session addresses the immediate restriction but ongoing habits determine whether the improvement lasts.\n\nMost people see progressive improvement over a series of sessions, especially when the underlying cause of the tightness — such as posture or repetitive movement — is addressed alongside the hands-on treatment.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Acupuncture for Pain Relief: When It May Help',
    categories: ['Acupuncture'],
    excerpt: 'Acupuncture is not a fit for every condition, but for the right cases it can be a valuable addition to treatment.',
    content:
      'Acupuncture tends to be most helpful for conditions involving muscle tension, chronic pain, and certain types of headaches, where fine needles placed at specific points help stimulate the nervous system and encourage the release of natural pain-relieving chemicals. It is often used alongside other treatments like physiotherapy or massage rather than as a stand-alone solution.\n\nPeople who have not found full relief through movement-based treatment alone, or who are looking for a drug-free option to manage flare-ups, are often good candidates to discuss acupuncture with their care provider. It is generally well tolerated, with most people describing the sensation as mild pressure rather than pain.\n\nAs with any treatment, results vary between individuals, and a qualified provider will assess whether your specific condition is likely to respond before recommending it as part of your plan.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Cupping Therapy Benefits Explained',
    categories: ['Physiotherapy'],
    excerpt: 'Cupping uses suction rather than pressure to release muscle tension — here is how it works and who it helps.',
    content:
      'Cupping therapy uses suction cups placed on the skin to lift the underlying soft tissue, which increases blood flow to the area and helps release deep muscle tension in a way that differs from traditional massage pressure. It is commonly used for chronic tightness in the back, shoulders, and neck, particularly for muscles that have not responded fully to other manual techniques.\n\nMany people find cupping helpful as a complement to massage or physiotherapy, since the lifting action reaches tissue layers that pressure-based techniques may not access as directly. Mild, temporary marks on the skin are a normal and expected result of the suction and typically fade within a week or two.\n\nCupping works best as part of a broader treatment plan rather than a stand-alone fix, particularly when tightness stems from posture or repetitive movement that also needs to be addressed.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Manual Therapy Techniques and When They Help',
    categories: ['Physiotherapy'],
    excerpt: 'Manual therapy covers a range of hands-on techniques, each suited to different problems.',
    content:
      'Manual therapy is an umbrella term covering several hands-on techniques, including joint mobilization to restore movement in a stiff joint, soft tissue massage to release tight muscles, and manipulation to address more significant joint restrictions. Each technique targets a different type of restriction, so an assessment is used to determine which approach — or combination — fits your specific presentation.\n\nJoint mobilization tends to help with stiffness following injury or prolonged immobility, while soft tissue techniques are more suited to muscle tightness and tension from overuse or posture. More targeted manipulation is generally reserved for specific joint restrictions identified through careful testing.\n\nManual therapy is most effective when paired with active exercise, since hands-on treatment addresses the immediate restriction while exercise builds the strength and control needed to prevent it from returning.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Understanding Myofascial Release for Tightness',
    categories: ['Physiotherapy'],
    excerpt: 'Myofascial release targets the connective tissue that surrounds muscles — often overlooked in typical treatment.',
    content:
      'Fascia is the connective tissue that wraps around muscles, and when it becomes tight or restricted, it can limit movement and contribute to pain even when the muscle itself is not the primary problem. Myofascial release uses slow, sustained pressure — rather than the rhythmic strokes of traditional massage — to gradually ease these restrictions.\n\nBecause fascia forms a connected network throughout the body, tightness in one area can sometimes contribute to symptoms elsewhere, which is why treatment may address a broader region than just the site of pain. Sessions are typically gentle and held for longer periods compared to other manual techniques, allowing the tissue time to respond and release.\n\nMyofascial release is often recommended for chronic, widespread tightness or pain that has not responded fully to more localized treatment approaches.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Vestibular Therapy for Dizziness and Balance',
    categories: ['Physiotherapy'],
    excerpt: 'Persistent dizziness is often treatable with the right exercises — here is how vestibular therapy works.',
    content:
      'Vestibular therapy is a specialized form of rehabilitation aimed at retraining the brain and inner ear to work together more effectively, addressing dizziness, vertigo, and balance issues at their source rather than just managing symptoms. It typically begins with an assessment to identify the specific type of vestibular problem, since different causes call for different exercise approaches.\n\nTreatment often includes gaze stabilization exercises, which train the eyes to remain steady during head movement, along with balance retraining exercises that gradually challenge stability in a controlled, progressive way. Habituation exercises — repeating movements that trigger mild dizziness in a controlled setting — help the brain adapt and reduce symptoms over time.\n\nMany people see meaningful improvement within several weeks of consistent vestibular therapy, particularly when the program is tailored to their specific type of balance or dizziness issue rather than following a generic exercise list.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Massage Therapy for Recovery, Explained',
    categories: ['Massage Therapy'],
    excerpt: 'Massage therapy plays a specific role in recovery, distinct from relaxation-focused treatments.',
    content:
      'When used for recovery rather than pure relaxation, massage therapy focuses on specific goals: reducing muscle tension that restricts movement, improving circulation to support healing, and addressing scar tissue or adhesions following injury or surgery. Techniques and pressure are adjusted based on the stage of recovery and how the tissue is responding to treatment.\n\nIn the early stages of recovery, gentler techniques help manage swelling and discomfort without overloading healing tissue, while later stages may use deeper, more targeted work to address lingering tightness or restricted movement. Recovery-focused massage is often coordinated with physiotherapy, so that the flexibility and reduced tension gained through massage translate into functional strength gains through exercise.\n\nUnlike a purely relaxation-oriented massage, recovery-focused treatment is typically part of a broader plan with specific goals and a course of sessions rather than a single one-off visit.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Chiropractic Care and Posture Correction',
    categories: ['Chiropractic Care'],
    excerpt: 'Posture-related discomfort often responds well to a combination of adjustments and postural retraining.',
    content:
      'Poor posture places uneven, sustained stress on the spine and surrounding muscles, and over time this can contribute to joint restrictions that chiropractic adjustments are well suited to address. An assessment typically examines spinal alignment, the mobility of individual segments, and which postural habits are driving the strain, such as prolonged sitting or screen use.\n\nAdjustments help restore normal joint movement and reduce the compensations the body makes around a restricted area, but lasting posture improvement usually also requires strengthening the muscles that support proper alignment and building awareness of daily habits that contribute to poor posture. Ergonomic changes to a workstation or daily routine often complement in-clinic care.\n\nCombining chiropractic care with postural exercises tends to produce more lasting results than adjustments alone, since it addresses both the immediate restriction and the underlying habits that caused it.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Is the McKenzie Method Right for Your Back Pain?',
    categories: ['Physiotherapy'],
    excerpt: 'The McKenzie Method uses movement testing to find what actually relieves your specific back pain.',
    content:
      'The McKenzie Method is a structured approach to assessing and treating spinal pain that relies on repeated movement testing to identify a "directional preference" — a specific movement or position that reduces or centralizes pain, moving it away from the limbs and toward the spine. This is particularly useful for disc-related back and neck pain, where certain positions can either worsen or relieve symptoms considerably.\n\nOnce a directional preference is identified, a home exercise program built around that specific movement becomes the primary tool for managing and reducing pain, putting a significant degree of control directly in the patient\'s hands. Unlike passive treatments, the McKenzie approach emphasizes patient education and self-management as a core part of recovery.\n\nNot every type of back pain responds to this method, which is why a proper assessment is needed first to confirm whether a directional preference exists before building a program around it.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'What Rehabilitation Wellness Programs Include',
    categories: ['Physiotherapy'],
    excerpt: 'Rehabilitation wellness programs go beyond treating an injury to building long-term resilience.',
    content:
      'Rehabilitation wellness programs extend beyond treating a specific injury, aiming to build overall strength, mobility, and resilience so the body is less likely to develop new problems down the line. These programs typically combine ongoing exercise progression, education about movement and posture, and periodic reassessment to adjust the plan as goals and fitness levels change.\n\nUnlike a short course of treatment focused on resolving one issue, a wellness program is usually longer-term and designed to fit into a person\'s regular routine, whether that means a few sessions a week at a clinic or a structured home program with periodic check-ins. Many programs also address lifestyle factors like activity levels, sleep, and stress that influence physical recovery and long-term health.\n\nThis approach suits people who have completed initial treatment for an injury and want to maintain their progress, as well as those simply looking to build a stronger, more resilient body proactively.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Understanding Your Physiotherapy Insurance Coverage',
    categories: ['Physiotherapy'],
    excerpt: 'Knowing your coverage details before you book can save confusion and unexpected costs later.',
    content:
      'Extended health plans vary widely in how they cover physiotherapy, so it is worth checking a few key details before your first appointment: your annual maximum for physiotherapy specifically, whether a doctor\'s referral is required for reimbursement, and whether your plan covers a percentage of each visit or a flat amount per session.\n\nSome plans also distinguish between different types of providers, so coverage for a registered physiotherapist may differ from coverage for massage therapy or chiropractic care under the same overall plan. It is also useful to ask your clinic whether they can verify your coverage electronically before treatment starts, which avoids surprises when the claim is submitted.\n\nKeeping track of how much of your annual maximum you have used throughout the year helps you plan ongoing treatment and avoid an unexpected gap in coverage partway through a course of care.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Avoiding Common Mistakes in Follow-Up Care After Physiotherapy',
    categories: ['Physiotherapy'],
    excerpt: 'What you do between and after appointments matters just as much as the sessions themselves.',
    content:
      'One of the most common mistakes after physiotherapy is stopping home exercises as soon as pain improves, rather than completing the full program needed to build lasting strength and prevent recurrence. Pain relief is often the first sign of progress, not the final goal, and stopping too early is a leading reason symptoms return.\n\nOther common mistakes include skipping follow-up appointments meant to progress the exercise plan, returning to high-demand activities too quickly without a gradual buildup, and not communicating clearly with your therapist when something feels off, which can delay necessary adjustments to your plan. Inconsistent effort with home exercises — doing them sporadically rather than as prescribed — also significantly slows progress.\n\nStaying engaged with the full course of care, including the parts that happen outside the clinic, is often what separates a full, lasting recovery from a partial one that resurfaces later.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', public_id: '' },
    status: 'published',
  },
  {
    title: 'Physiotherapist, Chiropractor, or RMT: Who Should You See?',
    categories: ['Physiotherapy'],
    excerpt: 'These three professions often overlap, but each brings a different focus to your care.',
    content:
      'Physiotherapists focus on restoring movement and function through exercise-based rehabilitation and manual therapy, making them well suited to injuries, post-surgical recovery, and conditions affecting how the body moves. Chiropractors specialize in the diagnosis and treatment of the musculoskeletal system, particularly the spine, often using joint adjustments to address alignment and mobility issues.\n\nRegistered massage therapists (RMTs) focus specifically on soft tissue — muscles, tendons, and fascia — using hands-on techniques to relieve tension, improve circulation, and support relaxation and recovery. In practice, these professions frequently overlap and work well together: a physiotherapist might address strength and movement patterns while an RMT manages surrounding muscle tension, or a chiropractor addresses joint restriction that is limiting a physiotherapy exercise program.\n\nRather than choosing one over the others, many patients get the best results from a coordinated combination based on what their specific condition actually needs.',
    featuredImage: { secure_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop', public_id: '' },
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
      'At Markham Pain Clinic, braces are an important part of managing joint strain, improving movement, and supporting recovery. Whether you are dealing with an injury, ongoing discomfort, or need added stability during daily activities, the right brace can make a noticeable difference in how you move and function.',
    whatIsIt:
      'Braces are supportive devices designed to stabilize joints, limit harmful movement, and reduce strain on muscles and ligaments. They are commonly used for areas such as the knee, ankle, wrist, elbow, and back. These devices are made from durable yet comfortable materials that provide structured support without restricting necessary motion. Depending on the condition, braces may be soft and flexible or more rigid for stronger support.',
    howItWorks: [
      {
        title: 'How Braces Work',
        description:
          'Braces function by holding a joint in proper alignment while allowing safe movement. This helps reduce stress on injured or weakened tissues. By controlling motion, braces can prevent further strain and support natural recovery processes. They also improve body awareness by helping you maintain proper posture and movement patterns, which is especially useful during physical activity or while returning to regular routines after an injury.',
      },
    ],
    conditionsSupported: ['Stabilize joints during movement', 'Reduce excessive or harmful motion', 'Support muscles and ligaments', 'Improve posture and alignment', 'Help manage swelling and strain'],
    keyFeatures: [
      { title: 'Knee Braces', description: 'Used for ligament injuries, arthritis, or post-surgical support. These braces help maintain knee alignment and reduce pressure during walking or exercise.' },
      { title: 'Ankle Braces', description: 'Provide stability for weak or injured ankles, often used after sprains or for ongoing instability.' },
      { title: 'Wrist and Hand Braces', description: 'Helpful for conditions such as repetitive strain or carpal tunnel issues. They keep the wrist in a neutral position to reduce stress.' },
      { title: 'Back Braces', description: 'Support the lower back and improve posture, especially for individuals dealing with strain from lifting or prolonged sitting.' },
      { title: 'Elbow Braces', description: 'Commonly used for tendon-related discomfort, helping reduce strain during arm movements.' },
    ],
    whoCanBenefit: [
      { title: 'Recent Injury', description: 'You have recently experienced a joint injury, or feel instability or weakness in a joint.' },
      { title: 'Returning to Activity', description: 'You are returning to physical activity after time off, or perform repetitive tasks that strain certain areas.' },
      { title: 'Sports and Exercise', description: 'You want added support during sports or exercise, or experience discomfort from conditions like arthritis.' },
    ],
    safetyTips: [
      { title: 'When to Start Using a Brace', description: 'It is important not to wait until discomfort becomes severe. Early use of a brace can help prevent worsening of a condition and support safer movement.' },
      { title: 'Choosing the Right Brace', description: 'Selecting the correct brace is important to ensure proper support and comfort. Our recommendation is based on your condition, activity level, and goals — considering the type and location of the issue, level of support required, daily activity demands, and fit preferences.' },
    ],
    benefits: [
      'Improved stability — helps keep joints secure, reducing the risk of sudden or awkward movements',
      'Reduced strain — distributes pressure more evenly across affected areas',
      'Enhanced confidence in movement during daily tasks and physical activities',
      'Support during recovery while allowing controlled movement',
      'Versatile use for injury management, prevention, and general support',
    ],
    whyChooseUs: [
      { title: 'Professional Assessment', description: 'Our team evaluates your condition and recommends a brace suited to your situation, rather than a generic option.' },
      { title: 'Proper Fitting', description: 'We ensure that the brace fits correctly, which is essential for comfort and function.' },
      { title: 'Quality Products', description: 'We provide reliable braces designed for durability and consistent support.' },
      { title: 'Ongoing Support', description: 'If adjustments are needed or your condition changes, we are available to assist and guide you.' },
      { title: 'Integrated Care Approach', description: 'Braces can be combined with other services at our clinic, helping you stay active while addressing underlying concerns.' },
    ],
    closingText:
      'If you are looking for reliable joint support, braces from Markham Pain Clinic can help you move with greater stability and confidence. Our team will help you choose the right option based on your needs and daily routine. Contact us today or visit our clinic to explore available braces and find the right fit for your lifestyle.',
  },
  {
    name: 'Massager',
    price: '',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
    description: 'Practical handheld and electronic massagers to ease muscle tension and support daily recovery.',
    intro:
      'A massager is a practical device designed to ease muscle tension, improve circulation, and support recovery after daily strain. Whether you spend long hours sitting, standing, or engaging in physical activity, muscle discomfort can build up over time. Using a massager regularly can help maintain muscle comfort and mobility without needing frequent clinic visits. At Markham Pain Clinic, we provide high-quality massagers that fit easily into your routine, helping you stay active and comfortable throughout the day.',
    whatIsIt:
      'A massager is an electronic or manual device that applies targeted pressure, vibration, or percussion to muscles and soft tissues. These devices are created to mimic hands-on techniques commonly used in physiotherapy settings.',
    howItWorks: [
      { title: 'Vibration', description: 'Gentle oscillations that stimulate blood flow.' },
      { title: 'Percussion', description: 'Rapid pulses that reach deeper muscle layers.' },
      { title: 'Rolling or Kneading', description: 'Motions that simulate hand pressure.' },
    ],
    keyFeatures: [
      { title: 'Adjustable Intensity Levels', description: 'Most devices allow you to control speed and pressure, making them suitable for both light relaxation and deeper muscle work.' },
      { title: 'Ergonomic Design', description: 'Comfortable grips and lightweight structures make it easy to reach different areas of the body, including the back, shoulders, and legs.' },
      { title: 'Interchangeable Heads', description: 'Different attachments target specific muscle groups, offering versatility for full-body use.' },
      { title: 'Portable and Convenient', description: 'Compact designs let you use the massager at home, at work, or even while travelling.' },
    ],
    whoCanBenefit: [
      { title: 'Office Workers', description: 'Sitting for extended periods can lead to stiffness in the neck, shoulders, and lower back. A massager can help keep these areas relaxed.' },
      { title: 'Active Individuals', description: 'Those who exercise regularly may experience muscle soreness or fatigue. Using a massager post-workout can support recovery.' },
      { title: 'Individuals with Daily Physical Strain', description: 'Jobs that involve lifting, standing, or repetitive movements can cause ongoing muscle tension.' },
      { title: 'Older Adults', description: 'Gentle use can help maintain circulation and reduce stiffness in commonly affected areas.' },
    ],
    commonUses: [
      { title: 'Muscle Tension Reduction', description: 'Helps ease tight areas caused by stress or physical activity.' },
      { title: 'Post-Activity Recovery', description: 'Supports muscles after exercise by promoting circulation.' },
      { title: 'Improved Flexibility', description: 'Looser muscles can move more freely, which supports daily movement.' },
      { title: 'Relaxation', description: 'Using a massager can help you unwind after a long day, supporting overall comfort.' },
    ],
    safetyTips: [
      { title: 'Start with Low Intensity', description: 'Begin with a gentle setting and gradually increase based on comfort.' },
      { title: 'Focus on Key Areas', description: 'Target areas where you feel tightness, such as shoulders, calves, or lower back.' },
      { title: 'Limit Session Duration', description: 'Use the device for short sessions (10–15 minutes per area) to avoid overuse.' },
      { title: 'Avoid Sensitive Areas', description: 'Do not use directly on joints, bones, or injured regions without professional advice.' },
    ],
    benefits: [
      'Helps maintain muscle comfort between clinic visits',
      'Easy to use at home or on the go',
      'Supports circulation and muscle relaxation',
      'Reduces stiffness caused by daily habits',
      'Encourages consistent muscle care',
    ],
    whyChooseUs: [
      { title: 'Carefully Selected Products', description: 'Our massagers are selected for quality, durability, and usability.' },
      { title: 'In-Clinic Support', description: 'Our team can help you understand how to use the device correctly for your specific needs.' },
      { title: 'Practical Advice', description: 'We help you integrate the massager into your routine in a way that complements your daily activities.' },
    ],
    closingText:
      'If you’re looking for a simple and effective way to manage muscle tension and stay active, a massager can be a valuable addition to your routine. Visit Markham Pain Clinic to explore our selection and find a device that fits your needs. Contact us today or stop by the clinic to get started with a massager that supports your daily comfort and mobility.',
  },
  {
    name: 'TENS Unit',
    price: '',
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop',
    description: 'Portable TENS (electrical nerve stimulation) devices for drug-free, on-demand pain relief.',
    intro:
      'A Transcutaneous Electrical Nerve Stimulation (TENS) unit is a compact, battery-powered device that sends low-voltage electrical impulses through the skin to targeted areas of the body. These impulses are delivered through adhesive electrode pads placed on the skin near the area of discomfort. TENS units are widely used in clinical and home settings as a non-invasive option to manage various types of physical discomfort. At Markham Pain Clinic, we provide reliable TENS units along with clear instructions to help you use them safely and effectively.',
    whatIsIt:
      'A TENS unit sends low-voltage electrical currents through electrode pads placed on the skin near the area of pain. These impulses can interrupt pain signals travelling to the brain and encourage the release of natural pain-relieving endorphins.',
    howItWorks: [
      { title: 'Nerve Signal Modulation', description: 'The device sends mild electrical pulses that interact with the nervous system. These signals can reduce the transmission of discomfort signals to the brain, making the sensation more manageable during daily activities.' },
      { title: 'Muscle Stimulation', description: 'In some settings, the electrical pulses can gently activate muscles, which may help reduce tightness and improve local circulation.' },
      { title: 'Adjustable Settings', description: 'Most TENS units allow users to control intensity, pulse rate, and duration. This flexibility helps you find a comfortable level suited to your needs.' },
    ],
    conditionsSupported: ['Back and neck discomfort', 'Joint stiffness', 'Muscle soreness after physical activity', 'Sports-related strain', 'Postural tension from long hours of sitting', 'Recovery support after minor injuries'],
    keyFeatures: [
      { title: 'Portable and Lightweight Design', description: 'Our TENS units are easy to carry and can be used at home, work, or while travelling.' },
      { title: 'Multiple Intensity Levels', description: 'You can adjust the strength of the electrical pulses to match your comfort level.' },
      { title: 'Pre-Set Programs', description: 'Many units include built-in modes designed for different body areas such as the back, shoulders, and legs.' },
      { title: 'Reusable Electrode Pads', description: 'High-quality adhesive pads ensure consistent contact with the skin and can be reused multiple times with proper care.' },
      { title: 'Simple Controls', description: 'Clear buttons and display screens make operation straightforward, even for first-time users.' },
    ],
    whoCanBenefit: [
      { title: 'Individuals with Ongoing Discomfort', description: 'People dealing with recurring muscle or joint issues may find TENS units helpful as part of their routine.' },
      { title: 'Office Workers and Sedentary Lifestyles', description: 'Long hours at a desk can lead to tension in the neck, shoulders, and lower back. A TENS unit can be used during breaks to ease these areas.' },
      { title: 'Active Individuals and Athletes', description: 'After intense workouts or sports activities, a TENS unit can support muscle recovery and relaxation.' },
      { title: 'Older Adults', description: 'For those managing age-related stiffness, a TENS unit offers a simple and non-invasive option that can be used at home.' },
    ],
    safetyTips: [
      { title: 'Placement of Pads', description: 'Electrode pads should be placed around the area of concern, not directly on joints or broken skin. Our clinic team will guide you on proper placement.' },
      { title: 'Session Duration', description: 'Typical sessions last 15–30 minutes, depending on your comfort and needs.' },
      { title: 'Consistency', description: 'Regular use, as advised by a physiotherapist, can help you get the most out of the device.' },
      { title: 'When to Avoid Use', description: 'TENS units should not be used by individuals with pacemakers or certain medical conditions without professional advice. Always consult with a qualified provider before starting.' },
    ],
    benefits: ['Drug-free pain management', 'Convenient for use at home', 'Non-invasive and easy to apply', 'Complements ongoing physiotherapy treatment'],
    whyChooseUs: [
      { title: 'Professional Support', description: 'When you purchase from our clinic, you receive clear instructions on setup, pad placement, and usage, so you start using the device correctly from day one.' },
      { title: 'Carefully Selected Devices', description: 'We stock reliable TENS units that meet clinical standards for safety and performance.' },
      { title: 'Ongoing Assistance', description: 'If you have questions about settings, usage, or maintenance, our team is available to help.' },
      { title: 'Integrated Care Approach', description: 'We help you incorporate the device into a structured plan that may include physiotherapy and movement strategies.' },
    ],
    closingText:
      'If you are looking for a practical, non-invasive way to manage muscle and joint discomfort, a TENS unit can be a valuable addition to your routine. Visit Markham Pain Clinic to explore available options and get clear instructions on how to use the device effectively. Contact us or visit the clinic today to purchase your TENS unit and start managing discomfort.',
  },
  {
    name: 'Hot and Cold Pack',
    price: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    description: 'Reusable hot and cold therapy packs to reduce swelling, ease stiffness, and soothe sore muscles.',
    intro:
      'Managing muscle soreness, swelling, or stiffness can be challenging, especially with a busy routine. A hot and cold pack is a simple, practical solution used in clinics and at home to help manage discomfort, reduce swelling, and support recovery after physical strain or injury. At Markham Pain Clinic, we provide high-quality hot and cold packs that are easy to use and suitable for a wide range of conditions.',
    whatIsIt:
      'A hot and cold pack is a reusable therapy pack that delivers both heat and cold applications as needed. It is typically filled with a gel or material that retains temperature for extended periods. You can place the pack in a freezer for cold use, or warm it in hot water or in the microwave for heat application — a dual-purpose design that makes it a convenient addition to any home care routine.',
    howItWorks: [
      { title: 'Cold Therapy (Cryotherapy)', description: 'Cold application helps constrict blood vessels in the affected area. This can reduce swelling, inflammation, and discomfort, especially after an injury or physical activity — commonly used for recent injuries such as sprains or strains, swelling in joints, post-workout soreness, and minor bruising.' },
      { title: 'Heat Therapy (Thermotherapy)', description: 'Heat application increases blood flow to the targeted area, helping relax tight muscles and reduce stiffness — often used for muscle tightness, joint stiffness, chronic aches, and tension in the neck or back.' },
    ],
    keyFeatures: [
      { title: 'Dual Temperature Use', description: 'One pack serves both hot and cold purposes, making it versatile for different conditions.' },
      { title: 'Flexible Design', description: 'Even when chilled, the pack remains flexible, allowing it to contour to different parts of the body, such as the knee, shoulder, or lower back.' },
      { title: 'Reusable and Durable', description: 'The pack is built for repeated use without losing effectiveness, making it a cost-efficient option.' },
      { title: 'Safe and Easy Application', description: 'Simple instructions make it easy to prepare the pack for either hot or cold use within minutes.' },
      { title: 'Portable and Convenient', description: 'Lightweight and easy to carry, it can be used at home, at work, or after physical activity.' },
    ],
    whoCanBenefit: [
      { title: 'Office Workers', description: 'Suitable for those experiencing neck or back tension from long hours at a desk.' },
      { title: 'Athletes', description: 'Helpful for managing post-exercise soreness.' },
      { title: 'Recovering Individuals', description: 'Suitable for those recovering from minor injuries or with joint stiffness and muscle tightness.' },
      { title: 'Seniors', description: 'A simple way to help maintain mobility.' },
    ],
    commonUses: [
      { title: 'Managing Work-Related Strain', description: 'A heat application at the end of the day can help relax stiffness in the neck, shoulders, and lower back.' },
      { title: 'Post-Workout Recovery', description: 'Using a cold pack can help reduce swelling after exercise, while heat can be used later to ease tension.' },
      { title: 'Minor Injuries at Home', description: 'Applying cold therapy early to small sprains or bumps can help manage swelling and discomfort.' },
      { title: 'Chronic Muscle Tightness', description: 'For ongoing stiffness, especially in colder weather, heat application can support flexibility and comfort.' },
    ],
    safetyTips: [
      { title: 'For Cold Use', description: 'Place the pack in the freezer for at least 1–2 hours, wrap it in a cloth before applying it to the skin, and apply for 10–15 minutes at a time.' },
      { title: 'For Heat Use', description: 'Warm the pack in the microwave or in hot water (follow instructions carefully), ensure it is not too hot before applying, and use for 15–20 minutes.' },
      { title: 'General Safety', description: 'Do not apply directly to bare skin without a barrier, avoid prolonged use in one session, and consult a healthcare provider if unsure about use for specific conditions.' },
    ],
    benefits: ['Reduces swelling and inflammation', 'Eases muscle stiffness and tension', 'Affordable, reusable at-home care', 'Simple to fit into daily recovery routines'],
    whyChooseUs: [
      { title: 'Quality You Can Trust', description: 'Our products are selected based on performance, durability, and ease of use.' },
      { title: 'Professional Insight', description: 'Our team can guide you on when to use heat or cold based on your condition or routine.' },
      { title: 'Convenient Access', description: 'Our clinic makes it easy to pick up your product and get quick advice in one visit.' },
      { title: 'Support Beyond Purchase', description: 'We help you understand how to use the product effectively as part of your daily routine or recovery plan.' },
    ],
    closingText:
      'A hot and cold pack is a practical tool for managing muscle and joint discomfort without complicated steps. Visit Markham Pain Clinic to get your hot and cold pack today — our team is ready to help you choose the right option and show you how to use it effectively.',
  },
  {
    name: 'Pain Relief Creams',
    price: '',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
    description: 'Topical pain relief creams for targeted, on-the-spot muscle and joint comfort.',
    intro:
      'Pain relief creams are widely used for managing muscle soreness, joint discomfort, and stiffness in daily life. At Markham Pain Clinic, we provide carefully selected creams that support recovery, improve mobility, and help individuals stay active without relying only on oral options.',
    whatIsIt:
      'Pain relief creams are topical products applied directly to the skin over affected areas. They are formulated with active ingredients that interact with the skin and underlying tissues to reduce discomfort and improve circulation in the targeted region. Unlike oral products, these creams work locally — focusing on specific areas such as the neck, shoulders, back, knees, or ankles without affecting the entire body.',
    howItWorks: [
      { title: 'Targeted Action at the Source', description: 'When applied to the skin, the cream’s ingredients penetrate the surface and begin working on the tissues beneath. Depending on the formulation, they may create a warming or cooling sensation that helps distract from discomfort while supporting muscle relaxation.' },
      { title: 'Common Active Ingredients', description: 'Most creams include menthol (a cooling effect), capsaicin (a warming sensation that reduces sensitivity over time), camphor (stimulates nerve endings to ease discomfort), and anti-inflammatory compounds that help reduce swelling and stiffness.' },
      { title: 'Fast Absorption', description: 'These creams are designed to absorb quickly into the skin without leaving a heavy or greasy residue, allowing users to resume their daily routine shortly after application.' },
    ],
    keyFeatures: [
      { title: 'Non-Greasy Formulation', description: 'Our creams are selected for their smooth texture and quick absorption. They do not leave stains on clothing and are easy to apply throughout the day.' },
      { title: 'Suitable for Daily Use', description: 'They can be used as part of a regular routine, whether after physical activity, during work breaks, or before rest.' },
      { title: 'Easy Application', description: 'The creams come in user-friendly packaging, making it simple to apply the right amount directly to the affected area.' },
      { title: 'Versatile Use', description: 'They can be applied to the neck and shoulders, lower back, knees and joints, arms and legs.' },
    ],
    whoCanBenefit: [
      { title: 'Individuals with Muscle Soreness', description: 'People who experience soreness after exercise, long work hours, or physical strain can benefit from topical application.' },
      { title: 'Office Workers', description: 'Sitting for extended periods often leads to stiffness in the neck, shoulders, and lower back — these creams can be applied during breaks to ease tension.' },
      { title: 'Active Individuals', description: 'Those involved in sports or fitness routines may use these creams to support recovery after activity.' },
      { title: 'Older Adults', description: 'Joint stiffness and reduced mobility are common with age. Pain relief creams provide a simple way to manage these concerns.' },
    ],
    commonUses: [
      { title: 'After Physical Activity', description: 'Applying the cream after exercise can help relax muscles and reduce post-activity soreness.' },
      { title: 'During Daily Routine', description: 'If discomfort builds up during the day, a small application can help maintain comfort and movement.' },
      { title: 'Before Rest', description: 'Using the cream before bedtime may help ease tension and support a more comfortable night.' },
    ],
    safetyTips: [
      { title: 'Follow Instructions', description: 'Always read the label and apply only the recommended amount.' },
      { title: 'Avoid Sensitive Areas', description: 'Do not apply the cream to broken skin, eyes, or sensitive regions.' },
      { title: 'Wash Hands After Use', description: 'This prevents accidental contact with sensitive areas.' },
      { title: 'Test Before Regular Use', description: 'Apply a small amount first to check for any skin reaction.' },
    ],
    benefits: ['Direct application exactly where it is needed', 'Quick soothing, cooling, or warming sensation within minutes', 'Convenient — no need for water or additional steps', 'Complements physiotherapy sessions between visits'],
    whyChooseUs: [
      { title: 'Carefully Selected Products', description: 'We stock creams that meet quality standards and are suitable for a wide range of users. Each product is chosen with patient needs in mind.' },
      { title: 'Professional Insight', description: 'Our team understands how different conditions affect the body and can help you choose a cream that aligns with your needs and daily activities.' },
      { title: 'Integrated Care Approach', description: 'We combine physiotherapy services with practical tools, such as pain-relief creams, to support consistent progress.' },
      { title: 'Trusted Local Clinic', description: 'We serve individuals looking for reliable options to manage discomfort and maintain an active lifestyle.' },
    ],
    closingText:
      'Pain relief creams can play a simple yet effective role in daily care. Visit Markham Pain Clinic, speak with our team, explore available options, and find a product that supports your daily routine. Contact us today or visit the clinic to purchase your pain relief cream and take the next step toward staying active and comfortable.',
  },
  {
    name: 'Custom Made Orthotics',
    price: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    description: 'Custom-fitted orthotic insoles designed around your foot shape, gait, and specific condition.',
    intro:
      'Custom-made orthotics are designed to support the structure of your feet and improve your movement throughout the day. At Markham Pain Clinic, these devices are created to match your unique foot shape, helping address discomfort, alignment issues, and strain that can affect your daily routine.',
    whatIsIt:
      'Custom-made orthotics are inserts placed inside your shoes to support and align your feet. Unlike over-the-counter insoles, these are crafted based on a detailed assessment of your foot mechanics, posture, and walking pattern. By improving how your feet function, orthotics can also influence how your ankles, knees, hips, and lower back perform during movement.',
    howItWorks: [
      { title: 'Foot Assessment and Analysis', description: 'The process begins with a detailed evaluation — examining your walking pattern, checking foot posture, and identifying pressure points. Advanced scanning or casting methods are used to capture the exact shape of your feet.' },
      { title: 'Precision Design and Fabrication', description: 'Based on the assessment, orthotics are crafted to match your specific needs, considering arch type, pressure distribution, and daily activities. Materials are selected to provide the right balance of support and flexibility.' },
      { title: 'Ongoing Support During Use', description: 'Once placed inside your footwear, orthotics help guide your feet into a more stable position, reducing strain on muscles and joints and making everyday activities more comfortable.' },
    ],
    conditionsSupported: ['Plantar fasciitis', 'Flat feet or fallen arches', 'High arches', 'Heel pain', 'Shin splints', 'Knee strain related to alignment issues', 'Lower back discomfort linked to posture'],
    keyFeatures: [
      { title: 'Individualized Fit', description: 'Each pair is created specifically for your feet, ensuring accurate support and alignment that standard insoles cannot match.' },
      { title: 'Durable Materials', description: 'High-quality materials are used to ensure the orthotics maintain their structure over time, even with daily use.' },
      { title: 'Versatility Across Footwear', description: 'Orthotics can be designed to fit different types of shoes, including athletic footwear, work shoes, and casual wear.' },
      { title: 'Improved Stability', description: 'By supporting the arches and correcting imbalances, orthotics improve stability during movement.' },
    ],
    whoCanBenefit: [
      { title: 'Individuals with Foot Discomfort', description: 'People dealing with conditions such as plantar fasciitis, flat feet, or high arches often find orthotics helpful in managing strain and improving support.' },
      { title: 'Active Individuals and Athletes', description: 'Running, sports, and other physical activities repeatedly stress the feet. Orthotics can help improve alignment and reduce the risk of overuse injuries.' },
      { title: 'Those with Joint or Postural Concerns', description: 'Individuals experiencing knee, hip, or lower back discomfort may benefit from improved foot positioning.' },
      { title: 'People Who Stand for Long Hours', description: 'Orthotics help distribute weight more evenly, making extended standing more manageable.' },
    ],
    safetyTips: [
      { title: 'Gradual Adaptation', description: 'It may take a short period to get used to wearing orthotics. Most people begin with a few hours per day and gradually increase usage.' },
      { title: 'Maintenance and Care', description: 'Keeping your orthotics clean and using them in appropriate footwear helps maintain their effectiveness over time.' },
    ],
    benefits: ['Improved foot and gait alignment', 'Reduced strain on knees, hips, and back', 'Personalized fit for lasting comfort', 'Supports long-term movement health'],
    whyChooseUs: [
      { title: 'Thorough Assessment Process', description: 'The process begins with a detailed evaluation to ensure your orthotics are based on accurate findings rather than general assumptions.' },
      { title: 'Integrated Approach to Care', description: 'Orthotics are often combined with other therapies available at the clinic, creating a well-rounded plan that supports your mobility and function.' },
      { title: 'Focus on Functional Improvement', description: 'The goal is not just to provide inserts but to support your body’s overall movement, helping you stay active in daily life.' },
      { title: 'Ongoing Support and Adjustments', description: 'Follow-up visits allow for adjustments if needed, ensuring your orthotics continue to meet your needs as your activity levels or condition change.' },
    ],
    closingText:
      'If foot discomfort or alignment issues are affecting your daily routine, custom-made orthotics may help improve your movement and overall comfort throughout the day. Visit Markham Pain Clinic to get started with a detailed assessment and find a solution suited to your needs. Contact our clinic today to get your custom-made orthotics and learn how they can support your everyday activities.',
  },
  {
    name: 'Posture Corrector Brace',
    price: '',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop',
    description: 'Supportive posture brace that gently pulls the shoulders back to encourage proper spinal alignment.',
    intro:
      'Maintaining proper posture is essential for daily comfort, mobility, and overall physical function. A posture corrector brace is designed to support your upper body, promote proper alignment, and reduce strain from prolonged sitting, standing, or repetitive movements. At Markham Pain Clinic, this product is selected to help individuals improve posture habits and support their everyday activities with greater ease.',
    whatIsIt:
      'A posture corrector brace is a wearable support device that gently aligns the shoulders and upper spine into a more natural position. It is typically made from lightweight, breathable materials and worn around the shoulders and upper back, either over or under clothing. This brace works by applying gentle tension that encourages you to keep your shoulders back and spine aligned, building awareness of posture over time.',
    howItWorks: [
      { title: 'Gentle Alignment Support', description: 'The brace repositions the shoulders and upper back into a neutral alignment, reducing slouching and forward head posture — common issues linked to desk work and device use.' },
      { title: 'Muscle Engagement', description: 'Rather than forcing a rigid posture, the brace encourages your muscles to stay active, helping strengthen postural muscles over time and support improved body mechanics.' },
      { title: 'Daily Habit Reinforcement', description: 'Wearing the brace regularly helps train your body to recognize proper posture. As awareness increases, you naturally begin to sit and stand with improved alignment.' },
    ],
    keyFeatures: [
      { title: 'Adjustable Fit', description: 'The brace features adjustable straps to ensure a secure, comfortable fit for various body types.' },
      { title: 'Lightweight and Breathable Material', description: 'Designed for daily wear, the material allows airflow and minimizes discomfort during extended use.' },
      { title: 'Discreet Design', description: 'It can be worn under clothing, making it suitable for use at work, home, or while on the go.' },
      { title: 'Easy to Use', description: 'Simple fastening mechanisms make it easy to put on and remove without assistance.' },
      { title: 'Durable Construction', description: 'Built to withstand regular use, the brace maintains its structure and support over time.' },
    ],
    whoCanBenefit: [
      { title: 'Office Workers and Students', description: 'Long hours at a desk can lead to rounded shoulders and upper back strain. This brace helps counteract those effects by promoting upright positioning.' },
      { title: 'Individuals with Neck and Upper Back Strain', description: 'Poor posture often contributes to discomfort in the neck, shoulders, and upper spine. This product helps reduce stress in these areas.' },
      { title: 'Active Individuals', description: 'Proper posture plays a key role in improving movement efficiency and preventing injury, whether you exercise regularly or engage in physical work.' },
      { title: 'People Recovering from Postural Imbalances', description: 'This brace can support gradual correction alongside professional care if you’ve developed poor posture habits over time.' },
    ],
    safetyTips: [
      { title: 'Start Gradually', description: 'Begin by wearing the brace for short periods, such as 20–30 minutes per day, and gradually increase usage as your body adapts.' },
      { title: 'Combine with Movement', description: 'Incorporate stretching and strengthening exercises to support posture improvement.' },
      { title: 'Avoid Overdependence', description: 'The goal is to build natural posture control, so balance usage with active muscle engagement.' },
    ],
    benefits: ['Improved spinal alignment, reducing strain on joints and muscles', 'Reduced muscle fatigue from even weight distribution', 'Enhanced confidence from standing and sitting upright', 'Support for everyday activities — work, walking, or relaxing'],
    whyChooseUs: [
      { title: 'Professional Assessment', description: 'Our team evaluates your posture and movement patterns to help you select the right brace.' },
      { title: 'Quality You Can Rely On', description: 'We provide products that meet high standards for comfort, durability, and functionality.' },
      { title: 'Ongoing Support', description: 'If you have questions about usage or fit, our clinic is available to assist you.' },
      { title: 'Integrated Care Approach', description: 'The brace can complement other services available at our clinic, helping you work toward improved posture and function.' },
    ],
    closingText:
      'A posture corrector brace can be a practical addition to your daily routine, helping you stay aligned, reduce strain, and build healthier posture habits over time. Visit Markham Pain Clinic to explore our posture corrector brace and find the right fit for your needs. Contact our clinic today or stop by to speak with our team and take the first step toward improving your posture.',
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

  let extraBlogsCreated = 0;
  for (const post of EXTRA_BLOGS) {
    const existing = await Blog.findOne({ title: post.title });
    if (existing) continue;
    const slug = await generateUniqueSlug(Blog, post.title);
    await Blog.create({ ...post, slug, publishedAt: new Date() });
    extraBlogsCreated += 1;
  }
  if (extraBlogsCreated > 0) console.log(`${extraBlogsCreated} additional blog posts created`);
  else console.log('Additional blog posts already exist, skipping');

  let extraBlogs2Created = 0;
  for (const post of EXTRA_BLOGS_2) {
    const existing = await Blog.findOne({ title: post.title });
    if (existing) continue;
    const slug = await generateUniqueSlug(Blog, post.title);
    await Blog.create({ ...post, slug, publishedAt: new Date() });
    extraBlogs2Created += 1;
  }
  if (extraBlogs2Created > 0) console.log(`${extraBlogs2Created} more blog posts created`);
  else console.log('Second batch of blog posts already exist, skipping');

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
      // Only backfill when the detail content is still missing — avoids
      // clobbering any edits made later through the admin Products manager.
      if (!existing.whatIsIt) {
        existing.description = product.description;
        existing.intro = product.intro;
        existing.whatIsIt = product.whatIsIt;
        existing.howItWorks = product.howItWorks || [];
        existing.keyFeatures = product.keyFeatures || [];
        existing.whoCanBenefit = product.whoCanBenefit || [];
        existing.commonUses = product.commonUses || [];
        existing.conditionsSupported = product.conditionsSupported || [];
        existing.safetyTips = product.safetyTips || [];
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

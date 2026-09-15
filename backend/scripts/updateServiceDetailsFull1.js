// Full, non-condensed rewrite for the first 8 services — keeps every
// bullet/section from the client-provided copy instead of trimming it.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const DETAILS = [
  {
    slug: 'physiotherapy',
    description: 'Living with discomfort, stiffness, or limited movement can affect every part of your routine. At Remarkable Physiotherapy, the focus is on helping you move with ease, restore strength, and return to the activities that matter to you. Whether you’re dealing with an injury, recovering after surgery, or managing ongoing physical challenges, Physiotherapy plays a key role in improving how your body performs.',
    howItWorks: [
      { title: 'What Is Physiotherapy?', description: 'A hands-on, movement-based approach that supports recovery, mobility, and physical function. It looks at how your body moves and identifies areas that need attention, such as weak muscles, tight joints, or poor posture habits.' },
      { title: 'For Office Workers', description: 'Address posture-related strain and stiffness caused by prolonged sitting.' },
      { title: 'For Active Individuals', description: 'Improve performance, flexibility, and recovery after physical activity.' },
      { title: 'For Older Adults', description: 'Maintain mobility, balance, and strength for everyday independence.' },
    ],
    benefits: ['Reduce discomfort and stiffness', 'Improve flexibility and joint movement', 'Build strength and stability', 'Restore normal movement patterns', 'Support recovery after injury or surgery', 'Increased strength', 'Reduced risk of re-injury', 'Better posture and alignment'],
    whoCanBenefit: ['Musculoskeletal issues: back and neck discomfort, shoulder/knee/hip concerns, muscle strains and ligament sprains', 'Injury recovery: sports-related injuries, workplace injuries, post-accident rehabilitation', 'Post-surgical rehabilitation: joint replacement recovery, ligament repair recovery, mobility restoration after procedures', 'Chronic conditions: arthritis-related stiffness, ongoing joint or muscle discomfort, reduced mobility due to aging or inactivity'],
    conditionsTreated: ['Back and neck discomfort', 'Shoulder, knee and hip concerns', 'Muscle strains and ligament sprains', 'Sports-related and workplace injuries', 'Post-surgical rehabilitation', 'Arthritis-related stiffness'],
    treatmentProcess: [
      'Assessment and Planning — a structured plan is created to address your specific needs, focusing on restoring movement, improving strength, and preventing further issues',
      'Hands-On Techniques — manual therapy may be used to improve joint mobility, reduce stiffness, and support muscle function, applied carefully based on your condition',
      'Exercise and Movement Training — guided through exercises designed to improve flexibility, strength, and coordination, shared so you can continue them at home',
      'Progress Tracking — your progress is regularly monitored, and adjustments are made as your body responds to treatment',
    ],
    whyChooseUs: [
      { title: 'One-on-One Attention', description: 'Each session is focused entirely on your needs, ensuring you receive consistent care and proper attention throughout your visits.' },
      { title: 'Clear and Practical Approach', description: 'You’ll always know what’s being done and why. The goal is to keep things straightforward so you can stay involved in your progress.' },
      { title: 'Focus on Real-Life Movement', description: 'Treatment plans are built around your daily activities, whether it’s work, sports, or household tasks.' },
      { title: 'Support Beyond the Clinic', description: 'You’ll receive guidance on exercises and habits to follow at home, helping you maintain progress even outside your sessions.' },
    ],
    closingText: 'Taking the first step toward improved movement and strength can make a noticeable difference in your daily life. At Remarkable Physiotherapy, the focus is on helping you move freely, build strength, and return to what you enjoy without unnecessary limitations. If you’re ready to take control of your physical health, now is the time to act. Book an appointment today or contact our clinic to learn how Physiotherapy can help you achieve your goals.',
  },
  {
    slug: 'chiropractic-care',
    description: 'Chiropractic Care focuses on the relationship between the spine, joints, and the nervous system. When alignment issues occur, they can affect how your body moves and feels during daily activities. At Remarkable Physiotherapy in Markham, our approach centers on improving mobility, easing discomfort, and supporting your body’s natural function through hands-on techniques and targeted care.',
    howItWorks: [
      { title: 'How It Works', description: 'Your spine protects the nervous system, which controls how your body communicates internally. When joints are restricted or not moving properly, it can create tension, reduced range of motion, and discomfort. Chiropractic Care works to restore proper joint motion, which may help improve overall physical function.' },
      { title: 'Office Workers', description: 'Long hours at a desk can lead to stiffness in the neck, shoulders, and lower back. Chiropractic Care can help counteract the effects of prolonged sitting.' },
      { title: 'Athletes and Active Individuals', description: 'Repetitive movements and physical strain can lead to joint restrictions. Regular care can help maintain flexibility and reduce the risk of injury.' },
      { title: 'Everyday Movement', description: 'Even routine activities like lifting, walking, or driving can place stress on the body. Chiropractic Care supports smoother, more efficient movement in daily life.' },
    ],
    benefits: ['Improved mobility', 'Reduced muscle tension', 'Better posture', 'Support for active lifestyles'],
    whoCanBenefit: ['You experience ongoing stiffness or discomfort', 'You notice reduced range of motion', 'You spend long hours sitting or working at a desk', 'You feel tension in your neck, back, or shoulders', 'You want to maintain mobility and function'],
    conditionsTreated: ['Back discomfort and stiffness', 'Neck pain and reduced mobility', 'Headaches related to tension', 'Shoulder and upper back tightness', 'Joint discomfort in the hips or knees', 'Postural strain from desk work'],
    treatmentProcess: [
      'Initial Assessment — evaluating your posture, joint movement, and overall physical condition to identify the root cause rather than just symptoms',
      'Hands-On Care — may include spinal adjustments, joint mobilization, soft tissue work and stretching techniques',
      'Ongoing Support — simple exercises or posture tips to support your progress and reduce the chances of recurring issues',
    ],
    whyChooseUs: [
      { title: 'Patient-Focused Approach', description: 'We take time to understand your concerns, goals, and daily routines. This helps ensure your care aligns with your lifestyle.' },
      { title: 'Integrated Care Options', description: 'In addition to Chiropractic Care, our clinic provides a range of services under one roof, allowing for a coordinated approach when multiple types of care are needed.' },
      { title: 'Comfortable Environment', description: 'Our clinic is designed to create a welcoming and supportive setting where you can focus on your recovery and movement goals.' },
      { title: 'Focus on Lasting Results', description: 'Our goal is to help you move with greater ease, not just during treatment, but in your everyday life.' },
    ],
    closingText: 'If you are looking for Chiropractic Care in Markham, Remarkable Physiotherapy is here to support your movement and overall function. Whether you are dealing with discomfort or simply want to stay active, our team is ready to help. Contact us today to schedule your appointment and take the next step toward improved mobility and daily comfort.',
  },
  {
    slug: 'massage-therapy',
    description: 'When daily stress, muscle tension, or physical strain begin to interfere with your routine, Massage Therapy can play a valuable role in restoring balance. At Remarkable Physiotherapy, this service focuses on easing tight muscles, improving circulation, and supporting overall physical function in a calm and professional setting.',
    howItWorks: [
      { title: 'Deep Tissue Massage', description: 'Targets deeper layers of muscle and connective tissue. Often used for chronic tension and areas with persistent tightness.' },
      { title: 'Relaxation Massage', description: 'A gentler approach that focuses on calming the body and easing general stress. Ideal for those looking to unwind.' },
      { title: 'Sports Massage', description: 'Designed for active individuals, helping prepare muscles before activity and supporting recovery afterward.' },
      { title: 'Therapeutic Massage', description: 'A focused approach aimed at specific areas of discomfort or restricted movement, often combined with other physiotherapy methods.' },
      { title: 'Hot Stone Massage', description: 'Uses smooth, heated stones placed on specific areas of the body. The warmth helps loosen tight muscles, allowing deeper pressure to be applied more comfortably, and supports circulation and a deeply calming effect.' },
    ],
    benefits: ['Improved blood flow and muscle function', 'Reduced muscle tension', 'Stress and relaxation benefits', 'Support for active lifestyles'],
    whoCanBenefit: ['Persistent tightness that does not go away with rest', 'Limited range of motion in certain areas', 'Frequent muscle soreness after activity', 'Increased stress levels affecting your body'],
    conditionsTreated: ['Neck and shoulder tension', 'Lower back discomfort', 'Muscle soreness from workouts', 'Postural strain from desk work', 'Headaches linked to muscle tightness', 'Joint stiffness affecting movement'],
    treatmentProcess: [
      'Initial Assessment — a brief discussion about your concerns, daily routine, and any areas of discomfort',
      'Treatment Session — the therapist applies techniques suited to your condition, adjusting pressure and focus areas throughout the session',
      'Post-Session Advice — simple suggestions such as stretches or posture adjustments to maintain results between visits',
      'Supporting your routine between sessions: staying active with light movement or stretching, maintaining proper posture during work, drinking enough water after sessions, avoiding overexertion immediately after treatment',
    ],
    whyChooseUs: [
      { title: 'Skilled Team with Practical Approach', description: 'The team focuses on identifying the source of discomfort and applying techniques that support real improvement in movement and function.' },
      { title: 'Comfortable and Professional Environment', description: 'The clinic provides a calm setting where you can feel at ease during each session, making the process smooth and stress-free.' },
      { title: 'Integrated Care Options', description: 'Massage Therapy can be combined with other services available at the clinic, such as physiotherapy or manual therapy, for a more complete approach.' },
      { title: 'Focus on Measurable Progress', description: 'Each visit is structured to track how your body responds, ensuring consistent improvement over time rather than temporary changes.' },
    ],
    closingText: 'If muscle tension, stress, or physical strain is affecting your daily life, Massage Therapy at Remarkable Physiotherapy can help you move more comfortably and feel more at ease. Take the next step today. Book your appointment or contact our clinic to learn more about how this service can support your routine.',
  },
  {
    slug: 'acupuncture',
    description: 'Acupuncture is a time-tested therapy that aims to restore balance in the body by stimulating specific points with fine needles. At Remarkable Physiotherapy in Markham, this method is integrated into modern care plans to support recovery, improve movement, and address a wide range of physical concerns.',
    howItWorks: [
      { title: 'How It Works', description: 'The treatment encourages the body’s internal systems to respond in ways that may include improved circulation, reduced muscle tightness, enhanced nerve function, and support for the body’s natural recovery processes.' },
      { title: 'Is Acupuncture Safe?', description: 'When performed by trained professionals, acupuncture is considered a safe procedure. Single-use, sterile needles are always used, proper hygiene protocols are followed, and treatments are adapted to your comfort level.' },
      { title: 'How Many Sessions Will You Need?', description: 'The number of sessions varies depending on your condition, its duration, and how your body responds. Acute issues may require fewer sessions; long-standing concerns may need ongoing care.' },
    ],
    benefits: ['Improved circulation', 'Reduced muscle tightness', 'Enhanced nerve function', 'Support for the body’s natural recovery processes'],
    whoCanBenefit: ['Musculoskeletal concerns: neck and back discomfort, shoulder stiffness, knee and joint issues, muscle strains and tension', 'Sports-related concerns: overuse injuries, muscle fatigue, recovery after intense activity', 'Stress and tension: headaches and migraines, jaw tightness, general tension linked to daily stress', 'Chronic conditions: long-standing discomfort, nerve-related sensations such as tingling, reduced mobility over time'],
    conditionsTreated: ['Neck and back discomfort', 'Shoulder stiffness', 'Knee and joint issues', 'Muscle strains and tension', 'Headaches and migraines', 'Overuse and sports-related injuries'],
    treatmentProcess: [
      'Initial Assessment — a detailed discussion about your symptoms, lifestyle, and physical condition to determine the most appropriate points to target',
      'The Treatment Process — fine, sterile needles gently placed in specific areas, typically left in place for 15–30 minutes',
      'After the Session — you may notice reduced tension, improved mobility, or a sense of relaxation, with gradual changes over multiple sessions',
    ],
    whyChooseUs: [
      { title: 'Experienced Team', description: 'Trained in both physiotherapy and acupuncture, ensuring treatments are applied with precision and a clear understanding of body mechanics.' },
      { title: 'Focus on Individual Needs', description: 'Each plan is tailored to your condition, goals, and daily activities, ensuring your sessions are relevant and practical.' },
      { title: 'Modern Clinical Environment', description: 'A clean, professional setting where your comfort and safety are prioritized throughout every visit.' },
      { title: 'Evidence-Informed Practice', description: 'Acupuncture is used alongside proven physiotherapy methods, ensuring your care is grounded in current clinical knowledge.' },
    ],
    closingText: 'If you are considering acupuncture in Markham, Remarkable Physiotherapy offers a structured, professional setting to begin. Whether you are dealing with muscle tension, joint issues, or stress-related discomfort, this therapy can be a valuable addition to your care plan. Book your appointment today at Remarkable Physiotherapy to learn how acupuncture can fit into your routine and support your recovery journey.',
  },
  {
    slug: 'manual-therapy',
    description: 'Manual therapy is a hands-on approach used by physiotherapists to assess and treat muscles, joints, and soft tissues. It involves skilled movements such as joint mobilization, soft-tissue work, stretching, and manipulation techniques to improve movement and reduce discomfort. At Remarkable Physiotherapy in Markham, manual therapy is used to address a wide range of conditions, from everyday aches to more complex musculoskeletal issues.',
    howItWorks: [
      { title: 'Joint Mobilization', description: 'Gentle, controlled movements applied to joints to increase their range of motion. Commonly used for stiff joints in areas like the neck, back, shoulders, and knees.' },
      { title: 'Soft Tissue Techniques', description: 'Targets muscles, ligaments, and fascia. By applying pressure and movement, this method helps release tight areas, improve circulation, and restore tissue function.' },
      { title: 'Stretching and Muscle Release', description: 'Guided stretching and muscle release techniques help reduce tightness and improve flexibility, particularly useful for muscle imbalances or postural issues.' },
    ],
    benefits: ['Improved mobility', 'Reduced muscle tension', 'Enhanced circulation', 'Faster recovery'],
    whoCanBenefit: ['Suitable for individuals of all activity levels, from office workers to athletes', 'Those experiencing stiffness, reduced range of motion, or ongoing discomfort', 'Anyone recovering from injuries or dealing with repetitive strain'],
    conditionsTreated: ['Neck and back discomfort', 'Shoulder injuries', 'Sports-related strains', 'Joint stiffness', 'Postural issues', 'Muscle tightness', 'Workplace-related strain injuries'],
    treatmentProcess: [
      'Initial Assessment — a discussion about your symptoms, medical history, and daily activities, with physical tests to assess strength, flexibility, and joint function',
      'Hands-On Treatment — the physiotherapist applies appropriate manual therapy techniques to target specific areas, adjusted according to your progress and comfort level',
      'Movement and Exercise Support — guided through exercises to support the effects of manual therapy and maintain progress between sessions',
    ],
    whyChooseUs: [
      { title: 'Skilled Physiotherapists', description: 'Trained in a wide range of manual therapy techniques, focusing on precise, hands-on care that addresses the root cause of your issue.' },
      { title: 'Focus on Functional Movement', description: 'Treatment is not limited to symptom management. The goal is to improve how your body moves in daily life, whether at work, during sports, or during routine activities.' },
      { title: 'One-on-One Care', description: 'Each session provides focused attention, ensuring your concerns are fully addressed and your progress is closely monitored.' },
      { title: 'Modern Approach', description: 'The clinic combines hands-on techniques with movement-based strategies to support lasting improvements in mobility and function.' },
    ],
    closingText: 'If you are looking for manual therapy in Markham, Remarkable Physiotherapy is ready to support your journey toward improved mobility and function. Book your appointment to learn more about how manual therapy can help you move with greater ease and confidence.',
  },
  {
    slug: 'cupping-therapy',
    description: 'Cupping therapy is a hands-on technique that uses suction cups placed on the skin to create a gentle vacuum effect. This method helps stimulate blood flow, ease muscle tightness, and support the body’s natural recovery process. At Remarkable Physiotherapy in Markham, cupping therapy is used as part of a structured care plan to address various musculoskeletal concerns.',
    howItWorks: [
      { title: 'How Cupping Therapy Works', description: 'Cupping therapy works by creating negative pressure on targeted areas of the body. Unlike massage techniques that apply pressure downward, cupping gently pulls the tissue upward, which may increase circulation, support muscle relaxation, reduce tension in tight or overused muscles, and encourage movement of stagnant fluids.' },
      { title: 'Duration and Sensation', description: 'A typical session lasts between 10 and 20 minutes. You may feel a pulling sensation, but it should not be painful. After the session, circular marks may appear on the skin; these are temporary and usually fade within a few days.' },
    ],
    benefits: ['Improved circulation', 'Reduced muscle tension', 'Enhanced mobility', 'Relaxation effect'],
    whoCanBenefit: ['Muscle tightness and stiffness in the back, shoulders and neck', 'Athletes and active individuals recovering after intense physical activity', 'Postural discomfort from long hours at a desk or repetitive movements', 'Chronic aches integrated into a broader physiotherapy plan'],
    conditionsTreated: ['Muscle tightness and stiffness', 'Sports-related strain', 'Postural discomfort', 'Chronic aches'],
    treatmentProcess: [
      'Initial Assessment — determines whether cupping therapy is suitable for your condition and how it should be applied',
      'Application of Cups — specialized cups placed on specific areas, with suction created through a pump or heat method, stationary or gently moved across the skin',
      'Aftercare — review of your health history is done before recommending this treatment, ensuring your care plan aligns with your needs',
    ],
    whyChooseUs: [
      { title: 'Skilled Practitioners', description: 'Trained in modern physiotherapy techniques, including cupping therapy, with attention to detail and client comfort.' },
      { title: 'Individual-Focused Care', description: 'Every client receives a plan based on their condition, lifestyle, and activity level.' },
      { title: 'Modern Facility', description: 'Our clinic in Markham is equipped with up-to-date tools and a welcoming environment.' },
      { title: 'Integrated Approach', description: 'Cupping therapy is often combined with other physiotherapy methods such as manual therapy and exercise programs.' },
    ],
    closingText: 'If you are dealing with muscle tightness, limited mobility, or physical strain, cupping therapy at Remarkable Physiotherapy in Markham may be a valuable addition to your care plan. Contact our clinic today to schedule your appointment.',
  },
  {
    slug: 'dry-needling',
    description: 'If you’re dealing with persistent muscle tightness or movement limitations, dry needling can support recovery and improve how your body functions. At Remarkable Physiotherapy in Markham, this method is used as part of a structured care plan to address muscle-related concerns and restore mobility.',
    howItWorks: [
      { title: 'How Dry Needling Works', description: 'When a needle is inserted into a trigger point, it creates a response within the muscle that can help reduce muscle tightness, improve blood flow to the affected area, support natural tissue repair, and restore range of motion.' },
      { title: 'The Role of Trigger Points', description: 'Trigger points can develop due to overuse, injury, poor posture, or repetitive strain. These tight areas can cause discomfort not only at the site but also in surrounding regions.' },
      { title: 'What You May Feel', description: 'You may feel a slight twitch or brief sensation when the needle reaches the trigger point. After treatment, some soreness may occur for a short period, similar to what you might feel after physical activity.' },
    ],
    benefits: ['Reduced muscle tightness', 'Improved blood flow to the affected area', 'Support for natural tissue repair', 'Restored range of motion'],
    whoCanBenefit: ['Active individuals and athletes managing muscle strain to maintain balance and performance', 'People with repetitive movement injuries', 'Those with headaches linked to muscle tightness'],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Sports-related strain', 'Repetitive movement injuries', 'Headaches linked to muscle tightness', 'Hip or leg stiffness'],
    treatmentProcess: [
      'Initial Assessment — a detailed assessment of your movement, posture, and muscle condition determines whether dry needling is appropriate',
      'A Structured Treatment Plan — may include dry needling and other techniques, focused on improving function and reducing contributing factors',
      'Ongoing Support — progress is monitored over time, with exercises or strategies to follow between visits',
    ],
    whyChooseUs: [
      { title: 'Focus on Function and Movement', description: 'Attention is given to how your body moves as a whole, helping identify contributing factors and supporting more lasting changes.' },
      { title: 'Individual Attention', description: 'Each session is centred around your specific condition and goals.' },
      { title: 'Evidence-Based Techniques', description: 'Dry needling and other methods used are based on current research and clinical practice.' },
      { title: 'Comfortable Environment', description: 'The clinic provides a calm and professional setting where you can feel at ease during your sessions.' },
    ],
    closingText: 'If you’re looking for dry needling in Markham, Remarkable Physiotherapy is here to help you move more freely and feel more comfortable in your daily activities. Contact our clinic today to schedule your appointment or speak with our team about your concerns.',
  },
  {
    slug: 'spinal-manipulation-adjustment',
    description: 'Spinal manipulation/adjustment is a hands-on approach focused on improving the mobility of the spine and supporting overall musculoskeletal function. At Remarkable Physiotherapy in Markham, this service is used to address stiffness, restricted movement, and discomfort that may arise from daily strain, injuries, or long periods of inactivity.',
    howItWorks: [
      { title: 'How It Works', description: 'The spine is made up of multiple joints that allow for flexibility and movement. Over time, these joints can become restricted due to poor posture, repetitive strain, or injury. Spinal manipulation/adjustment works by improving joint movement, reducing muscle tightness, supporting proper alignment, and enhancing overall physical function.' },
      { title: 'Post-Injury Support', description: 'May also be helpful after sports-related incidents, workplace strain, or minor accidents, supporting recovery by encouraging proper movement and reducing strain on affected areas.' },
    ],
    benefits: ['Improved mobility', 'Reduced muscle tension', 'Better posture', 'Support for active lifestyles'],
    whoCanBenefit: ['Back discomfort', 'Neck stiffness', 'Headaches related to tension', 'Poor posture', 'Limited range of motion', 'Muscle tightness'],
    conditionsTreated: ['Back discomfort', 'Neck stiffness', 'Tension headaches', 'Poor posture', 'Limited range of motion', 'Muscle tightness'],
    treatmentProcess: [
      'Initial Assessment — reviewing your medical history, assessing posture and movement, and identifying areas of restriction',
      'Treatment Session — gentle, controlled movements applied to specific joints; you may hear a small popping sound, which is a normal part of joint movement',
      'After the Session — improved movement, reduced stiffness, and a sense of ease in affected areas, plus exercises or posture tips to maintain results',
    ],
    whyChooseUs: [
      { title: 'What Sets Our Clinic Apart', description: 'At Remarkable Physiotherapy, the focus is on delivering attentive care in a professional and welcoming environment.' },
    ],
    closingText: 'Choosing the right clinic plays a key role in your recovery and overall progress. If you are looking for spinal manipulation/adjustment in Markham, Remarkable Physiotherapy is here to support your movement and overall function. Contact us today to schedule your appointment and take the next step toward improved mobility and daily comfort.',
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
